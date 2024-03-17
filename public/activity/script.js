document.addEventListener('DOMContentLoaded', (event) => {
    startActivityPage();
});

async function startActivityPage() {
    const chatgptTranactions = await api.read('/api/chatgptTransactions');
    console.log(chatgptTranactions)

    var table = new Tabulator("#activity", {
        data: chatgptTranactions,
        layout: "fitColumns",
        columns: [
            { title: "Prompt", field: "prompt.prompt", width: '15%' },
            { title: "Completion", field: "response", width: '40%' },
            { title: "Template", field: "prompt.templateType", width: '5%' },
            { title: "Function", field: "prompt.tool_choice", width: '5%' },
            { title: "Model", field: "model", width: '7%' },
            { title: "Prompt Tokens", field: "usage.prompt_tokens", width: '3%' },
            { title: "Completion Tokens", field: "usage.completion_tokens", width: '3%' },
            { title: "Total Tokens", field: "usage.total_tokens", width: '5%' },
            { title: "Created At", field: "timestamp", width: '6%' },
            { title: "ID", field: "id", width: '3%' },
            { title: "Session ID", field: "sessionId", width: '8%' },
        ],
    });


    table.on("tableBuilt", () => {
        table.setPage(2);
    });


}