import fs from "fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';
import { Document, VectorStoreIndex } from "llamaindex";
import Command from '../../Command.js';

//import pdfParse from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class QueryDocumentCommand extends Command {
    constructor(fileName) {
        console.log('fileName', fileName)
        super();
        const dir = './public/uploads';
        this.filePath = path.join(dir, fileName);
    }

    async execute(prompt) {
        console.log('-----')
        console.log('prompt', prompt);

        const essay = await this.readPDFFile();
        const document = this.createDocument(essay);
        console.log('essay', essay);
        console.log('document', document);
        console.log('*-*-')
        /*
        const index = await this.createIndex(document);
        const queryEngine = this.createQueryEngine(index);
        const response = await this.executeQuery(queryEngine, prompt);
        console.log('response.toString()', response.toString())
        console.log('-----')
        return response.toString();
        */
    }

    async readPDFFile() {
        return new Promise((resolve, reject) => {
            let extractedText = [];

            new PdfReader().parseFileItems(this.filePath, (err, item) => {
                if (err) {
                    console.error("error:", err);
                    reject(err);
                } else if (!item) {
                    console.warn("end of file");
                    resolve(extractedText.join(' '));
                } else if (item.text) {
                    extractedText.push(item.text);
                }
            });
        });
    }

    createDocument(text) {
        return new Document({ text });
    }

    async createIndex(document) {
        return await VectorStoreIndex.fromDocuments([document]);
    }

    createQueryEngine(index) {
        return index.asQueryEngine();
    }

    async executeQuery(queryEngine, prompt) {
        return await queryEngine.query(prompt);
    }

    async test(prompt) {
        console.log('-----')
        console.log('prompt', prompt);

        const essay = await fs.readFile(this.filePath, "utf-8");
        const document = new Document({ text: essay });
        console.log('essay', essay);
        //const index = await VectorStoreIndex.fromDocuments([document]);
        //console.log('index', index);
        const queryEngine = index.asQueryEngine();
        //const response = await queryEngine.query(prompt);
        //console.log('response.toString()', response.toString())
        console.log('-----')
        return response.toString();
    }
}