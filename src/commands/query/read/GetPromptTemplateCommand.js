import Command from "../../Command.js";
import DB from "../../../db/DB.js";

export default class GetPromptTemplateCommand extends Command {
  async execute(type) {
    if (!type) {
      throw new Error('Missing required query parameters.');
    }
    const db = new DB('promptTemplates.db');
    return await db.findOne({ type: type });
  }
}