//{ "userId": null, "sessionId": "P8F7dfgx1kK9vYtUYQRlGBW8rxJybZSp", "completion": { "id": "chatcmpl-8jhww9GuWzcUPvDGRKZdEb2g2kpHQ", "object": "chat.completion", "created": 1705904394, "model": "gpt-3.5-turbo-16k-0613", "choices": [ { "index": 0, "message": { "role": "assistant", "content": "Ah, I see you're quite excited! What has you feeling so exuberant today?" }, "logprobs": null, "finish_reason": "stop" } ], "usage": { "prompt_tokens": 156, "completion_tokens": 19, "total_tokens": 175 }, "system_fingerprint": null }, "timestamp": "2024-01-22T06:19:52.327Z", "_id": "XJ1HOzS6DgvlruAA" }


function createTable() {
    return document.createElement('table');
}

function createHeaderRow(headers) {
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    return headerRow;
}

function createDataRows(jsonObject, headers) {
    const rows = document.createElement('tbody');
    if (!jsonObject.completion || !Array.isArray(jsonObject.completion.choices)) {
        return rows;
    }
    jsonObject.completion.choices.forEach(choice => {
        const row = document.createElement('tr');
        headers.forEach(key => {
            const cell = document.createElement('td');
            let textContent = '';
            switch (key) {
                case 'userId':
                    textContent = jsonObject.userId;
                    break;
                case 'sessionId':
                    textContent = jsonObject.sessionId;
                    break;
                case 'completionId':
                    textContent = jsonObject.completion.id;
                    break;
                case 'model':
                    textContent = jsonObject.completion.model;
                    break;
                case 'role':
                    textContent = choice.message.role;
                    break;
                case 'content':
                    textContent = choice.message.content;
                    break;
                case 'timestamp':
                    textContent = new Date(jsonObject.timestamp['$$date']).toISOString();
                    break;
                case '_id':
                    textContent = jsonObject._id;
                    break;
            }
            cell.textContent = textContent;
            row.appendChild(cell);
        });
        rows.appendChild(row);
    });
    return rows;
}

function addSortEventListener(header, index, tableBody) {
    header.addEventListener('click', () => {
        Array.from(tableBody.querySelectorAll('tr'))
            .sort((a, b) => a.cells[index].textContent.localeCompare(b.cells[index].textContent))
            .forEach(tr => tableBody.appendChild(tr));
    });
}

function jsonToTable(jsonObject) {
    const table = createTable();
    const headers = ['userId', 'sessionId', 'completionId', 'model', 'role', 'content', 'timestamp', '_id'];
    const headerRow = createHeaderRow(headers);
    headers.forEach((headerText, index) => {
        addSortEventListener(headerRow.children[index], index, table);
    });
    table.appendChild(headerRow);
    const dataRows = createDataRows(jsonObject, headers);
    table.appendChild(dataRows);
    return table;
}

document.addEventListener('DOMContentLoaded', async (event) => {
    
    const data = await api.read(`/api/chatgptTransactions`);
    console.log(data);
    const table = jsonToTable(data);
    document.body.appendChild(table);
});