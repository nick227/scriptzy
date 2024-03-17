import Command from "../../Command.js";
import DB from "../../../db/DB.js";

export default class ReplaceDBCommand extends Command {
  async execute(data, tableName, query) {
    if (!data || !tableName || !query) {
      return;
    }
    const db = new DB(`${tableName}.db`);
    return await db.replace(query, data);
  }
}