const $ = (selector) => document.querySelector(selector);

const imageInput = $('#image-input');
const preview = $('#preview');
const emptyPreview = $('#empty-preview');
const overlay = $('#overlay');
const classifyButton = $('#classify-button');
const detectButton = $('#detect-button');
const classificationResults = $('#classification-results');
const detectionResults = $('#detection-results');
const statusText = $('#status');

const context = overlay.getContext('2d');

// Both models download their files once, then run in this browser.
// ml5 1.3+ returns a promise, so we await it before using the model.
let classifier;
let detector;

const setStatus = (message, kind = 'info') => {
    statusText.textContent = message;
    statusText.dataset.kind = kind;
};

const setBusy = (busy) => {
    imageInput.disabled = busy;
    classifyButton.disabled = busy || preview.hidden;
    detectButton.disabled = busy || preview.hidden;
};

const clearResults = () => {
    context.clearRect(0, 0, overlay.width, overlay.height);
    classificationResults.replaceChildren();
    detectionResults.replaceChildren();
};

// Adds one <li> to a list.
const addItem = (list, text) => {
    const item = document.createElement('li');
    item.textContent = text;
    list.append(item);
};

// Runs one model action while the buttons are disabled and reports errors.
const run = async (message, action) => {
    setBusy(true);
    clearResults();
    setStatus(message);
    try {
        await action();
    } catch (error) {
        setStatus(`Failed: ${error.message}`, 'error');
    } finally {
        setBusy(false);
    }
};

imageInput.addEventListener('change', () => {
    const [file] = imageInput.files;
    if (!file) return;

    clearResults();
    preview.hidden = true;
    emptyPreview.hidden = false;
    setBusy(true);

    preview.onload = () => {
        preview.hidden = false;
        emptyPreview.hidden = true;
        overlay.width = preview.naturalWidth;
        overlay.height = preview.naturalHeight;
        setBusy(false);
        setStatus('Image ready. Choose a model to run.');
    };
    preview.onerror = () => {
        setBusy(false);
        setStatus(
            'The selected file could not be loaded as an image.',
            'error',
        );
    };
    preview.src = URL.createObjectURL(file);
});

classifyButton.addEventListener('click', () =>
    run('Classifying the image…', async () => {
        classifier ??= await ml5.imageClassifier('MobileNet');
        const results = await classifier.classify(preview);

        results.forEach(({ label, confidence }) =>
            addItem(
                classificationResults,
                `${label}: ${(confidence * 100).toFixed(1)}% confidence`,
            ),
        );
        setStatus('Classification complete. Try another image.');
    }),
);

detectButton.addEventListener('click', () =>
    run('Detecting objects…', async () => {
        detector ??= await ml5.objectDetection('cocossd');
        const detections = await detector.detect(preview);

        // Scale the line and text so they are readable on any image size.
        context.lineWidth = Math.max(2, overlay.width / 240);
        context.font = `${Math.max(14, overlay.width / 35)}px system-ui`;
        context.strokeStyle = context.fillStyle = '#00e676';

        detections.forEach(({ label, x, y, width, height }) => {
            context.strokeRect(x, y, width, height);
            context.fillText(label, x + 4, Math.max(18, y + 18));
            addItem(detectionResults, label);
        });

        if (detections.length === 0) {
            detectionResults.textContent = 'No objects detected.';
        }
        setStatus(
            `Detection complete: ${detections.length} object(s) found. A box is a model prediction, not a verified object.`,
        );
    }),
);

setBusy(false);
setStatus('Upload an image to begin.');
