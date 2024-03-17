async function toggleNextAnimation(remove=false) {
  document.querySelectorAll('canvas').forEach(el => el.remove());
  this.typeaheadElement.classList.toggle('bounce-up');
  this.typeaheadElement.classList.toggle('disabled');
  this.searchIcon.classList.toggle('hidden');
  this.reloadIcon.classList.toggle('hidden');

  const section2 = document.querySelector('.section-2');
  if (!remove) {
    this.userText.contentEditable = false;
    new Grid();
    new MockUp('polished');
  } else {
    section2.classList.toggle('hidden');
    this.userText.contentEditable = true;
  }
}

class Typeahead {
  constructor(typeaheadElement, suggestions) {
    this.userText = typeaheadElement.querySelector('span');
    this.searchIcon = typeaheadElement.querySelectorAll('i')[0];
    this.reloadIcon = typeaheadElement.querySelectorAll('i')[1];
    this.suggestionText = this.userText.nextElementSibling;
    this.suggestions = suggestions;
    this.typeaheadElement = typeaheadElement;
    this.toggleLoader = toggleNextAnimation.bind(this);
    this.init();
  }

  init() {
    this.userText.addEventListener('input', () => {
      this.togglePlaceholder();
      this.update();
    });
    this.userText.addEventListener('keydown', e => e.key === "Tab" && this.complete(e));
    this.userText.addEventListener('keyup', e => e.key === "Enter" && this.submit());
    this.userText.addEventListener('focusout', () => this.clear());
    this.searchIcon.addEventListener('click', () => this.submit());
    this.reloadIcon.addEventListener('click', () => this.reload());
    this.userText.parentElement.addEventListener('click', () => this.userText.focus());
  }

  submit() {
    if(this.userText.textContent){
      this.clear();
      this.toggleLoader();
      submitNewTitle(this.userText.textContent);
    }
  }

  reload() {
    this.toggleLoader(true);
  }

  togglePlaceholder() {
    if (this.userText.textContent.trim() === '') {
      this.userText.classList.add('empty');
    } else {
      this.userText.classList.remove('empty');
    }
  }

  update() {
    const query = this.userText.textContent.trim().toLowerCase();
    if (query.length === 0) {
      this.clear();
      return;
    }
    const suggestion = this.suggestions.find(s => s.toLowerCase().startsWith(query));
    this.suggestionText.textContent = suggestion ? suggestion.slice(query.length) : "";
  }

  complete(event) {
    event.preventDefault();
    this.userText.textContent += this.suggestionText.textContent;
    this.placeCaretAtEnd();
    this.clear();
  }

  placeCaretAtEnd() {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(this.userText.childNodes[0], this.userText.textContent.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  clear() {
    this.suggestionText.textContent = "";
  }
}