import { Prompt } from './index.js';
import Command from '../Command.js';
import { QueryChatGptCommand, InsertToDBCommand, AddToQueueCommand } from '../query/index.js';

export default class TemplatePromptCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
    this.urlParams = req.query;
    this.templateType = this.urlParams?.type;
    this.templateTypes = this.urlParams?.types;
    this.prompt = new Prompt(null, this.templateType, this.urlParams);
    this.queryChatGptCommand = new QueryChatGptCommand();
    this.insertToDBCommand = new InsertToDBCommand();
    this.addToQueueCommand = new AddToQueueCommand();
  }

  async execute() {
    try {
      if (this.templateTypes) {
        this.templateTypes = this.createArray(this.templateTypes);
        this.executeSequence();
      } else {
        await this.prompt.init();
        const response = await this.queryChatGptCommand.execute(this.prompt);
        this.res.send(response);
      }
    } catch (error) {
      console.error('ExecuteTemplatePromptCommand Error:', error);
      this.res.status(500).send('An error occurred while processing your request.');
    }
  }
  
  async executeSequence() {
    try {
      const tasks = this.templateTypes.map((templateType) => async () => {
        this.prompt = new Prompt(null, templateType, this.urlParams);
        await this.prompt.init();
        return await this.queryChatGptCommand.execute(this.prompt);
      });
      await this.enqueueTasks(tasks);
      await this.addToQueueCommand.processQueue();
      const response = this.addToQueueCommand.results;
      this.res.send(response);
    } catch (error) {
      console.error('Error in executeSequence:', error);
      this.res.status(500).send('An error occurred while processing your request.');
    }
  }

  async enqueueTasks(tasks) {
    const enqueuePromises = tasks.map((task) => {
      return new Promise((resolve, reject) => {
        this.addToQueueCommand.enqueue(task)
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.error("Error processing task:", error);
            reject(error);
          });
      });
    });

    await Promise.all(enqueuePromises);
  }

  createArray(inputString) {
    const list = inputString.replace(/[\[\]]/g, '').split(', ');
    return list || [];
  }
}
