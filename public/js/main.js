document.addEventListener('DOMContentLoaded', async (event) => {
    try {
        //setupDemoPreLoader();
        //setupVoice();
        //const chatbot = await setupChatBot();
        //await setupPromptTemplateForm();
        //await loadTemplateList();
        //setupDemo();

        setupLogin();
        setupScriptInput();

        const tables = ['completions', /*'ai_inspiration_image_prompt_generator', 'script_beats_generator', 'budget_schedule_estimate', 'locations_set_production_designer', 'idea_brainstorming', 'writing_consultation', 'generate_lighting_setups_list', 'generate_shot_list', 'analyze_scenes', 'analyze_plots', 'analyze_characters'*/];

        const results = await Promise.all(tables.map(async (table) => {
            return await api.read(`/api/${table}`);
        }));
        await loadUserCompletion();



        document.querySelector('.loading-spinner').classList.toggle('hidden');

    } catch (error) {
        console.error('An error occurred:', error);
    }
});

async function loadUserCompletion() {
    const results = await api.read(`/api/completions`);
    results.forEach(add);

    function add(result) {
        console.log(result);
    }

}

async function loadAiIdeas() {
    const results = await api.read(`/api/ai_inspiration_image_prompt_generator`);
    results.forEach(add);

    function add(results) {
        if (results.choices && results.choices[0].message.tool_calls && results.choices[0].message.tool_calls[0].function && results.choices[0].message.tool_calls[0].function.name) {
            try {
                if (JSON.parse(results.choices[0].message.tool_calls[0].function.arguments).prompts) {
                    const aiIdeaTitle = results.choices[0].message.tool_calls[0].function.name;
                    const aiIdeas = JSON.parse(results.choices[0].message.tool_calls[0].function.arguments).prompts;
                    const tableData = [];
                    aiIdeas.forEach(element => {
                        if (typeof element === 'object' && !Array.isArray(element)) {
                            // element is an object
                            const keys = Object.keys(element);
                            keys.forEach(key => {
                                let value = element[key];
                                tableData.push({ key, value });
                            });
                        } else if (typeof element === 'string') {
                            tableData.push({ key: 'unknown', value: element });
                        } else if (Array.isArray(element)) {
                            element.forEach(item => {
                                tableData.push({ key: 'unknown', value: item });
                            });
                        }
                        renderTable(tableData, aiIdeaTitle);
                    });
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
}

function renderTable(data, title) {
    const target = document.querySelector('body');
    const table = document.createElement('div');
    table.classList.add('table');
    target.appendChild(table);
    const header = document.createElement('div');
    header.classList.add('header');
    header.innerHTML = `<h2>${title}</h2>`;
    table.appendChild(header);
    data.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('item');
        rowDiv.innerHTML = `<div class="row"><h3 class="key">${row.key}</h3><button onClick="handleClick('images')"><i class="fas fa-redo"></i></button></div><p class="value">${row.value}</p>`;
        table.appendChild(rowDiv);
    });
}

async function handleClick(fnName) {
    const parentElm = this.event.target.closest('div.item');
    const prompt = parentElm.querySelector('.value').innerText;
    const response = await api.read('/api/chatgpt/image', { prompt: prompt });
    const image = response.results;
    const target = parentElm;
    const img = document.createElement('img');
    //image is a b64 string
    img.src = `data:image/png;base64,${image}`;
    const a = document.createElement('a');
    a.href = `data:image/png;base64,${image}`;
    a.target = '_blank';
    a.appendChild(img);
    target.appendChild(a);

}