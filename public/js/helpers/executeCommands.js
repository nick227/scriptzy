//{"command":"style","value":"background-color: blue","nodeId":"69"}
//{"command":"append","value":"<div>hello</div>","nodeId":"20"}
//{"command":"remove","value":null,"nodeId":"20"}
//{"command":"publish","value":null,"nodeId":null}
//{"command":"edit","value":{src:'https://source.unsplash.com/random'},"nodeId":5}
const commandsf = [
    {
        "command": "style",
        "value": "background: red;",
        "nodeId": "node01"
    }
]

const commands1 = [
    {
        "command": "style",
        "value": "body { background-image: url('https://source.unsplash.com/random/space'); background-size: cover; }",
        "nodeId": "body"
    }
];
const commdands = [{
    "command": "style",
    "value": "background-image: radial-gradient(circle, #FFFFFF 1px, transparent 1px), radial-gradient(circle, #FFFFFF 1px, transparent 1px);background-size: 20px 20px;background-position: 0 0, 10px 10px;",
    "nodeId": "body"
}];


const commands = [{ "command": "edit", "value": "{ \"textContent\": \"What is up\" }", "nodeId": "node05" }];

//setTimeout(() => {
    //executeCommands(commands);
//}, 2345);

function executeCommands(commands) {
    console.log("commands", commands);
    commands.forEach(command => {
        switch (command.command) {
            case 'append':
                append(command.value, command.nodeId);
                break;
            case 'prepend':
                prepend(command.value, command.nodeId);
                break;
            case 'remove':
                remove(command.value, command.nodeId);
                break;
            case 'insert':
                insert(command.value, command.nodeId);
                break;
            case 'style':
                style(command.value, command.nodeId);
                break;
            case 'edit':
                edit(command.value, command.nodeId);
                break;
            case 'publish':
                publish(command.value, command.nodeId);
                break;
            case 'style':
                style(command.css, command.nodeId);
                break;
            default:
                style(command.css, command.nodeId);
                console.log(`Invalid command: ${command.command}`);
                break;
        }
    });
}

function getTargetElement(nodeId) {
    const currentNode = document.querySelector("#demo");
    const targetElement = currentNode.querySelector(`[data-node-id="${nodeId}"]`);
    if(!targetElement){
        alert('no target element', nodeId);
    }
    return targetElement;
}

function speak(message) {
    const event = new CustomEvent('speak', { detail: { response: message } });
    window.dispatchEvent(event);
}

function edit(value, nodeId) {
    const targetElement = getTargetElement(nodeId);
    if (!targetElement) {
        errorMessage(nodeId);
        return;
    }
    let parsedValue;
    if (typeof value === 'string') {
        try {
            parsedValue = JSON.parse(value);
        } catch (e) {
            parsedValue = value;
        }
    } else {
        parsedValue = value;
    }
    if (typeof parsedValue === 'object') {
        Object.keys(parsedValue).forEach(key => {
            targetElement[key] = parsedValue[key];
        });
    } else {
        targetElement.innerHTML = parsedValue;
    }
}

function style(value, nodeId) {
    const targetElement = getTargetElement(nodeId);
    if (!targetElement) {
        errorMessage(nodeId);
        return;
    }
    const styles = value.split(';');
    for (let i = 0; i < styles.length; i++) {
        const style = styles[i];
        const splitStyle = style.split(':');
        const property = splitStyle.shift().trim();
        const styleValue = splitStyle.join(':').trim();
        if (property && styleValue) {
            targetElement.style[property] = styleValue;
        }
    }
}

function append(value, nodeId) {
    const targetElement = getTargetElement(nodeId);
    if (!targetElement) {
        errorMessage(nodeId);
        return;
    }
    targetElement.insertAdjacentHTML('beforeend', value);
}

function remove(_, nodeId) {
    const targetElement = getTargetElement(nodeId);
    if (!targetElement) {
        errorMessage(nodeId);
        return;
    }
    targetElement.parentNode.removeChild(targetElement);
}

function prepend(value, nodeId) {
    const targetElement = getTargetElement(nodeId);
    if (!targetElement) {
        errorMessage(nodeId);
        return;
    }
    targetElement.insertAdjacentHTML('afterbegin', value);
}

function insert(value, nodeId) {
    const targetElement = getTargetElement(nodeId);
    if (!targetElement) {
        errorMessage(nodeId);
        return;
    }
    targetElement.outerHTML = value;
}

function errorMessage(nodeId) {
    speak(`Element with data-node-id ${nodeId} not found`);
}

function publish(_, __) {
    alert('published!')
}