---
id: 21
title: Gesture Recognition using OpenCV + Python
date: 2015-03-22T06:52:00+00:00
author: Vipul
layout: single
permalink: /2015/03/gesture-recognition-using-opencv-python.html
blogger_blog:
  - www.vipul.xyz
blogger_author:
  - Vipul Sharma
blogger_permalink:
  - /2015/03/gesture-recognition-using-opencv-python.html
blogger_internal:
  - /feeds/3213730204187539187/posts/default/9089020286802735209
categories:
  - Uncategorized
---
<div dir="ltr" style="text-align: left;">
  <p style="text-align: justify;">
    This python script can be used to analyse hand gestures by contour detection and convex hull of palm region using OpenCV, a library used for computer vision processes.
  </p>
  
  <p>
    code: <a href="https://github.com/vipul-sharma20/gesture-opencv" target="_blank" rel="noopener">https://github.com/vipul-sharma20/gesture-opencv</a>
  </p>
  
  <p>
    The video below shows the working of the code:
  </p>
  
  <div style="text-align: justify;">
  </div>
  
  <div style="text-align: justify;">
  </div>
  
  <div style="text-align: justify;">
  </div>
  
  <h2 style="text-align: justify;">
    How?
  </h2>
  
  <h3 style="text-align: justify;">
    1. Capture frames and convert to grayscale
  </h3>
  
  <ul style="text-align: justify;">
    <li>
      Our ROI is the the hand region, so we capture the images of the hand and convert them to grayscale.
    </li>
  </ul>
  
  <ul style="text-align: justify;">
    <li>
      <strong>Why grayscale ?</strong><br /> We convert an image from RGB to grayscale and then to binary in order to find the ROI i.e. the portion of the image we are further interested for image processing. By doing this our decision becomes binary: &#8220;yes the pixel is of interest&#8221; or &#8220;no the pixel is not of interest&#8221;.
    </li>
  </ul>
  
  <div style="text-align: justify;">
    <a href="http://138.68.252.233/wp-content/uploads/2015/03/gray.png"><img class="aligncenter" src="http://138.68.252.233/wp-content/uploads/2015/03/gray.png" width="396" height="400" border="0" /></a>
  </div>
  
  <h3 style="text-align: justify;">
     2. Blur image
  </h3>
  
  <ul style="text-align: justify;">
    <li>
      I&#8217;ve used Gaussian Blurring on the original image. We blur the image for smoothing and to reduce noise and details from the image. We are not interested in the details of the image but in the shape of the object to track.
    </li>
  </ul>
  
  <ul style="text-align: justify;">
    <li>
      By blurring, we create smooth transition from one color to another and reduce the edge content. We use thresholding for image segmentation, to create binary images from grayscale images.
    </li>
  </ul>
  
  <div style="text-align: justify;">
    <a href="http://2.bp.blogspot.com/-EBs5JwnPO7k/VQ5k9KcdEWI/AAAAAAAAAYk/QHvej6W0xUQ/s1600/blurred.png"><img class="aligncenter" src="http://138.68.252.233/wp-content/uploads/2015/03/blurred.png" width="400" height="400" border="0" /></a>
  </div>
  
  <h3 style="text-align: justify;">
    3. Thresholding
  </h3>
  
  <ul style="text-align: justify;">
    <li>
      <div>
        In very basic terms, thresholding is like a Low Pass Filter by allowing only particular color ranges to be highlighted as white while the other colors are suppressed by showing them as black.
      </div>
    </li>
  </ul>
  
  <ul style="text-align: justify;">
    <li>
      <div>
        I&#8217;ve used Otsu&#8217;s Binarization method. In this method, OpenCV automatically calculates/approximates the threshold value of a bimodal image from its image histogram. But for optimal results, we may need a clear background in front of the webcam which sometimes may not be possible.
      </div>
    </li>
  </ul>
  
  <div style="text-align: justify;">
    <a href="http://3.bp.blogspot.com/-KZ4xgSrB6Qw/VQ5nC__vCKI/AAAAAAAAAZA/iNxILa8wuT0/s1600/thresholded.png"><img class="aligncenter" src="http://138.68.252.233/wp-content/uploads/2015/03/thresholded.png" width="400" height="386" border="0" /></a>
  </div>
  
  <h3 style="text-align: justify;">
    4. Draw contours
  </h3>
  
  <div style="text-align: justify;">
    <a href="http://1.bp.blogspot.com/-PBU77kHGkZ0/VQ5lOslM9qI/AAAAAAAAAYs/ViQaGKl83VM/s1600/contours1.png"><img class="aligncenter" src="http://138.68.252.233/wp-content/uploads/2015/03/contours1.png" width="400" height="396" border="0" /></a>
  </div>
  
  <h3 style="text-align: justify;">
    5. Find convex hull and convexity defects
  </h3>
  
  <ul style="text-align: justify;">
    <li>
      We now find the convex points and the defect points. The convex points are generally, the tip of the fingers. But there are other convex point too. So, we find convexity defects, which is the deepest point of deviation on the contour. By this we can find the number of fingers extended and then we can perform different functions according to the number of fingers extended.
    </li>
  </ul>
  
  <div style="text-align: justify;">
    <a href="http://3.bp.blogspot.com/-YWMhQ3cPi3c/VQ5louhyR-I/AAAAAAAAAY0/0vlr2BbTfRQ/s1600/defect.png"><img class="aligncenter" src="http://138.68.252.233/wp-content/uploads/2015/03/defect.png" width="400" height="392" border="0" /></a>
  </div>
  
  <p>
  </p>
  
  <div style="text-align: justify;">
    code: <a href="https://github.com/vipul-sharma20/gesture-opencv" target="_blank" rel="noopener">https://github.com/vipul-sharma20/gesture-opencv</a>
  </div>
</div>

<div>
</div>

<div>
  You can reach me out over email, I&#8217;ll be happy to help 🙂
</div>
