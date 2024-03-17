import { promises as fs } from 'fs';
import Command from '../Command.js';
import dotenv from 'dotenv';
import DB from '../../../src/db/DB.js';
dotenv.config();

export default class SaveScriptCommand extends Command {
    constructor() {
        super();
        this.outputPath = process.env.UPLOADS_PATH + '/scripts/';
        this.db = new DB('scripts.db');
    }

    async execute(script, title) {
        this.saveScriptFile(script, title);
    }

    async saveScriptFile(script, title) {
        try {
            const filePath = this.outputPath + this.createSafeFilename(title) + '-' + Date.now() + '.txt';
            await fs.writeFile(filePath, script);
            const insertData = {
                title: title,
                path: filePath
            };
            await this.db.insertRow('scripts', insertData);

            console.log('Script written to:', filePath);

        } catch (err) {
            console.error('There was an error writing the Script file:', err);
            throw err;
        }
    }

    createSafeFilename(input) {
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

