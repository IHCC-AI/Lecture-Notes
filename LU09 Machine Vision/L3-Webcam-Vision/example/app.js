const ui = {
    startButton: document.querySelector('#start-button'),
    stopButton: document.querySelector('#stop-button'),
    videoFrame: document.querySelector('#video-frame'),
    video: document.querySelector('#video'),
    overlay: document.querySelector('#overlay'),
    status: document.querySelector('#status'),
    detections: document.querySelector('#detections'),
};

let detectorPromise = null;
let detector = null;
let stream = null;
let isStarting = false;
let isRunning = false;

const setStatus = (message, kind = 'info') => {
    ui.status.textContent = message;
    ui.status.dataset.kind = kind;
};

const loadDetector = () => {
    detectorPromise ??= (() => {
        // Download the pretrained COCO-SSD files on first use; detection runs
        // locally in this page against the webcam stream.
        return ml5.objectDetection('cocossd');
    })();
    return detectorPromise;
};

const clearOverlay = () => {
    const context = ui.overlay.getContext('2d');
    if (context) {
        context.clearRect(0, 0, ui.overlay.width, ui.overlay.height);
    }
};

const stopCamera = () => {
    isRunning = false;
    detector?.detectStop();

    stream?.getTracks().forEach((track) => track.stop());
    stream = null;
    ui.video.pause();
    ui.video.srcObject = null;
    ui.videoFrame.hidden = true;
    ui.startButton.disabled = !window.ml5?.objectDetection;
    ui.stopButton.disabled = true;
    ui.detections.textContent = '';
    clearOverlay();
    setStatus('Camera stopped.');
};

const drawDetections = (results) => {
    if (!isRunning || !ui.video.videoWidth || !ui.video.videoHeight) {
        return;
    }

    ui.overlay.width = ui.video.videoWidth;
    ui.overlay.height = ui.video.videoHeight;
    const context = ui.overlay.getContext('2d');
    if (!context) {
        setStatus('This browser could not create a drawing canvas.', 'error');
        return;
    }

    context.clearRect(0, 0, ui.overlay.width, ui.overlay.height);
    context.lineWidth = Math.max(2, ui.overlay.width / 240);
    context.font = `${Math.max(14, ui.overlay.width / 35)}px system-ui`;
    context.strokeStyle = '#00e676';
    context.fillStyle = '#00e676';

    results.forEach((detection) => {
        context.strokeRect(
            detection.x,
            detection.y,
            detection.width,
            detection.height,
        );
        context.fillText(
            detection.label,
            detection.x + 4,
            Math.max(18, detection.y + 18),
        );
    });

    const labels = results.map(({ label }) => label);
    ui.detections.textContent = labels.length
        ? `Detected ${labels.length} object(s): ${labels.join(', ')}`
        : 'No objects detected in this frame.';
};

ui.startButton.addEventListener('click', async () => {
    if (isStarting || isRunning) {
        return;
    }

    isStarting = true;
    ui.startButton.disabled = true;
    ui.stopButton.disabled = true;
    setStatus('Requesting camera permission…');

    try {
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error(
                'Camera access is unavailable. Use localhost or HTTPS in a supported browser.',
            );
        }

        stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
        });
        ui.video.srcObject = stream;
        await ui.video.play();
        ui.videoFrame.hidden = false;

        setStatus('Loading the COCO-SSD object detector…');
        // ml5.js documents awaiting objectDetection() to finish loading the model.
        detector = await loadDetector();
        isRunning = true;
        ui.stopButton.disabled = false;
        setStatus('Camera is on. Move objects in and out of view.');
        await detector.detectStart(ui.video, drawDetections);
    } catch (error) {
        stream?.getTracks().forEach((track) => track.stop());
        stream = null;
        ui.video.pause();
        ui.video.srcObject = null;
        ui.videoFrame.hidden = true;
        isRunning = false;
        setStatus(
            `Could not start webcam detection: ${error.message}`,
            'error',
        );
    } finally {
        isStarting = false;
        ui.startButton.disabled = isRunning || !window.ml5?.objectDetection;
        ui.stopButton.disabled = !isRunning;
    }
});

ui.stopButton.addEventListener('click', stopCamera);

window.addEventListener('pagehide', () => {
    isRunning = false;
    detector?.detectStop();
    stream?.getTracks().forEach((track) => track.stop());
});

if (window.ml5?.objectDetection) {
    ui.startButton.disabled = false;
    setStatus('Camera is off. Choose Start camera when ready.');
} else if (window.ml5) {
    setStatus(
        'ml5.js loaded, but this version does not include objectDetection. Use ml5.js 1.4.0 or later.',
        'error',
    );
} else {
    setStatus(
        'Could not load ml5.js. Check the internet connection and reload.',
        'error',
    );
}
