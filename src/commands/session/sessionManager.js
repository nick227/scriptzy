import Command from '../Command.js';

export default class SessionManager extends Command {
    constructor(sessionStore) {
        super();
        this.sessionStore = sessionStore;
    }

    execute(sessionId) {
        return this.sessionStore.getSession(sessionId);
    }

    createSession(userId) {
        const sessionId = this.generateSessionId();
        this.sessionStore.saveSession(sessionId, { userId });
        return sessionId;
    }

    destroySession(sessionId) {
        this.sessionStore.deleteSession(sessionId);
    }

    generateSessionId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
