import Command from "../../Command.js";
import DB from "../../../db/DB.js";

export default class InsertToDBCommand extends Command {
  async execute(data, tableName) {
    if (!data || !tableName) {
      return;
    }
    const db = new DB(`${tableName}.db`);
    return await db.insert(data);
  }
}