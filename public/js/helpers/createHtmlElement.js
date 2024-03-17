let currentNodeId = 0;
function createHtmlElement(options) {
    if(!options){
        return document.createElement('div');
    }
    let elementType, className, css, cssStates, textContent, title, attributes, children, src, htmlContent, id;

    if (typeof options === 'string') {
        elementType = options;
        className = css = textContent = title = src = htmlContent = null;
        cssStates = attributes = {};
        children = [];
    } else {
        ({ elementType, id, className, css, cssStates = {}, textContent, title, attributes = {}, children = [], src, htmlContent } = options);
    }

    const el = document.createElement(elementType);
    el.className = className || '';
    
    el.textContent = textContent || '';
    if (htmlContent) {
        el.innerHTML = htmlContent;
    }
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'header'].includes(elementType)) {
        el.textContent = textContent;
    }
    if (['button'].includes(elementType)) {
        el.textContent = textContent || '';
    }
    if (elementType === 'img' && src) {
        el.src = src;
    }
    if (title) {
        el.title = title;
    }
    if (id) {
        el.id = id;
    }

    setAttributes(el, attributes);
    setStyle(el, css);
    addListeners(el, cssStates, attributes, css);

    // Recursively append children
    children.forEach(childOptions => {
        const childElement = createHtmlElement(childOptions);
        el.appendChild(childElement);
    });
    el.setAttribute('data-node-id', currentNodeId);
    currentNodeId++;
    return el;
}

function setAttributes(el, attributes) {
    const ignore = ['onclick'];
    for (const [key, value] of Object.entries(attributes)) {
        if (ignore.includes(key)) continue; // Skip ignored properties
        try {
            el[key] = value;
        } catch (e) {
            console.warn(`Could not set property ${key}: ${e.message}`);
        }
    }
}


const handleSpecialElements = (el, elementType, attributes) => {
    if (elementType === 'select' && el.options.length === 0) {
        const options = [1, 2, 3, 4, 5];
        options.forEach((optionValue) => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.text = optionValue;
            el.appendChild(option);
        });
    }
    if (elementType === 'a') {
        el.href = attributes.href || 'javascript:void(0);';
    }
    if (elementType === 'img' && !attributes.href && !src) {
        el.src = 'https://picsum.photos/200';
    }
};

function setStyle(el, styles) {
    if (!styles) return;
    if (typeof styles === 'string') {
        el.setAttribute('style', styles);
    } else if (typeof styles === 'object') {
        for (const [key, value] of Object.entries(styles)) {
            el.style[key] = value;
        }
    }
}

function addListeners(el, cssStates, attributes, initialStyle) {
    const jsEvents = [
        'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover',
        'mouseout', 'mouseenter', 'mouseleave', 'contextmenu', 'drag', 'dragend',
        'dragenter', 'dragexit', 'dragleave', 'dragover', 'dragstart', 'drop', 'wheel'
    ];

    const pseudoClassHandlers = [{
            state: 'hover',
            listener: (el, style, initialStyle) => {
                el.addEventListener('mouseenter', () => setStyle(el, style));
                el.addEventListener('mouseleave', () => setStyle(el, initialStyle));
            }
        },
        {
            state: 'active',
            listener: (el, style, initialStyle) => {
                el.addEventListener('mousedown', () => setStyle(el, style));
                el.addEventListener('mouseup', () => setStyle(el, initialStyle));
            }
        },
        {
            state: 'focus',
            listener: (el, style, initialStyle) => {
                el.addEventListener('focus', () => setStyle(el, style));
                el.addEventListener('blur', () => setStyle(el, initialStyle));
            }
        }
    ];

    for (const [state, style] of Object.entries(cssStates)) {
        if (jsEvents.includes(state)) {
            el.addEventListener(state, () => setStyle(el, style));
        } else {
            const pseudoClassHandler = pseudoClassHandlers.find(handler => handler.state === state);
            if (pseudoClassHandler) {
                pseudoClassHandler.listener(el, style, initialStyle);
            }
        }
    }

    if (attributes.onclick) {
        el.addEventListener('click', attributes.onclick);
    }
}