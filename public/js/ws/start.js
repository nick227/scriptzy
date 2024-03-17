function createWebSocketUrl() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const hostname = window.location.hostname;
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${protocol}://${hostname}${port}`;
}

const ws = new WebSocket(createWebSocketUrl());

ws.addEventListener('error', (error) => {
    console.error('WebSocket Error:', error);
});

ws.addEventListener('open', () => {
    ws.send('Hello from client');
});