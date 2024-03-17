let snapShotCurrentId = 0;
const keepAttributes = [
    "class",
    "id",
    "style",
    "src",
    "href",
    "alt",
    "width",
    "height",
    "disabled",
    "value",
    "title",
    "type",
    "rel",
    "target",
    "action",
    "method",
    "placeholder",
    "checked",
    "selected",
    "required",
    "readonly",
    "maxlength",
    "min",
    "max",
    "pattern",
    "autocomplete",
    "autofocus",
    "download",
    "colspan",
    "rowspan",
    "for",
    "name",
    "data-node-id"];

const keepContent = [
    "html",
    "head",
    "body",
    "title",
    "meta",
    "link",
    "style",
    "script",
    "noscript",
    "template",
    "section",
    "nav",
    "article",
    "aside",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "footer",
    "p",
    "hr",
    "pre",
    "blockquote",
    "ol",
    "ul",
    "li",
    "dl",
    "dt",
    "dd",
    "figure",
    "figcaption",
    "main",
    "div",
    "a",
    "em",
    "strong",
    "small",
    "s",
    "cite",
    "q",
    "dfn",
    "abbr",
    "data",
    "time",
    "code",
    "var",
    "samp",
    "kbd",
    "sub",
    "sup",
    "i",
    "b",
    "u",
    "mark",
    "ruby",
    "rt",
    "rp",
    "bdi",
    "bdo",
    "span",
    "br",
    "wbr",
    "ins",
    "del",
    "img",
    "iframe",
    "embed",
    "object",
    "param",
    "video",
    "audio",
    "source",
    "track",
    "canvas",
    "map",
    "area",
    "svg",
    "math",
    "table",
    "caption",
    "colgroup",
    "col",
    "tbody",
    "thead",
    "tfoot",
    "tr",
    "td",
    "th",
    "form",
    "fieldset",
    "legend",
    "label",
    "input",
    "button",
    "select",
    "datalist",
    "optgroup",
    "option",
    "textarea",
    "keygen",
    "output",
    "progress",
    "meter",
    "details",
    "summary",
    "menuitem",
    "menu"
];
const maxContentCharacterCount = 1500;

function processNode(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        removeScriptTags(element);
        removeStyleTags(element);
        removeAttributes(element);
        removeSvgContent(element);
        Array.from(element.childNodes).forEach(processNode);
    } else if (node.nodeType === Node.COMMENT_NODE) {
        removeComments(node);
    } else if (node.nodeType === Node.TEXT_NODE) {
        truncateTextContent(node);
    }
}

function removeExtraContent(body) {
    const selectorsToRemove = ["#templates"];
    selectorsToRemove.forEach(selector => {
        const elementToRemove = body.querySelector(selector);
        if (elementToRemove) {
            elementToRemove.parentNode.removeChild(elementToRemove);
        }
    });
}

function removeStyleTags(element) {
    if (element.tagName === 'style') {
        element.parentNode?.removeChild(element);
    }
}

function truncateTextContent(node) {
    const isTextNode = node.nodeType === Node.TEXT_NODE;
    const parentNodeName = node.parentNode?.nodeName || '';
    const shouldKeepContent = keepContent.includes(parentNodeName.toLowerCase());

    if (isTextNode && !shouldKeepContent) {
        node.nodeValue = '';
        return;
    }

    if (
        isTextNode &&
        node.nodeValue &&
        node.nodeValue.length > maxContentCharacterCount
    ) {
        node.nodeValue = node.nodeValue.substring(0, maxContentCharacterCount);
        return;
    }

    Array.from(node.childNodes).forEach(truncateTextContent);
}

function addNodeId(element) {
    element.setAttribute('data-node-id', snapShotCurrentId.toString());
    snapShotCurrentId++;
}

function removeSvgContent(element) {
    if (element.tagName === 'svg') {
        element.innerHTML = '';
    }
}

function removeScriptTags(element) {
    const scripts = Array.from(element.getElementsByTagName('script'));
    scripts.forEach((script) => {
        if (script.parentNode) {
            script.parentNode.removeChild(script);
        }
    });
}

function removeComments(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

function removeAttributes(element) {
    if (element.nodeType === Node.ELEMENT_NODE) {
        for (const attr of Array.from(element.attributes)) {
            if (!keepAttributes.includes(attr.name)) {
                element.removeAttribute(attr.name);
            }
        }

        for (const child of Array.from(element.children)) {
            removeAttributes(child);
        }
    }
}

function getStyles() {
    let combinedStyles = '';
    for (const style of Array.from(document.getElementsByTagName('style'))) {
        combinedStyles += style.textContent || '';
    }

    for (const styleSheet of Array.from(document.styleSheets)) {
        if (styleSheet.href && styleSheet.href.startsWith(window.location.origin)) {
            try {
                for (const rule of Array.from(styleSheet.cssRules)) {
                    combinedStyles += rule.cssText;
                }
            } catch (e) {
                console.error('Error accessing stylesheet rules:', e);
            }
        }
    }
    return combinedStyles;
}

function getHtml(element) {
    removeExtraContent(element);
    processNode(element);
    return element.innerHTML.replace(/\s+/g, ' ');
}

async function getSnapshot(element) {
    await setTimeout(() => { }, 4000);
    const html = getHtml(element);
    return {
        html
    };
}
