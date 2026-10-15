class Ball {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = 40;
        this.y = height / 2;
        this.r = 8;
        const angle = random(-0.5, 0.5);
        const speed = 7;
        this.vx = cos(angle) * speed;
        this.vy = sin(angle) * speed;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off Top and Bottom boundaries
        if (this.y - this.r <= 0) {
            this.y = this.r;
            this.vy *= -1;
        } else if (this.y + this.r >= height) {
            this.y = height - this.r;
            this.vy *= -1;
        }

        // Bounce off Left Wall
        if (this.x - this.r <= 0) {
            this.x = this.r;
            this.vx *= -1;
        }
    }

    show() {
        fill(255, 0, 127);
        noStroke();
        circle(this.x, this.y, this.r * 2);
    }
}

export default Ball;
