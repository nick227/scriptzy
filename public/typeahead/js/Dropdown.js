
class Dropdown {
  constructor(typeaheadElement, suggestions, relatedTerms) {
    this.userText = typeaheadElement.querySelector('span');
    this.dropdown = typeaheadElement.querySelector('#dropdown');
    this.dropdownList = typeaheadElement.querySelectorAll('ul')[0];
    this.relatedTermsList = typeaheadElement.querySelectorAll('ul')[1];
    this.relatedTerms = relatedTerms;
    this.suggestions = suggestions;
    this.typeaheadElement = typeaheadElement;
    this.mouseOverDropdown = false;
    this.activeIndex = -1;
    this.itemSelected = false;

    this.init();
  }

  init() {
    this.typeaheadElement.addEventListener('input', e => this.delegateEvent(e));
    this.typeaheadElement.addEventListener('focusout', e => this.delegateEvent(e));
    this.typeaheadElement.addEventListener('keydown', e => this.delegateEvent(e));
    this.typeaheadElement.addEventListener('mouseover', e => this.delegateEvent(e));
    this.typeaheadElement.addEventListener('mouseout', e => this.delegateEvent(e));
    this.typeaheadElement.addEventListener('click', e => this.delegateEvent(e));
  }

  delegateEvent(event) {
    const target = event.target;
    switch (event.type) {
      case 'input':
        if (target === this.userText) {
          this.update();
        }
        break;
      case 'focusout':
        if (target === this.userText) {
          this.handleFocusOut();
        }
        break;
      case 'keydown':
        //if (target === this.userText) {
          this.handleKeydown(event);
        //}
        break;
      case 'mouseover':
        if (target.closest('ul') === this.dropdownList || target.closest('ul') === this.relatedTermsList) {
          this.mouseOverDropdown = true;
        }
        break;
      case 'mouseout':
        if (target.closest('ul') === this.dropdownList || target.closest('ul') === this.relatedTermsList) {
          this.mouseOverDropdown = false;
        }
        break;
      case 'click':
        if (target.closest('ul') === this.relatedTermsList) {
          this.clickRelated(event);
        }
        break;
      default:
        break;
    }
  }

  clearList(list) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }

  clear() {
    this.dropdown.classList.add('hidden');
    this.typeaheadElement.classList.remove('open');
    this.clearList(this.dropdownList);
    this.clearList(this.relatedTermsList);
    this.activeIndex = -1;
  }

  update() {
    const query = this.userText.textContent.trim().toLowerCase();
    const matches = [];
    const nearMatches = [];
  
    for (const suggestion of this.suggestions) {
      const lowerSuggestion = suggestion.toLowerCase();
      const words = lowerSuggestion.split(' ');
  
      if (lowerSuggestion.startsWith(query)) {
        matches.push(suggestion);
      } else if (words.some(word => word.startsWith(query))) {
        nearMatches.push(suggestion);
      }
    }
  
    const sortedSuggestions = matches.concat(nearMatches);
  
    if (query === '') {
      this.clear();
      return;
    }
  
    this.populateDropdown(sortedSuggestions);
  }
  



  handleKeydown(event) {
    const items = Array.from(this.dropdownList.querySelectorAll('li'));
    this.itemSelected = false;

    if (['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
      event.preventDefault();
    }

    switch (event.key) {
      case 'ArrowDown':
        this.handleArrowDown(items);
        break;
      case 'ArrowUp':
        this.handleArrowUp();
        break;
      case 'Enter':
        this.handleEnter(items, event);
        break;
      default:
        return;
    }

    this.updateActiveItem(items);
  }

  handleArrowDown(items) {
    this.activeIndex = Math.min(this.activeIndex + 1, items.length - 1);
  }

  handleArrowUp() {
    this.activeIndex = Math.max(this.activeIndex - 1, -1);
  }

  handleEnter(items, event) {
    if (this.activeIndex >= 0) {
      this.userText.textContent = items[this.activeIndex].textContent;
      this.itemSelected = true;
      this.placeCaretAtEnd();
  
      // Manually dispatch an input event
      const inputEvent = new Event('input', {
        'bubbles': true,
        'cancelable': true
      });
      this.userText.dispatchEvent(inputEvent);
    }
    // Clear the dropdown regardless of whether an item was selected or not
    this.clear();
    event.preventDefault();
  }
  
  updateActiveItem(items) {
    items.forEach((item, index) => {
      item.classList.toggle('active', index === this.activeIndex);
    });
  }

  placeCaretAtEnd() {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(this.userText.childNodes[0], this.userText.textContent.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  handleFocusOut() {
    if (!this.mouseOverDropdown && !this.itemSelected) {
      this.clear();
    }
    this.itemSelected = false;
  }

  createListItem(match, isRelated = false) {
    const li = document.createElement('li');
    li.addEventListener('mouseover', (event) => this.hover(match, li, isRelated, event));
    li.addEventListener('mouseout', (event) => this.removeHover(event));
    li.addEventListener('click', isRelated ? (event) => this.clickRelated(event) : (event) => this.click(event));
    li.textContent = match;
    return li;
  }

  populateDropdown(matches) {
    this.clear();
    if (matches.length > 0) {
      // Populate main list
      const listItems = matches.map(match => this.createListItem(match));
      listItems.forEach(li => this.dropdownList.appendChild(li));

      // Populate related terms
      const key = this.activeIndex >= 0 ? matches[this.activeIndex] : matches[0];
      const relatedItems = this.relatedTerms[key].map(term => this.createListItem(term, true));
      relatedItems.forEach(li => this.relatedTermsList.appendChild(li));

      this.typeaheadElement.classList.add('open');
      this.dropdown.classList.remove('hidden');
    }
  }

  click(event) {
    this.userText.textContent = event.target.textContent;
  }

  clickRelated(event) {
    if (event.target && event.target.textContent) {
      this.userText.textContent = event.target.textContent;
      this.clear();
      this.update();
    }
  }

  hover(newKey, liElement, isRelated = false, event) {
    if (event.target) { // Check if event.target exists
      event.target.classList.add('active');
    }

    if (!isRelated) {
      if (this.relatedTerms[newKey]) { // Check for undefined
        const relatedItems = this.relatedTerms[newKey];
        const listItems = relatedItems.map(term => this.createListItem(term, true));
        while (this.relatedTermsList.firstChild) {
          this.relatedTermsList.removeChild(this.relatedTermsList.firstChild);
        }
        listItems.forEach(li => this.relatedTermsList.appendChild(li));
      }
    }
  }

  removeHover(event) {
    if (event.target) { // Check if event.target exists
      event.target.classList.remove('active');
    }
  }
}