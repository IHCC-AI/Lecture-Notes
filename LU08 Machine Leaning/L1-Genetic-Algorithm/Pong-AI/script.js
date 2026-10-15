import PaddleAgent from './js/PaddleAgent.js';
import Ball from './js/Ball.js';

// Simulation Constants
const POP_SIZE = 30;
const PADDLE_W = 12;
const PADDLE_H = 65;
let PADDLE_X;

let neat;
let ball;
let paddles = [];
let generation = 1;
let highScore = 0;
let highBounceCount = 0;

// DOM elements
let speedSlider, speedVal, hudGen, hudAlive, hudHighScore, hudBestBounces;

function initNeat() {
    neat = new neataptic.Neat(
        5,
        2,
        null, // 5 Inputs, 2 Outputs
        {
            mutation: [
                neataptic.methods.mutation.ADD_NODE,
                neataptic.methods.mutation.SUB_NODE,
                neataptic.methods.mutation.ADD_CONN,
                neataptic.methods.mutation.SUB_CONN,
                neataptic.methods.mutation.MOD_WEIGHT,
                neataptic.methods.mutation.MOD_BIAS,
            ],
            popsize: POP_SIZE,
            mutationRate: 0.3,
            elitism: Math.round(POP_SIZE * 0.1), // Keep top 10%
            network: new neataptic.architect.Random(5, 4, 2),
        },
    );

    createPaddles();
}

function createPaddles() {
    paddles = [];
    for (let i = 0; i < POP_SIZE; i++) {
        paddles.push(
            new PaddleAgent(neat.population[i], {
                width,
                height,
                paddleX: PADDLE_X,
                paddleW: PADDLE_W,
                paddleH: PADDLE_H,
            }),
        );
    }
}

function evolvePopulation() {
    // Assign calculated fitness scores to NEAT genomes
    for (let i = 0; i < POP_SIZE; i++) {
        neat.population[i].score = paddles[i].score;
    }

    neat.sort();

    // Track high score
    if (neat.population[0].score > highScore) {
        highScore = Math.floor(neat.population[0].score);
    }

    const newPopulation = [];

    // Elitism: Pass best performing brains directly
    for (let i = 0; i < neat.elitism; i++) {
        newPopulation.push(neat.population[i]);
    }

    // Mutate and produce offspring for the rest
    for (let i = 0; i < POP_SIZE - neat.elitism; i++) {
        newPopulation.push(neat.getOffspring());
    }

    neat.population = newPopulation;
    neat.mutate();
    generation++;

    createPaddles();
    ball.reset();
}

function setup() {
    // Create canvas and attach to HTML div
    const canvas = createCanvas(760, 420);
    canvas.parent('canvas-container');

    PADDLE_X = width - 35;

    // Cache DOM Elements
    speedSlider = document.getElementById('speedSlider');
    speedVal = document.getElementById('speedVal');
    hudGen = document.getElementById('hudGen');
    hudAlive = document.getElementById('hudAlive');
    hudHighScore = document.getElementById('hudHighScore');
    hudBestBounces = document.getElementById('hudBestBounces');

    // Setup Buttons
    document.getElementById('btnReset').onclick = () => {
        generation = 1;
        highScore = 0;
        highBounceCount = 0;
        initNeat();
        ball.reset();
    };

    // Initialize Game Objects & AI
    ball = new Ball();
    initNeat();
}

function draw() {
    background(13, 17, 23);

    // Read Speed Multiplier Slider
    const speedMultiplier = parseInt(speedSlider.value);
    speedVal.innerText = `Speed: ${speedMultiplier}x`;

    // Run Physics Updates multiple times per frame for fast-forward training
    for (let s = 0; s < speedMultiplier; s++) {
        updatePhysics();
    }

    ball.show();

    // Find current best living paddle for highlight rendering
    let bestPaddle = null;
    let maxScore = -1;
    paddles.forEach((p) => {
        if (p.alive && p.score > maxScore) {
            maxScore = p.score;
            bestPaddle = p;
        }
    });

    paddles.forEach((p) => p.show(p === bestPaddle));

    // Update UI Stats
    const aliveCount = paddles.filter((p) => p.alive).length;
    hudGen.innerText = generation;
    hudAlive.innerText = `${aliveCount} / ${POP_SIZE}`;
    hudHighScore.innerText = highScore;
    hudBestBounces.innerText = highBounceCount;
}

function updatePhysics() {
    ball.update();

    let aliveCount = 0;
    let ballHitByPaddle = false;

    const isAtPaddleX =
        ball.x + ball.r >= PADDLE_X &&
        ball.x - ball.r <= PADDLE_X + PADDLE_W &&
        ball.vx > 0;

    paddles.forEach((paddle) => {
        if (!paddle.alive) return;
        aliveCount++;

        // AI Neural Network Think Step
        paddle.think(ball);

        // Collision Detection when ball reaches paddle plane
        if (isAtPaddleX) {
            if (ball.y >= paddle.y - 5 && ball.y <= paddle.y + PADDLE_H + 5) {
                paddle.score += 500; // Reward for hit
                paddle.hits++;
                highBounceCount = Math.max(highBounceCount, paddle.hits);
                ballHitByPaddle = true;
            } else {
                paddle.alive = false; // Missed
            }
        }
    });

    // Bounce ball if at least 1 paddle made contact
    if (ballHitByPaddle) {
        ball.vx = -Math.abs(ball.vx) * 1.03;
        if (Math.abs(ball.vx) > 16) ball.vx = -16;
    }

    // If ball passes right wall or all paddles died -> Evolve
    if (ball.x > width || aliveCount === 0) {
        evolvePopulation();
    }
}

window.setup = setup;
window.draw = draw;
