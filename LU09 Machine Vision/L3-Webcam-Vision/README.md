# Live Webcam Vision

This example is more of a L2.5 example.
If this lecture go ahead to L3, and L4 will be a lab day.

## Coding example: Webcam Object Finder

Turn off Zoom camera so that your webcam can be used by the browser.
Most systems will only allow one application to use the webcam at a time.

- [Example](./example/index.html)

> Project only works on "localhost" or "https" due to browser security restrictions.

## Discussion and extension

- How is a video different from one still image?
- Why might the detections change between two nearby frames?
- Add a count of detected objects or an action for one label.
- Add a confidence threshold, if the model output provides a confidence score.
- How should an app communicate that the camera is active and give the user
  control?

## Resources

- [ml5.js ObjectDetection reference](https://docs.ml5js.org/#/reference/object-detection)
- [Official ml5.js webcam object-detection example](https://editor.p5js.org/ml5/sketches/onwqDXmAX9)
- [MDN: `getUserMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [MDN: `<video>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
