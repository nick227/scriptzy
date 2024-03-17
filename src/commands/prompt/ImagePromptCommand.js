import { Prompt } from "./index.js";
import { QueryChatGptCommand, AddToQueueCommand } from "../query/index.js";
import { SaveImageCommand } from "../build/index.js";
import Command from '../Command.js';
import dotenv from "dotenv";
dotenv.config();

export default class ImagePromptCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
    this.num = this.req.query.num;
    this.addToQueueCommand = new AddToQueueCommand();
    this.saveImageCommand = new SaveImageCommand(this.req);
    this.prompt = new Prompt(null, this.req.query?.type, this.req.query);
  }

  async execute() {
    try {
      let results = null;
      if (this.num) {
        results = await this.executeSequence();
      } else {
        results = await this.executeSingle();
      }
      
      this.saveImageCommand.execute(results, this.prompt.prompt);
      this.res.json({ results: results });

    } catch (error) {
      console.error("ImagePromptCommand Error:", error);
      this.res.status(500).json({
        message: "An error occurred while processing your request.",
        error: error.message,
      });
    }
  }

  async executeSingle() {
    await this.prompt.init();
    const queryChatGptCommand = new QueryChatGptCommand();
    const response = await queryChatGptCommand.executeImage(this.prompt.prompt);
    return response.data[0].b64_json;
  }

  async executeSequence() {
    for (let i = 0; i < this.num; i++) {
      await this.enqueueTasks(this.executeSingle);
    }
    await this.addToQueueCommand.processQueue();
    return this.addToQueueCommand.results;
  }
}
