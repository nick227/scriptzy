import { ClearChatHistoryCommand } from './src/commands/query/index.js';
import { RenderSnapshotCommand } from './src/commands/build/index.js';

const webSocketHandlers = {
    clearHistory: function (ws) {
        const clearChatHistoryCommand = new ClearChatHistoryCommand();
        clearChatHistoryCommand.execute(ws.sessionId);
        ws.send('Cleared chat history');
    }
};

export default webSocketHandlers;