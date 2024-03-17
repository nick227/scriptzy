import { promises as fs } from 'fs';
import Command from '../Command.js';
import dotenv from 'dotenv';
import DB from '../../../src/db/DB.js';
dotenv.config();

export default class SaveImageCommand extends Command {
    constructor(req) {
        super();
        this.req = req;
        this.prompt = null;
        this.base64String = null;
        this.outputPath = process.env.GENERATED_IMAGES_PATH;
        this.db = new DB('ai-images.db');
        this.email = this.req.session?.user?.email;
    }

    async execute(base64String, prompt='') {
        try {
            this.prompt = prompt;
            this.base64String = base64String;
            const base64Data = this.base64String.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            const filePath = this.outputPath + this.createSafeFilename() + '-' + Date.now() + '.png';
            await fs.writeFile(filePath, buffer);

            console.log('Image written to:', filePath, this.email);

            this.db.insert({
                email: this.email,
                prompt: this.prompt,
                path: filePath
            });

        } catch (err) {
            console.error('There was an error writing the image file:', err);
        }
    }
    createSafeFilename() {
        const input = this.prompt;
        // Remove invalid filename characters (Windows)
        let safeFilename = input.replace(/[<>:"\/\\|?*\x00-\x1F]/g, '');
        // Replace new lines and carriage returns
        safeFilename = safeFilename.replace(/[\r\n]+/g, ' ');
        // Replace multiple spaces with a single space
        safeFilename = safeFilename.replace(/\s\s+/g, ' ');
        // Trim the string to the first 160 characters
        safeFilename = safeFilename.substring(0, 160);
        return safeFilename.trim();
    }
}

