

function listenForEvent(eventName, callback) {
    document.addEventListener(eventName, function (event) {
        callback(event.detail);
    });
}

function dispatchEvent(eventName, parameters = {}) {
    const event = new CustomEvent(eventName, { parameters });
    document.dispatchEvent(event);
}