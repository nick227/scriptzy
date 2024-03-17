import Command from "../../Command.js";
import { InsertToDBCommand } from '../index.js';

export default class SaveToChatHistoryCommand extends Command {
  constructor(req, res) {
    super();
    this.req = req;
    this.res = res;
    this.insertToDBCommand = new InsertToDBCommand();
  }
  async execute(prompt, results, sessionId) {
    let response;
    try {
      const results = JSON.parse(results);
      response = results.response ? results.response : results;
    } catch (error) {
      response = results;
    }
    response = this.findStringValue(response);
    const params = [{ role: 'user', content: prompt, sessionId: sessionId }, { role: 'assistant', content: response, sessionId: sessionId }];
    this.saveLater(params);
  }

  findStringValue(obj) {
    if (typeof obj === 'string') {
        return obj;
    }
    if (typeof obj === 'object' && obj !== null) {
        for (let key in obj) {
            let value = this.findStringValue(obj[key]);
            if (value) {
                return value;
            }
        }
    }
    return null;
}

  saveLater(params) {
    setImmediate(() => {
      this.insertToDBCommand.execute(params, 'chatHistory');
    });
  }
}