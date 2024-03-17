import Command from "../../Command.js";
import DB from "../../../db/DB.js";

export default class UpdateDBCommand extends Command {
  async execute(data, tableName, query) {
    if (!data || !tableName || !query) {
      return;
    }
    const db = new DB(`${tableName}.db`);
    console.log('UpdateDBCommand', data, tableName, query)
    return await db.upsert(query, data);
  }
}