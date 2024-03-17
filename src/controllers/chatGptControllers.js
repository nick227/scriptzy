import sendSocketMsgToClient from '../sendSocketMsgToClient.js';
import { TemplatePromptCommand, DefaultPromptCommand, ImagePromptCommand } from '../commands/prompt/index.js';

const chatGptControllers = async (req, res) => {
  const endpoint = typeof req.params?.endpoint === 'string' ? req.params.endpoint : null;
  try {
    console.log('endpoint', endpoint)
    switch (true) {
      //image route
      case endpoint === "image":
        const imagePromptCommand = new ImagePromptCommand(req, res);
        await imagePromptCommand.execute();
        break;
      //template route
      case endpoint === "template":
        const templatePromptCommand = new TemplatePromptCommand(req, res);
        await templatePromptCommand.execute();
        break;
      //default route
      case endpoint === "chat":
      default:
        const defaultPromptCommand = new DefaultPromptCommand(req, res);
        await defaultPromptCommand.execute();
        break;
    }
  } catch (error) {
    console.error('Error:', error);
    sendSocketMsgToClient(error, req);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default chatGptControllers;
