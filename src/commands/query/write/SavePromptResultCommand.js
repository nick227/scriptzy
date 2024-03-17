import Command from "../../Command.js";
import { InsertToDBCommand } from '../index.js';

export default class SavePromptResultCommand extends Command {
  async execute(completion, prompt = null) {
    return;
    /*
    completion = JSON.parse(completion);
    const response = this.getResponse(completion);
    const insertToDB = new InsertToDBCommand();
    return await insertToDB.execute({
      id: completion.id,
      usage: completion.usage,
      timestamp: completion.timestamp,
      userId: completion.userId,
      model: completion.model,
      created: completion.created,
      prompt: prompt,
      response: response,
    }, 'chatgptTransactions');*/
  }

  getResponse(completion) {
    try {
      if (!completion || !Array.isArray(completion.choices) || completion.choices.length === 0) {
        return null;
      }

      const choice = completion.choices[0];
      if (choice?.message?.tool_calls) {
        return JSON.stringify(choice.message.tool_calls[0].function.arguments);
      } else if (choice?.message?.content) {
        return choice.message.content;
      } else {
        return choice.message;
      }


    } catch (error) {
      console.error('Error getting response:', error);
      return error;
    }
  }
}