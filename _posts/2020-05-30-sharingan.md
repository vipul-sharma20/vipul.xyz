---
layout: single
title:  "Sharingan: Newspaper text and context extractor"
date:   2020-05-30 14:30:12 +0530
permalink: "/2017/03/sharingan-newspaper-text-and-context-extractor.html"
categories: jekyll update
---

To all TL;DR folks, here is my elevator pitch:
* It’s a tool to extract news articles from newspaper and give the context about the news
* link to code: [https://github.com/vipul-sharma20/sharingan][github]

Sharingan is a tool built on Python 3.6 using OpenCV 3.2 to extract news content as text from newspaper’s photo and perform news context extraction.

Note: This is a fun project I started out of curiosity and is still under development. It is still not mature enough to produce very accurate results.
The working can be divided into two tasks:
* Image processing and text recognition
* Context extraction

## Image processing and text extraction

Our ROI is the text content of the page and therefore, some image processing is required to highlight and extract the text content from the image. Also, the appropriate text content highlighted requires some more processing and cleaning so that there is no noise and false positives while OCR is performed.

## How ?
* Capture image
* Detect edges
* Extract desired object / define contours
* Thresholding text content
* OCR (using tesseract)

## 1. Capture Image

![alt text][raw]

## 2. Detect Edges

Edge detection technique is used to find boundaries of objects in an image by analyzing varying brightness in the image. Here, it is being used for segmenting image. More precisely, I’ve used Canny Edge Detection technique.

![alt text][edge]

## 3. Dilation

Detecting contours for text at this point will lead to hundreds of nonsensical contours. To achieve a confident boundary detection I’ve used dilation here which is a process of dilating. It increases the white region in the image or size of foreground object. In informal terms, it leaks the white pixels to its neighborhood so that it transforms the text area as more solid looking

![alt text][dilated]

## 4. Finding Contours and Contour Approximation

Finding contours around the white pixels

![alt text][contours]

**Contour approximation:** It approximates a contour shape to another shape with less number of vertices depending upon the precision we specify. After performing contour approximation I got this

![alt text][approximation]

## What I got ?

By employing techniques mentioned above, I ended up with these:

![alt text][extracted]

## Inference

It’s evident that our logic was able to crop out the text content from the page but it also acquired few false positives which can be filtered out in this case with small tweaking. Also, our logic couldn’t isolate the image content (TODO: fix this).

## Clean images for text extraction

I implemented adaptive binary thresholding to clean and highlight the text area

![alt text][thresholded]

[raw]: /assets/images/raw.jpeg "No Image"
[edge]: /assets/images/edge.jpeg "No Image"
[dilated]: /assets/images/dilated.jpeg "No Image"
[contours]: /assets/images/contours.jpeg "No Image"
[approximation]: /assets/images/approximation.jpeg "No Image"
[extracted]: /assets/images/extracted.png "No Image"
[thresholded]: /assets/images/thresholded.png "No Image"
[github]: https://github.com/vipul-sharma20/sharingan
