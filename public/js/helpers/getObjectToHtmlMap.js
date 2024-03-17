getObjectToHtmlMap = (item, key) => {
    const map = {
        get promptTemplates() {
            let children = [];
            if (item.type) {
                children.push({
                    elementType: 'h2',
                    textContent: item.type
                });
            }
            children.push({
                elementType: 'div',
                htmlContent: `<pre>${JSON.stringify(item, null, 2)}</pre>`
            });
            return {
                elementType: 'div',
                children: children,
                className: 'prompt-template'
            };
        },
        get forms() {
            return {
                elementType: 'div',
                className: 'title',
                children: [
                    {
                        elementType: 'a',
                        textContent: item.title,
                        attributes: {
                            onclick: (event) => handleTitleClick(item.title)
                        }
                    },
                    {
                        elementType: 'p',
                        textContent: item.description
                    }
                ]
            };
        },
        get stage() {
            return {
                elementType: 'section',
                className: 'stage',
                css: '',
                label: item.name,
                textContent: '',
                attributes: {
                    required: true,
                    title: 'testing'
                }
            };
        },
        get descriptions() {
            return {
                elementType: 'div',
                className: 'description',
                children: [
                    {
                        elementType: 'h3',
                        textContent: item.category
                    },
                    {
                        elementType: 'h5',
                        textContent: item.name
                    },
                    {
                        elementType: 'p',
                        textContent: item.text
                    }
                ]
            };
        },
        get elements() {
            return {
                elementType: 'div',
                className: 'element-name',
                textContent: item.name,
                attributes: {
                    onclick: (event) => handleElementNameClick(item.name)
                }
            };
        },
        get fieldLists() {
            return {
                elementType: 'div',
                className: 'field-lists',
                children: [
                    {
                        elementType: 'h3',
                        textContent: item.name
                    },
                    {
                        elementType: 'ul',
                        children: item.list.map((field) => ({
                            elementType: 'li',
                            className: 'field',
                            children: [
                                {
                                    elementType: 'p',
                                    textContent: field
                                }
                            ]
                        }))
                    }
                ]
            };
        },
        get palettes() {
            return {
                elementType: 'div',
                className: 'palette',
                children: [
                    {
                        elementType: 'h3',
                        textContent: item.name
                    },
                    {
                        elementType: 'p',
                        textContent: item.description
                    },
                    {
                        elementType: 'div',
                        className: 'row',
                        children: item.colors ? item.colors.map((color) => ({
                            elementType: 'div',
                            css: `background: ${color.hex};`,
                            title: color.friendly
                        })) : []
                    }
                ]
            };
        }
    };
    return map[key];
};
