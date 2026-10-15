class PaddleAgent {
    constructor(brain, { width, height, paddleX, paddleW, paddleH }) {
        this.brain = brain;
        this.width = width;
        this.height = height;
        this.paddleX = paddleX;
        this.paddleW = paddleW;
        this.paddleH = paddleH;
        this.reset();
    }

    reset() {
        this.y = this.height / 2 - this.paddleH / 2;
        this.alive = true;
        this.score = 0;
        this.hits = 0;
    }

    // Neural Network Decision Step
    think(ball) {
        if (!this.alive) return;

        // 5 Inputs normalized between [0, 1]
        const inputs = [
            ball.x / this.width,
            ball.y / this.height,
            (ball.vx + 15) / 30,
            (ball.vy + 15) / 30,
            this.y / (this.height - this.paddleH),
        ];

        // Activate Neural Net
        const output = this.brain.activate(inputs);

        // Decide movement
        if (output[0] > output[1] && output[0] > 0.4) {
            this.y -= 6 * output[0]; // Move UP
        } else if (output[1] > output[0] && output[1] > 0.4) {
            this.y += 6 * output[1]; // Move DOWN
        }

        // Keep paddle within canvas
        this.y = Math.max(0, Math.min(this.y, this.height - this.paddleH));

        // Survival reward
        this.score += 0.1;
    }

    show(isBest = false) {
        if (!this.alive) return;

        if (isBest) {
            fill(0, 243, 255);
            stroke(255);
            strokeWeight(1);
        } else {
            fill(0, 243, 255, 40);
            noStroke();
        }
        rect(this.paddleX, this.y, this.paddleW, this.paddleH, 4);
    }
}

export default PaddleAgent;
