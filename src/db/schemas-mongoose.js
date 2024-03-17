const mongoose = require('mongoose');
const { Schema } = mongoose;
const { htmlElementTypesEmum } = require('./constants.js');

const createTemplateSchema = (depth) => {
  if (depth === 0) return [];
  return new Schema({
    name: String,
    description: String,
    keywords: String,
    elementType: { type: String, enum: htmlElementTypesEmum },
    id: String,
    className: String,
    css: String,
    content: String,
    textContent: String,
    value: String,
    attributes: Schema.Types.Mixed,
    children: [createTemplateSchema(depth - 1)]
  });
};

const TemplateSchema = createTemplateSchema(5);

const StyleSchema = new Schema({
  name: String,
  description: String,
  theme: String,
  css: String,
  element: { type: String, enum: htmlElementTypesEmum },
  category: String,
  states: Schema.Types.Mixed
});

const ElementSchema = new Schema({
  type: { type: String, enum: htmlElementTypesEmum },
  name: String
});

const FormSchema = new Schema({
  title: String,
  description: String,
  keywords: String
});

const FieldListSchema = new Schema({
  name: String,
  category: String,
  list: [String]
});

const FieldSchema = new Schema({
  value: String,
  type: String
});

const DescriptionSchema = new Schema({
  text: String,
  category: String,
  name: String
});

const LabelSchema = new Schema({
  textContent: String,
  keywords: String
});

const PaletteSchema = new Schema({
    name: String,
    description: String,
    colors: {
      functional: String,
      friendly: String,
      usage: String,
      hex: String,
      rgba: String
    }
  });
  
  const ContentSchema = new Schema({
    textContent: String,
    type: String,
    keywords: String
  });
  
  const PromptSchema = new Schema({
    text: String,
    type: String,
    userId: String
  });
  
  const ChatGPTTransactionSchema = new Schema({
    response: {
      id: String,
      object: String,
      created: Number,
      model: String,
      choices: [{
        index: Number,
        message: {
          role: String,
          content: Schema.Types.Mixed
        },
        finish_reason: String
      }],
      usage: {
        prompt_tokens: Number,
        completion_tokens: Number,
        total_tokens: Number
      }
    },
    prompt: String,
    userId: String
  });
  
  const PromptTemplateSchema = new Schema({
    templates: [{
      title: String,
      collectionName: String,
      type: { type: String, enum: ['common-fields', 'form-description', 'form-template'] },
      template: String
    }],
    type: { type: String, enum: ['initial-prompt', 'text-improve', 'image-enhance', 'template-make'] }
  });
  
  const PromptModifierSchema = new Schema({
    textContent: String,
    type: { type: String, enum: ['layout', 'style', 'industry', 'adjectives', 'boosters'] }
  });
  
  const ChatGPTQuerySchema = new Schema({
    prompt: String,
    result: String,
    error: String,
    model: String
  });

module.exports = {
  Template: mongoose.model('Template', TemplateSchema),
  Style: mongoose.model('Style', StyleSchema),
  Element: mongoose.model('Element', ElementSchema),
  Form: mongoose.model('Form', FormSchema),
  FieldList: mongoose.model('FieldList', FieldListSchema),
  Field: mongoose.model('Field', FieldSchema),
  Description: mongoose.model('Description', DescriptionSchema),
  Label: mongoose.model('Label', LabelSchema),
  Palette: mongoose.model('Palette', PaletteSchema),
  Content: mongoose.model('Content', ContentSchema),
  Prompt: mongoose.model('Prompt', PromptSchema),
  ChatGPTTransaction: mongoose.model('ChatGPTTransaction', ChatGPTTransactionSchema),
  PromptTemplate: mongoose.model('PromptTemplate', PromptTemplateSchema),
  PromptModifier: mongoose.model('PromptModifier', PromptModifierSchema),
  ChatGPTQuery: mongoose.model('ChatGPTQuery', ChatGPTQuerySchema)
};
