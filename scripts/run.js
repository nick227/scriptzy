import DB from '../src/db/DB.js';
const db = new DB('promptTemplates.db');

const insertData = {
};

(async () => {
  try {
    ///await insertRow(insertData);
    await findAll();

  } catch (err) {
    console.error(err);
  }
})();


/*

EXAMPLES:

##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################
https://platform.openai.com/docs/guides/function-calling

{
  "type": "header",
  "messages": [
    {
      "role": "user",
      "content": "Return a good header title for a ${fieldName} field, write in ${style} style"
    },
    {
      "role": "assistant",
      "content": "You are a professional content writer."
    }
  ],
  "tool_choice": "get_header",
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_header",
        "description": "Create a header for my field",
        "parameters": {
          "type": "object",
          "properties": {
            "css": {
              "type": "string"
            },
            "section": {
              "type": "object",
              "properties": {
                "heading": {
                  "type": "object",
                  "properties": {
                    "text": {
                      "type": "string",
                      "description": "${title} ${tone} heading text"
                    },
                    "css": {
                      "type": "string",
                      "description": "actual css for heading, cohesive style, position, font, color, size, etc. ${style}"
                    }
                  }
                },
                "paragraph": {
                  "type": "object",
                  "properties": {
                    "text": {
                      "type": "string",
                      "description": "${title} ${tone} paragraph text"
                    },
                    "css": {
                      "type": "string",
                      "description": "actual css for paragraph, cohesive style, position, font, color, size, etc. ${style}"
                    }
                  }
                },
                "image": {
                  "type": "object",
                  "properties": {
                    "src": {
                      "type": "string"
                    },
                    "css": {
                      "type": "string",
                      "description": "actual css for image, cohesive style, position, style, etc."
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}

##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################

{
  "type": "intent",
  "messages": [
    {
      "role": "user",
      "content": "Read this prompt '${prompt}', if the prompt wants to create an image return 'image', if the prompt wants to create text return 'text', if the prompt wants to modify a webpage return 'csm', if the prompt wants to have a conversation return 'conversation'"
    },
    {
      "role": "system",
      "content": "You are a prompt interpreter, that can either respond 'image', 'text', 'csm', or 'conversation'"
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_intent",
        "description": "gets user intent from prompt",
        "parameters": {
          "type": "object",
          "properties": {
            "intent": {
              "type": "string",
              "enum": [
                "conversation",
                "text",
                "image",
                "csm"
              ]
            }
          }
        }
      }
    }
  ]
}

##########################################################################################################################################
##########################################################################################################################################
##########################################################################################################################################


{
  "type": "sections-from-title",
  "tool_choice": "get_sections",
  "messages": [
    {
      "role": "user",
      "content": "Generate an array of six nested section objects for ${section-title} a ${form-title} form. Each array element is a section object. Each section object has \"${section-title}\" as the heading, and a unique introduction paragraph at least 20 words about \"${section-title}\", and a relevant image url from https://source.unsplash.com/random/?term,term, and unique field suggestions. You must return the results in my defined structured schema."
    },
    {
      "role": "system",
      "content": "You are a professional web content writer and document expert, you have been tasked with creating an array of six \"${section-title}\" sections for a ${title} form. Get images from https://source.unsplash.com/random/?term,term where term is a search term. You must return the results in my defined structured schema."
    }
  ],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_sections",
        "description": "Creates realistic examples sections, fields, images and text for the ${section-title} section of a ${title} form",
        "parameters": {
          "type": "object",
          "properties": {
            "sections": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "heading": {
                    "type": "string",
                    "const": "${section-title}"
                  },
                  "paragraph": {
                    "type": "string"
                  },
                  "imageUrl": {
                    "type": "string"
                  },
                  "fields": {
                    "type": "array",
                    "items": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  ]
}

*/



async function insertRow(data) {
  const newRow = await db.insert(data);
  console.log('Inserted:', newRow);
}

async function findAll() {
  const foundRows = await db.find({});
  console.log('Found:', foundRows.length);
  console.log(foundRows);
}

async function removeAll() {
  db.remove({ type: 'section' }, { multi: true }, function (err, numRemoved) {
    if (err) {
      console.error('Error:', err);
    } else {
      console.log('Number of documents removed:', numRemoved);
    }
  });
}
