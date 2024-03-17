import ElevenLabs from 'elevenlabs-node';

import Command from '../Command.js';
import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class RenderVoiceCommand extends Command {
    constructor() {
        super();
        this.voiceId = "LcfcDJNUP1GQjkzn1xUU";
        this.responseKeys = ["response", "html"];
        this.maxTextLength = 50;
        this.filePath = path.join(__dirname, `../../../public/audio/`);
        this.fileName = `${Date.now()}.mp3`;
        this.elevenLabsClient = new ElevenLabs({
            apiKey: process.env.ELEVENLABS_API_KEY,
            voiceId: this.voiceId
        });
    }

    async execute(data) {
        const text = this.checkString(data).slice(0, this.maxTextLength);
        if(!text){
            return;
        }
        const audioStream = await this.getAudioStream(text);
        //this.saveAudioStream(audioStream);
        return audioStream;
    }

    checkString(data) {
        let stringObject;
        if (typeof data === 'object' && data !== null) {
            stringObject = data;
        } else {
            try {
                stringObject = JSON.parse(data);
            } catch (error) {
                return data;
            }
        }

        for (let key of this.responseKeys) {
            if (stringObject.hasOwnProperty(key)) {
                return stringObject[key];
            }
        }
        return data;
    }

    async getAudioFile(text) {
        try {
            const audioFile = await this.elevenLabsClient.textToSpeech({
                fileName: this.fileName,
                textInput: text,
                voiceId: this.voiceId
            });
            return audioFile;
        } catch (error) {
            console.error('Error getAudioFile:', error);
        }
    }

    async getAudioStream(text) {
        try {
            const audioStream = await this.elevenLabsClient.textToSpeechStream({
                textInput: text,
                voiceId: this.voiceId,
                //stability: 0.5,
                //similarityBoost: 0.5,
                //modelId: "eleven_multilingual_v2",
                //style: 1,
                responseType: "stream",
                //speakerBoost: true
            });

            return audioStream;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    saveAudioStream(audioStream) {
        const writeStream = fs.createWriteStream(this.filePath + this.fileName);
        audioStream.pipe(writeStream);

        writeStream.on('finish', () => {
            console.log('The file has been saved!');
        });

        writeStream.on('error', (err) => {
            throw err;
        });
    }

    saveAudioFile(audioFile) {
        fs.writeFile(this.filePath + this.fileName, audioFile, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    }
}

export default RenderVoiceCommand;
