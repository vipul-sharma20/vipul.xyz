---
layout: single
title:  "Playing Pacman with gestures"
date:   2015-11-09 14:30:12 +0530
permalink: "/2015/11/playing-pacman-with-gestures.html"
categories: jekyll update
---

![alt text][hi]

Hello! Lately, I’ve been striking off some tasks from my long pending TODO list. First, I finished off with [summrizer][summrizer] and now this, which has been in my list since quite a long time!

After implementing a simple [hand gesture recognizer][hand_gesture] using Python + OpenCV, I always wanted to do something more exciting and fascinating, like simulating different keyboard events based on the gesture to achieve small tasks like opening files, folders, applications etc. But what’s the fun in doing such boring tasks.

Therefore, I thought of playing the old school game of Pacman using gestures! No keyboard; only gestures in front of a webcam 😀


For all the impatient folks, TL;DR here is the link to the code : [https://github.com/vipul-sharma20/gesture-pacman][code_url]

## Implementation of gesture mechanism
In layman’s terms:
* Capture image frame containing any recognizable object
* Detect the object
* Check if/where the object moves
* Assign tasks (keyboard key press) as per different types of movement

The above algorithm seems to be quite easy to implement and yes, its very easy 😀 Please read further for more detailed explanation of each step.

## 1. Capture Frame

Capturing an image frame is the easiest task. We want to sense the gestures therefore, we’ll have to continue taking frames forever to record the change in the location of the object or hand or anything recognizable which we can track and use as a mode to input the gestures.
Here is a test frame which I will be using to demonstrate all the processes involved:

![alt text][orig1]

You may notice that here I am holding a #9b465d colored (some people call it “pink”) square paper. We can use this to input gestures by moving it in different directions in front of the webcam and then execute appropriate tasks based on its motion.

## 2. Detecting Object

### Thresholding

In very basic terms, thresholding is like a Low Pass Filter by allowing only particular color ranges to be highlighted as white while the other colors are suppressed by showing them as black.

Before thresholding, the captured image is flipped (I’ve already flipped the above image) and converted from BGR to HSV.

![alt text][hsv]

Initially, I thought of thresholding using Otsu’s Binarization method. In this method, OpenCV automatically calculates/approximates the threshold value of a bimodal image from its image histogram.

But for optimal results, we may need a clear background in front of the webcam which is not possible in general. Also, what’s the fun in that 😉 So, I went with the traditional method of global thresholding by providing a range of min and max HSV values as a threshold range for the color pink. In this way, we will not be affected by the background unless it has something of the same color as the object in our hand.

Notice the difference in thresholding using Otsu’s method and global method:

![alt text][otsu]

You can notice here that there is a lot of white whereas we want only our object to be highlighted. We can obviously decide an ROI before thresholding, but that would be more of a restriction in the available region for moving the object.

Therefore, a global thresholding is more desirable.

![alt text][threshed1]

For better results, we can also try thresholding after performing Gaussian Blurring on the original image. We blur the image for smoothing and to reduce noise and details from the image. We are not interested in the details of the image but in the shape/size of the object to track. In my implementation, I’ve NOT used this step as it is a little slow in terms of realtime processing but you might like to see the effect of blurring in thresholding

![alt text][gauss_blur]

![alt text][gauss_thresh]

Here, we can see that thresholding after blurring has lesser noise and more discrete white regions than the one thresholded without blurring. Unfortunately, we’ll have to compromise this optimal performance as it is a little slow. But, we can get the desired results after some tweaks even without implementing this step. Just read further 😀

## Contour Detection and Bounding Rectangle

Once the image is thresholded, we need to create a bounding rectangle so that we always have the exact coordinates of the object in our hand in real-time. To achieve this, we will first need to extract all the contours from the thresholded image and then selecting the contour which has the max area. This max area contour will be the object around which, we will create a bounding rectangle. More precisely, we can track the coordinates of the moving object in real-time by tracking the centroid of the bounding rectangle.

Creating bounding rectangles around all the contours detected from the thresholded image

![alt text][rect_all]

The good thing is, we have a bounding rectangle around the object we want to track and the bad thing is clearly visible. We can correct this by creating the bounding rectangle only around the contour which has the maximum area. If we notice the thresholded image again, we can see that the largest white colored area is of the pink colored square and that’s what we want to track. Therefore, by creating a rectangle around the largest area we get the desired result.

![alt text][rect]

The red mark inside the rectangle is the centroid of the bounding rectangle.

## 3. Check if/where object moves

For this, we can define our own quadrants on a frame and locate the position of the centroid of the bounding rectangle in those quadrants. Based on the quadrant in which the point lies, we can trigger an appropriate keyboard event.

![alt text][guides]

Here, I’ve created 4 rectangular divisions for triggering 4 different movements: up, down, left, right. Looking closely we can see that the centroid lies in the upper division hence, we can simulate an “Up” key press event and similarly we can trigger left, down, right key press events based on the location of the centroid among the quadrants.

For simulating keyboard key press events, I’ve used [pyautogui][pyautogui] library.
Here is the link to the code : [https://github.com/vipul-sharma20/gesture-pacman][code_url]

The big question: Where is Pacman ??

Now that we have created the script to input gestures and trigger keyboard events, we can now try it by playing Pacman 😀

Below is the video of me playing Pacman with gestures. This is not exactly the same old classic Pacman which had the [kill screen][kill_screen] bug, but it’s good enough to demonstrate the working 🙂

In case you were wondering how the header image was captured…

![alt text][orig]

[summrizer]: https://github.com/vipul-sharma20/summrizer
[hand_gesture]: http://github.com/vipul-sharma20/gesture-opencv
[code_url]: https://github.com/vipul-sharma20/gesture-pacman
[kill_screen]: https://en.wikipedia.org/wiki/Pac-Man#Split-screen
[pyautogui]: https://github.com/asweigart/pyautogui
[orig1]: /assets/images/orig1.jpg "No Image"
[hsv]: /assets/images/hsv.jpg "No Image"
[otsu]: /assets/images/otsu.jpg "No Image"
[threshed1]: /assets/images/threshed1.jpg "No Image"
[gauss_blur]: /assets/images/gauss_blur.jpg "No Image"
[gauss_thresh]: /assets/images/gauss_thresh.jpg "No Image"
[rect_all]: /assets/images/rect_all.jpg "No Image"
[rect]: /assets/images/rect.jpg "No Image"
[guides]: /assets/images/guides.jpg "No Image"
[hi]: /assets/images/hi.jpg "No Image"


