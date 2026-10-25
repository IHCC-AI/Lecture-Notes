const shapeNames = {
    star: 'Star',
    circle: 'Circle',
    triangle: 'Triangle',
};

const ui = {
    canvasWrap: document.querySelector('#canvas-wrap'),
    clearButton: document.querySelector('#clear-button'),
    shapeSelect: document.querySelector('#shape-select'),
    addExampleButton: document.querySelector('#add-example-button'),
    starCount: document.querySelector('#star-count'),
    circleCount: document.querySelector('#circle-count'),
    triangleCount: document.querySelector('#triangle-count'),
    trainButton: document.querySelector('#train-button'),
    playButton: document.querySelector('#play-button'),
    checkButton: document.querySelector('#check-button'),
    backButton: document.querySelector('#back-button'),
    prediction: document.querySelector('#prediction'),
    confidence: document.querySelector('#confidence'),
    trainingControls: document.querySelector('#training-controls'),
    playControls: document.querySelector('#play-controls'),
    status: document.querySelector('#status'),
};

const sketch = (p) => {
    const canvasSize = 480;
    // Game state and the drawing currently being collected.
    let canvas;
    let strokes = [];
    let currentStroke = null;
    let classifier;
    let mode = 'training';
    let isTraining = false;

    const setStatus = (message, kind = 'info') => {
        ui.status.textContent = message;
        ui.status.dataset.kind = kind;
    };

    const currentDrawing = () =>
        currentStroke ? [...strokes, currentStroke] : strokes;

    const clearDrawing = () => {
        strokes = [];
        currentStroke = null;
        ui.checkButton.disabled = mode !== 'play';
        ui.prediction.textContent = '—';
        ui.confidence.textContent = 'Confidence: —';
    };

    const refreshExampleCounts = () => {
        ui.starCount.textContent = classifier.exampleCounts.star;
        ui.circleCount.textContent = classifier.exampleCounts.circle;
        ui.triangleCount.textContent = classifier.exampleCounts.triangle;

        const enoughExamples = ShapeClassifier.labels.every(
            (label) => classifier.exampleCounts[label] >= 3,
        );
        ui.trainButton.disabled = !enoughExamples || isTraining;
        ui.playButton.disabled = !classifier.isTrained || isTraining;
    };

    const drawStroke = (stroke) => {
        if (!stroke.length) {
            return;
        }

        p.stroke('#17243a');
        p.strokeWeight(12);
        p.strokeCap(p.ROUND);
        p.strokeJoin(p.ROUND);
        p.noFill();

        if (stroke.length === 1) {
            p.point(stroke[0].x, stroke[0].y);
            return;
        }

        p.beginShape();
        stroke.forEach((point) => p.vertex(point.x, point.y));
        p.endShape();
    };

    const enterPlayMode = () => {
        if (!classifier?.isTrained) {
            return;
        }

        mode = 'play';
        ui.trainingControls.hidden = true;
        ui.playControls.hidden = false;
        ui.checkButton.disabled = true;
        clearDrawing();
        setStatus('Draw a star, circle, or triangle, then check your drawing.');
    };

    p.setup = () => {
        const canvas = p.createCanvas(canvasSize, canvasSize);
        canvas.parent(ui.canvasWrap);
        canvas.elt.setAttribute(
            'aria-label',
            'Drawing canvas for stars, circles, and triangles',
        );
        canvas.elt.setAttribute('role', 'img');
        p.pixelDensity(1);

        try {
            classifier = new ShapeClassifier();
            refreshExampleCounts();
        } catch (error) {
            setStatus(error.message, 'error');
            ui.addExampleButton.disabled = true;
            ui.trainButton.disabled = true;
        }

        // Connect the training and play controls to the game flow.
        ui.clearButton.addEventListener('click', () => {
            clearDrawing();
            setStatus(
                mode === 'training'
                    ? 'Drawing cleared. Draw a shape to add an example.'
                    : 'Drawing cleared. Draw a star, circle, or triangle.',
            );
        });

        ui.addExampleButton.addEventListener('click', () => {
            if (!classifier || isTraining) {
                return;
            }

            const label = ui.shapeSelect.value;
            try {
                classifier.addExample(currentDrawing(), label);
                ui.playButton.disabled = true;
                refreshExampleCounts();
                clearDrawing();
                setStatus(
                    `Added a ${shapeNames[label].toLowerCase()} example. Try another drawing of the same shape or choose a different one.`,
                );
            } catch (error) {
                setStatus(error.message, 'error');
            }
        });

        ui.trainButton.addEventListener('click', async () => {
            if (!classifier || isTraining) {
                return;
            }

            isTraining = true;
            refreshExampleCounts();
            ui.addExampleButton.disabled = true;
            ui.trainButton.disabled = true;
            setStatus('Training the model on your examples...');

            try {
                await classifier.train();
                ui.playButton.disabled = false;
                setStatus(
                    'Training complete! Your model is ready. Choose Play game when you are ready.',
                );
            } catch (error) {
                setStatus(`Training failed: ${error.message}`, 'error');
                ui.addExampleButton.disabled = false;
            } finally {
                isTraining = false;
                refreshExampleCounts();
            }
        });
        ui.playButton.addEventListener('click', enterPlayMode);

        // Display the model's prediction and confidence.
        ui.checkButton.addEventListener('click', async () => {
            if (!classifier) {
                return;
            }

            ui.checkButton.disabled = true;
            setStatus('Your model is looking at the drawing...');

            try {
                const result = await classifier.classify(currentDrawing());
                const guess = result.label;
                ui.prediction.textContent = shapeNames[guess] ?? guess;
                ui.confidence.textContent = `Confidence: ${Math.round(result.confidence * 100)}%`;
                setStatus(
                    "Prediction complete. Confidence is the model's estimate, not a guarantee.",
                );
            } catch (error) {
                setStatus(error.message, 'error');
            } finally {
                ui.checkButton.disabled = false;
            }
        });

        ui.backButton.addEventListener('click', () => {
            mode = 'training';
            clearDrawing();
            ui.playControls.hidden = true;
            ui.trainingControls.hidden = false;
            setStatus(
                'Add more examples and train again to help your model improve.',
            );
        });

        ui.playControls.hidden = true;
    };

    // Draw the canvas and all mouse strokes.
    p.draw = () => {
        p.background('#f8fafc');
        p.stroke('#e5eaf1');
        p.strokeWeight(1);
        for (let position = 48; position < canvasSize; position += 48) {
            p.line(position, 0, position, canvasSize);
            p.line(0, position, canvasSize, position);
        }

        strokes.forEach(drawStroke);
        if (currentStroke) {
            drawStroke(currentStroke);
        }
    };

    const beginStroke = () => {
        if (
            p.mouseX < 0 ||
            p.mouseX > p.width ||
            p.mouseY < 0 ||
            p.mouseY > p.height
        ) {
            return;
        }

        currentStroke = [{ x: p.mouseX, y: p.mouseY }];
        if (mode === 'play') {
            ui.checkButton.disabled = false;
        }
        return false;
    };

    p.mousePressed = () => {
        if (p.mouseButton !== p.LEFT) {
            return;
        }
        return beginStroke();
    };

    p.mouseDragged = () => {
        if (currentStroke) {
            currentStroke.push({ x: p.mouseX, y: p.mouseY });
        }
        return false;
    };

    p.mouseReleased = () => {
        if (!currentStroke) {
            return;
        }

        strokes.push(currentStroke);
        currentStroke = null;
        return false;
    };

    p.touchStarted = () => {
        if (
            p.mouseX >= 0 &&
            p.mouseX <= p.width &&
            p.mouseY >= 0 &&
            p.mouseY <= p.height
        ) {
            beginStroke();
        }
        return false;
    };

    p.touchMoved = () => {
        p.mouseDragged();
        return false;
    };

    p.touchEnded = () => {
        p.mouseReleased();
        return false;
    };
};

new p5(sketch);
