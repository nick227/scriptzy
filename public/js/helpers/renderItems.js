function createListItem(item, key) {
  const options = getObjectToHtmlMap(item, key);
  const html = createHtmlElement(options);
  html.dataset.id = item._id;
  html.classList.add('item');
  const deleteBtn = createDeleteButton(html, item);
  html.insertBefore(deleteBtn, html.firstChild);
  const copyBtn = createCopyButton(html);
  html.insertBefore(copyBtn, html.firstChild);
  return html;
}

function createInputField() {
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'search prompts';
    return inputField;
}

function filterListItems(inputField, listWrapper) {
  const filter = inputField.value.toUpperCase();
  const items = listWrapper.querySelectorAll('.item'); 
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const txtValue = item.querySelector('h2').textContent;
    if (txtValue.toUpperCase().startsWith(filter)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  }
}

function renderListItem(listWrapper, itemText) {
    const li = document.createElement('li');
    li.textContent = itemText;
    listWrapper.appendChild(li);
}

function renderList(list, key, target) {
  const wrapper = createHtmlElement({ elementType: 'section', className: `${key} wrapper` });
  const inputField = createInputField();
  inputField.onkeyup = function() {
      filterListItems(inputField, wrapper);
  };
  wrapper.insertBefore(inputField, wrapper.firstChild);
  list.forEach((item) => {
    const html = createListItem(item, key);
    wrapper.appendChild(html);
  });
  target.appendChild(wrapper);
}

function addToList(item, key) {
  const list = document.querySelector('.wrapper');
  const html = createListItem(item, key);
  list.insertBefore(html, list.firstChild);
}

function createDeleteButton(html, item) {
  const deleteBtn = createHtmlElement({ elementType: 'button', className: 'delete', textContent: 'delete' });
  deleteBtn.addEventListener('click', async () => {
    handleDeleteButton(html, item);
  });
  return deleteBtn;
}

function createCopyButton(html) {
  const copyBtn = createHtmlElement({ elementType: 'button', className: 'copy', textContent: 'copy' });
  copyBtn.addEventListener('click', async () => {
    handleAddToClipboardButton(html);
  });
  return copyBtn;
}

function handleAddToClipboardButton(html) {
  const pre = html.querySelector('pre');
  navigator.clipboard.writeText(pre.textContent);
}

async function handleDeleteButton(html, item) {
  const confirmDelete = window.confirm(`Delete template: ${item.type}?`);
  if (confirmDelete) {
    const id = html.dataset.id;
    const confirmDelete2 = window.confirm("There is no backup. This will be gone forever. Are you sure?");
    if (confirmDelete2) {
      await api.delete('api/promptTemplates', { _id: id });
      html.remove();
    };
  }
}

function createElements(configs) {
  return configs.map(config => {
      const element = createElementFromConfig(config);
      if (config.children) {
          const children = createElements(config.children);
          children.forEach(child => element.appendChild(child));
      }
      return element;
  });
}

function createElementFromConfig(config) {
  const element = createHtmlElement(config.type);
  element.className = config.className;
  if (config.textContent) element.textContent = config.textContent;
  if (config.href) element.href = config.href;
  if (config.style) element.style = config.style;
  if (config.target) element.target = config.target;
  if (config.type === 'input') element.type = config.inputType;
  if (config.placeholder) element.placeholder = config.placeholder;
  if (config.id) element.id = config.id;
  if (Array.isArray(config.event)) {
      config.event.forEach(event => element.addEventListener(event.type, event.handler));
  } else if (config.event) {
      element.addEventListener(config.event.type, config.event.handler);
  }
  if (config.options && config.type === 'select') {
      let defaultOptionValue = config.defaultValue;
      for (let optionValue of config.options) {
          const optionElement = document.createElement('option');
          optionElement.value = optionValue;
          optionElement.textContent = optionValue;
          if (optionValue === defaultOptionValue) {
              optionElement.selected = true;
          }
          element.appendChild(optionElement);
      }
  }
  return element;
}

async function renderDataObject(key, target) {
  const data = await api.read(`api/${key}`);
  renderList(data, key, target);
}