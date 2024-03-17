class TextFader {
    constructor({
        htmlStrings,
        targetSelector,
        displayDuration = 4500,
        removeDelay = 2000,
        fadeInClass = 'slide-in-right',
        fadeOutClass = 'slide-out-left'
    }) {
        this.htmlStrings = htmlStrings;
        this.targetElement = document.querySelector(targetSelector);
        this.index = 0;
        this.displayDuration = displayDuration;
        this.removeDelay = removeDelay;
        this.fadeInClass = fadeInClass;
        this.fadeOutClass = fadeOutClass;
    }

    start() {
        this.showNext();
    }

    showNext() {
        if (this.index === this.htmlStrings.length) return; 
        const newDiv = this.createDivWithContent();
        this.fadeIn(newDiv);
    }    

    isLastElement() {
        return this.index >= this.htmlStrings.length - 1;
    }

    createDivWithContent() {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = this.htmlStrings[this.index];
        return newDiv;
    }

    fadeIn(element) {
        this.applyClass(element, this.fadeInClass);
        setTimeout(() => this.fadeOut(element), this.displayDuration);
    }

    fadeOut(element) {
        if (this.isLastElement()) return;
        this.applyClass(element, this.fadeOutClass);
        setTimeout(() => this.removeElement(element), this.removeDelay);
    }

    applyClass(element, className) {
        element.className = className;
        this.targetElement.appendChild(element);
    }

    removeElement(element) {
        this.targetElement.removeChild(element);
        this.index++;
        this.showNext();
    }
}

// Usage
const options = {
    htmlStrings: formsTips,
    targetSelector: '.text-fader-container'
};
const textFader = new TextFader(options);
textFader.start();
