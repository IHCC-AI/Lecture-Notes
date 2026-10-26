# Images, Pixels, and Features

<!-- Example is broken on student machines(maybe windows problem). -->
<!-- Example said no webGPU support?? -->
<!-- TODO personal the coding example -->

## Machine vision

- [Crash Course: Computer Vision](https://www.youtube.com/watch?v=-4E2-0sxVUM)
- [Self Driving Car](https://www.youtube.com/watch?v=PRg5RNU_JLk)
    - [Drop in Device to make any car self-driving](comma.ai)
- [Robot Vacuum Cleaners](https://www.amazon.com/robotic-vacuums/b?node=3743561)

## Ethics in machine vision

> A computer can never be held accountable, and therefore a computer must never make a management decision. - IBM

If I hit someone with my car, I am responsible. If a self-driving car hits someone, who is responsible? If a step on my cat I am responsible. If a [self cleaning litter box](https://nypost.com/2025/06/21/us-news/nyc-owners-claim-rescue-cat-fatally-crushed-by-litter-box/) hurts my cat, who is responsible?

How can machine vision be used in government, law enforcement, and military applications? What are the ethical implications of using machine vision in these contexts?

## Coding example: Pixel Sorter

Download the [Pixel Sorter](pixel-sorter/index.html) example and open it in a browser.
Have students feed the model training data.
Use the `test` images to see how well the model performs.

**Warm colors** or **Cool colors**, upload an image, add it as a labeled example, and repeat with varied examples. Add at least three images to each
category, train, and test with a different image.

The feature vector is intentionally small enough to inspect.

## Discussion prompts

- What does the feature extractor keep, and what information does it discard?
- Does the model recognize the object, or does it use color and background as
  shortcuts?
- What examples would you add to make a fairer test?
- Why is a confident prediction not proof that a prediction is correct?

## Resources

- [ml5.js NeuralNetwork reference](https://docs.ml5js.org/#/reference/neural-network)
- [ml5.js glossary](https://docs.ml5js.org/#/learn/ml5-glossary)
- [MDN: Pixel manipulation with canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)
- [MDN: `<input type="file">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)
- [LU08 Shape Quest](../../LU08%20Machine%20Leaning/L3-Tensorflow-Cont/README.md)
