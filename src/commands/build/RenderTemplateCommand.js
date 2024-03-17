import Command from '../Command.js';

class RenderTemplateCommand extends Command {
  execute(templates, params) {
    if (!Array.isArray(templates)) {
      return this.replaceTemplate(params, templates);
    }

    const results = [];

    for (const template of templates) {
      results.push(this.replaceTemplate(params, template));
    }

    return results;
  }

  replaceTemplate(params, template) {
    if (typeof template !== 'string') {
      console.error('Template is not a string:', template);
      return template;
    }
    return template.replace(/\$\{(\w+)\}/g, function(_, key) {
      return params[key] || "";
    });
  }
}

export default RenderTemplateCommand;
