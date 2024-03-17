export default class AddToQueueCommand {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
        this.results = [];
        this.delay = 1000;
    }

    async enqueue(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            if (!this.isProcessing) {
                this.processQueue();
            }
        });
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const { task, resolve, reject } = this.queue.shift();
            try {
                const result = await task();
                this.results.push(result); 
                resolve(result);
            } catch (error) {
                console.error("Error processing queue item:", error);
                reject(error);
            }
            await new Promise(resolve => setTimeout(resolve, this.delay));
        }

        this.isProcessing = false;
    }
}