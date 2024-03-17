async function loadTemplateList() {
    const keys = ['promptTemplates'];
    const target = document.querySelector('#templates');
    const buildPromises = keys.map((key) => {
        return renderDataObject(key, target);
    });

    await Promise.all(buildPromises);
    await new Promise(resolve => setTimeout(resolve, 2500));
}

function warnOnPageExit() {
    window.addEventListener('beforeunload', (event) => {
        const textarea = document.querySelector('.prompt-textarea');
        if (textarea && textarea.value) {
            event.preventDefault();
            event.returnValue = '';
        }
    });
}

async function setupPromptTemplateForm() {
    const [title, desc, form, textarea, submit] = ['h2', 'p', 'form', { elementType: 'textarea' }, 'button'].map(createHtmlElement);
    Object.assign(textarea, { placeholder: 'Enter prompt template', oninput: () => setupTextAreaHeight(textarea), onkeydown: fixTabPress, className: 'prompt-textarea' });
    Object.assign(submit, { textContent: 'Submit', type: 'submit' });
    Object.assign(desc, {
        innerHTML: `
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
    <section>
        <h3>Type</h3>
        <p>Required unique identifier for the template.</p>
    </section>
    <section>
        <h3>Prompt</h3>
        <p>Each template must include either a prompt (string) or messages (array).</p>
    </section>
    <section>
        <h3>URL Parameters</h3>
        <p>Utilize \${} syntax for incorporating URL parameters into your values.</p>
    </section>
    <section>
        <h3>Data Sources</h3>
        <p>Define data_sources as an array to side-load external data.</p>
    </section>
    <section>
        <h3>Sequence</h3>
        <p>Set sequence to true to initiate a template sequence.</p>
    </section>
    <section>
        <h3>Response Format Control</h3>
        <p>Define ChatGPT response with tool_choice and tools.</p>
    </section>
    <section>
        <h3>Epoch Time</h3>
        <p>\${epoch} defaults to epoch time unless explicitly set.</p>
    </section>
    <section>
        <h3>\${prompt}</h3>
        <p>Defaults to user prompt unless set in form params.</p>
    </section>
</div>
        <BR>
            <a target="_blank" href="https://platform.openai.com/docs/guides/function-calling">
                https://platform.openai.com/docs/guides/function-calling
            </a>`,
        className: 'description'
    });
    [title, desc, textarea, submit].forEach(el => form.appendChild(el));
    form.onsubmit = handleFormSubmit;
    document.querySelector('section#templates').prepend(form);
    addScrollToTopButton();
    warnOnPageExit();
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const textarea = form.querySelector('textarea');
    const data = textarea.value;
    if (validate(data)) {
        try {
            const jsonData = JSON.parse(data);
            const response = await api.create('/api/promptTemplates', jsonData);
            alert(`Success: ${response.type} prompt template created!`);
            addToList(response, 'promptTemplates');
            textarea.value = '';
            setupTextAreaHeight(textarea);
            addToChatbotPicker(response.type);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}

function addToChatbotPicker(type) {
    const select = document.querySelector('.chatbot-picker');
    const option = createHtmlElement('option');
    option.value = type;
    option.textContent = type;
    if (!select.querySelector(`option[value="${type}"]`)) {
        select.insertBefore(option, select.firstChild);
    }
}

function setupTextAreaHeight(textarea) {
    textarea.style.height = 'auto';
    let maxHeight = window.innerHeight || document.documentElement.clientHeight;
    let newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = newHeight + 'px';
    const data = textarea.value;
    if (isValidJson(data)) {
        textarea.classList.remove('error');
    } else {
        textarea.classList.add('error');
    }
}

function fixTabPress(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) +
            "  " + this.value.substring(end);
        this.selectionStart =
            this.selectionEnd = start + 2;
    }
}

function addScrollToTopButton() {
    const button = createHtmlElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top';
    button.addEventListener('click', () => window.scrollTo(0, 0));
    document.body.appendChild(button);
}

const validate = data => {
    if (!data || !isValidJson(data)) {
        alert('Data is not valid JSON');
        return false;
    }
    const parsedData = JSON.parse(data);
    const { type, messages, prompt, tool_choice, tools, _id, timestamp, data_sources } = parsedData;
    const expectedKeys = ['type', 'messages', 'prompt', 'tool_choice', 'tools', 'data_sources', 'sequence', 'use_embedding'];
    const actualKeys = Object.keys(parsedData);
    const extraKeys = actualKeys.filter(key => !expectedKeys.includes(key));

    if (extraKeys.length > 0) {
        alert(`Unexpected keys: ${extraKeys.join(', ')}`);
        return false;
    }

    if (!type) {
        alert('Type is missing');
        return false;
    }

    if (_id || timestamp) {
        alert('Timestamp and _id are not allowed');
        return false;
    }

    if (!Array.isArray(messages) && typeof prompt !== 'string') {
        alert('Messages is not an array or prompt is not a string');
        return false;
    }

    if (data_sources && !Array.isArray(data_sources)) {
        alert('Data sources must be an array');
        return false;
    }

    if (typeof tool_choice === 'string') {
        const toolFunction = tools?.find(tool => tool.type === 'function');
        if (!Array.isArray(tools)) {
            alert('Tools is not an array');
            return false;
        }
        if (!toolFunction) {
            alert('Tools does not contain an object with type: function');
            return false;
        }
        if (toolFunction.function?.name !== tool_choice) {
            alert('Function object does not contain element name that equals the tool_choice value');
            return false;
        }
    }

    return true;
};

function isValidJson(json) {
    try {
        JSON.parse(json);
        return true;
    } catch (e) {
        return false;
    }
}