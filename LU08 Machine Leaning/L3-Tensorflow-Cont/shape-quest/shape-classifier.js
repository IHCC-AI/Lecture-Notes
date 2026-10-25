// Learns shape labels from the player's mouse drawings.
class ShapeClassifier {
    static labels = ['star', 'circle', 'triangle'];
    static gridSize = 12;

    constructor() {
        ml5.setBackend('cpu');
        this.exampleCounts = {
            star: 0,
            circle: 0,
            triangle: 0,
        };
        this.examples = [];
        this.activeFeatures = [];
        this.isTrained = false;
    }

    addExample(strokes, label) {
        const features = ShapeClassifier.encodeDrawing(strokes);
        if (!features) {
            throw new Error('Draw a shape before adding an example.');
        }

        this.examples.push({ features, label });
        this.exampleCounts[label] += 1;
        this.isTrained = false;
    }

    async train() {
        this.activeFeatures = this.examples[0].features
            .map((_, index) => index)
            .filter((index) => {
                const values = new Set(
                    this.examples.map((example) => example.features[index]),
                );
                return values.size > 1;
            });

        if (this.activeFeatures.length === 0) {
            throw new Error(
                'The drawings are too similar to train. Add more varied examples.',
            );
        }

        this.network = ml5.neuralNetwork({
            task: 'classification',
            debug: false,
        });
        await this.network.ready;
        this.examples.forEach(({ features, label }) => {
            this.network.addData(
                this.activeFeatures.map((index) => features[index]),
                [label],
            );
        });
        this.network.normalizeData();

        await this.network.train(
            { epochs: 80, batchSize: 16, validationSplit: 0 },
            () => {},
        );
        this.isTrained = true;
    }

    // Predicts which trained shape best matches a new drawing.
    async classify(strokes) {
        if (!this.isTrained) {
            throw new Error('Train the model before playing.');
        }

        const features = ShapeClassifier.encodeDrawing(strokes);
        if (!features) {
            throw new Error('Draw a shape before asking the model to guess.');
        }

        const inputs = this.activeFeatures.map((index) => features[index]);
        const results = await this.network.classify(inputs);
        if (
            !Array.isArray(results) ||
            results.length === 0 ||
            !results[0].label
        ) {
            throw new Error(
                'The model could not classify that drawing. Try drawing it again.',
            );
        }
        return results[0];
    }

    // Converts a drawing into a compact set of inputs for the model.
    static encodeDrawing(strokes) {
        const points = strokes
            .flat()
            .filter(
                (point) => Number.isFinite(point.x) && Number.isFinite(point.y),
            );
        if (points.length < 2) {
            return null;
        }

        const minX = Math.min(...points.map((point) => point.x));
        const maxX = Math.max(...points.map((point) => point.x));
        const minY = Math.min(...points.map((point) => point.y));
        const maxY = Math.max(...points.map((point) => point.y));
        const span = Math.max(maxX - minX, maxY - minY);
        if (span < 8) {
            return null;
        }

        const bitmapSize = 96;
        const padding = 12;
        const scale = (bitmapSize - padding * 2) / span;
        const offsetX = (bitmapSize - (maxX - minX) * scale) / 2;
        const offsetY = (bitmapSize - (maxY - minY) * scale) / 2;
        const bitmap = new Uint8Array(bitmapSize * bitmapSize);
        const radius = 4;

        const paintPoint = (x, y) => {
            const centerX = Math.round(offsetX + (x - minX) * scale);
            const centerY = Math.round(offsetY + (y - minY) * scale);

            for (let dy = -radius; dy <= radius; dy += 1) {
                for (let dx = -radius; dx <= radius; dx += 1) {
                    if (dx * dx + dy * dy > radius * radius) {
                        continue;
                    }
                    const pixelX = centerX + dx;
                    const pixelY = centerY + dy;
                    if (
                        pixelX >= 0 &&
                        pixelX < bitmapSize &&
                        pixelY >= 0 &&
                        pixelY < bitmapSize
                    ) {
                        bitmap[pixelY * bitmapSize + pixelX] = 1;
                    }
                }
            }
        };

        for (const stroke of strokes) {
            for (let index = 1; index < stroke.length; index += 1) {
                const start = stroke[index - 1];
                const end = stroke[index];
                const startX = offsetX + (start.x - minX) * scale;
                const startY = offsetY + (start.y - minY) * scale;
                const endX = offsetX + (end.x - minX) * scale;
                const endY = offsetY + (end.y - minY) * scale;
                const distance = Math.hypot(endX - startX, endY - startY);
                const steps = Math.max(1, Math.ceil(distance / 2));

                for (let step = 0; step <= steps; step += 1) {
                    const fraction = step / steps;
                    const x = start.x + (end.x - start.x) * fraction;
                    const y = start.y + (end.y - start.y) * fraction;
                    paintPoint(x, y);
                }
            }
        }

        const features = [];
        const cellSize = bitmapSize / ShapeClassifier.gridSize;
        for (let gridY = 0; gridY < ShapeClassifier.gridSize; gridY += 1) {
            for (let gridX = 0; gridX < ShapeClassifier.gridSize; gridX += 1) {
                let filled = 0;
                const startX = Math.floor(gridX * cellSize);
                const startY = Math.floor(gridY * cellSize);

                for (let y = startY; y < startY + cellSize && !filled; y += 1) {
                    for (let x = startX; x < startX + cellSize; x += 1) {
                        if (bitmap[y * bitmapSize + x]) {
                            filled = 1;
                            break;
                        }
                    }
                }

                features.push(filled);
            }
        }

        return features;
    }
}
