

const scriptInputObj = [
    {
        type: 'section',
        className: 'script-input',
        children: [{
            type: 'textarea',
            placeholder: 'Paste that fancy script here',
            event: [{
                type: 'input',
                handler: e => handleScriptInput(e)
            }
            ]
        }, {
            type: 'button',
            textContent: 'Dazzle Me',
            event: [{
                type: 'click',
                handler: e => handleScriptSubmit(e)
            }
            ]
        }]
    }
];

async function handleScriptSubmit(e) {
    const textarea = e.target.parentElement.querySelector('textarea');
    const script = textarea.value;
    textarea.disabled = true;
    
    const templateTypeValue = 'default';
    const data = await requestChatGpt(prompt, templateTypeValue);
    console.log("Server Response: ", typeof data, data);

}


function setupScriptInput() {
    const scriptInputObjElements = createElements(scriptInputObj);
    const target = document.querySelector('#scriptInput');
    target.append(...scriptInputObjElements);

}


function handleScriptInput(e) {
    const textarea = e.target;
    textarea.style.height = 'auto';
    let maxHeight = window.innerHeight || document.documentElement.clientHeight;
    let newHeight = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = newHeight + 'px';
}