# LU09 — Machine Vision

This unit moves from the small classifiers students trained in LU08 to visual
data: first extracting simple features from images, then using pretrained
vision models on uploaded images and webcam video.

The first three lectures are rough drafts. Lecture 4 is intentionally left for
later project planning.

## Lectures

1. [Images, pixels, and feature extraction](L1-Image-Features/README.md)
   - Upload examples, convert images to coarse pixel features, train an ml5.js
     classifier, and test it on a new image.
2. [Image classification and object detection](L2-Image-Models/README.md)
   - Upload a photo and compare a pretrained classifier's whole-image labels
     with an object detector's labels and bounding boxes.
3. [Live webcam vision](L3-Webcam-Vision/README.md)
   - Opt in to webcam access, detect objects continuously, and draw model
     results over the video.
4. Computer vision project and demo — planning to come later.

Each lecture folder includes teaching notes, Marp slide source, and a standalone
browser example. L1 and L2 use ml5.js 1.2.1, matching the LU08 Shape Quest
example. L3 uses ml5.js 1.4.0 because its `objectDetection` API is not present
in version 1.2.1.

## Running the examples

Open each lecture's `example/index.html` with VS Code Live Server or another
local web server. The pages load ml5.js and pretrained model files from the
internet. Webcam access requires the student's permission and a secure context
(such as `localhost` or HTTPS); the webcam example does not start the camera
until the student clicks **Start camera**.
