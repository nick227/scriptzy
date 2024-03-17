import { promises as fs } from 'fs';
import Command from '../Command.js';
import dotenv from 'dotenv';
import DB from '../../../src/db/DB.js';
dotenv.config();

export default class CompletionManagerCommand extends Command {
    constructor(userId) {
        super();
        this.userId = userId;
        this.db = new DB('completions.db');
        this.completions = {
            stages: [
                {
                    name: 'analyze_characters',
                    status: null,
                    order: 10
                },
                {
                    name: 'analyze_plots',
                    status: null,
                    order: 9
                },
                {
                    name: 'analyze_scenes',
                    status: null,
                    order: 8
                },
                {
                    name: 'generate_shot_list',
                    status: null,
                    order: 7
                },
                {
                    name: 'generate_lighting_setups_list',
                    status: null,
                    order: 6
                },
                {
                    name: 'writing_consultation',
                    status: null,
                    order: 5
                },
                {
                    name: 'idea_brainstorming',
                    status: null,
                    order: 4
                },
                {
                    name: 'locations_set_production_designer',
                    status: null,
                    order: 3
                },
                {
                    name: 'ai_inspiration_image_prompt_generator',
                    status: null,
                    order: 2
                },
                {
                    name: 'script_beats_generator',
                    status: null,
                    order: 1
                },
                {
                    name: 'upload_script',
                    status: null,
                    order: 0
                }
            ],
        };
        (async () => {
            await this.setup();
        })();
    }

    async setup() {
        try {
            console.log('Completion Manager Command');
            if (this.user) {
                await this.getUserCompletions(this.userId);
            }
            return this.completions;
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;
        }
    }

    async getUserCompletions(userId) {
        this.completions = await this.db.find({ userId: this.userId });
    }

    async updateCompletionStatus(stage, status) {
        this.completions[stage].status = status;
        await this.db.update({ userId: this.userId }, this.completions);
    }
}

