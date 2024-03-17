import Command from "../../Command.js";
import DB from "../../../db/DB.js";

export default class GetChatHistoryCommand extends Command {
    async execute(sessionId, limit = 8) {
        const db = new DB('chatHistory.db');
        const query = { sessionId:sessionId, limit: limit };
        const results = await db.find(query);
        return this.formatResults(results);
    }
    formatResults(results) {
        return results
            .filter(result => result.role && result.content && result.role.length > 0 && result.content.length > 0)
            .map(result => {
                return {
                    role: result.role,
                    content: result.content
                }
            });
    }
}