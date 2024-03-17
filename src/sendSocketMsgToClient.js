import { Readable } from 'stream';

export default function sendSocketMsgToClient(message, req) {
    if (!req.app || !message) {
        return;
    }

    const clientConnections = req.app.get('clientConnections');
    const sessionId = req.session.id;
    let clientSocket = clientConnections.get(sessionId);

    if (clientSocket) {
        if (typeof message === 'string') {
            clientSocket.send(`Socket message: ${message}`);
        } else if (message instanceof Readable) {
            message.on('data', (chunk) => {
                clientSocket.send(chunk, { binary: true });
            });
            message.on('end', () => {
                clientSocket.send('streamEnd');
            });
        }
    }
}