import dotenv from 'dotenv';
import Command from '../../Command.js';
import { SavePromptResultCommand } from '../index.js';

dotenv.config();

class ChatGptImageRequest extends Command {
  constructor(openaiInstance, req) {
    super();
    this.req = req;
    this.openai = openaiInstance;
    this.dalleModel = process.env.DALLE_MODEL;
    this.SavePromptResultCommand = SavePromptResultCommand;
  }

  async execute(prompt) {
    if (!prompt) {
      throw new Error('Prompt is empty.');
    }

    const options = {
      model: this.dalleModel,
      prompt: prompt,
      n: 1,
      quality: 'hd',
      response_format: 'b64_json',
      size: '1024x1024'
    };

    try {
      const completion = await this.openai.images.generate(options);
      return completion;

    } catch (error) {
      console.error("Error sending prompt to Dalle-3:", error);
      throw new Error('Failed to get response from Dalle-3.');
    }
  }
}

export default ChatGptImageRequest;