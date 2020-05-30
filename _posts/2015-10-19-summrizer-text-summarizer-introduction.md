---
layout: single
title: 'Summrizer: Text summarizer (Introduction)'
date: 2015-10-19T20:26:00+00:00
permalink: /2015/10/summrizer-text-summarizer-introduction.html
categories: jekyll update
---

![alt text][keyboard]

  <p>
    <b>EDIT: </b>Completed the project 🙂 see <a href="http://vipulsharma20.blogspot.in/2015/10/summrizer-text-summarizer_27.html" rel="nofollow" target="_blank"><span style="color: red;">here</span></a>
  </p>
  
  <p>
    I had started working on this project 6-7 months ago. I left it mid-way as I got busy with something else but, now I am again onto this :D. The plan was to create something insanely awesome but, then I recalled few words; someone told me once that first one should create a Minimum Viable Product and then go for more features.
  </p>
  
  <p>
    Currently, I am working on a pretty naive text summarizer by implementing a basic text scoring algorithm with some use of NLTK. Although, I&#8217;ve worked with Stanford&#8217;s CoreNLP earlier, I wanted to exploit the power of NLTK.
  </p>
  
  <p>
    I&#8217;ve tested the script by summarizing some articles from <a href="http://techcrunch.com/">techcrunch.com</a>&nbsp;and compared the summary results with results from some online text summarizing websites like:
  </p>
  
  <ul style="text-align: left;">
    <li>
      <a href="http://smmry.com/">http://smmry.com</a>&nbsp;(this is already pretty bad in summarizing texts)
    </li>
    <li>
      <a href="http://freesummarizer.com/">http://freesummarizer.com</a>&nbsp;(not so good but better than smmry.com)
    </li>
    <li>
      <a href="http://autosummarizer.com/index.php">http://autosummarizer.com/index.php</a>&nbsp;(most of my results matches with this one)
    </li>
  </ul>
  
  <p>
    After this basic implementation works fine, I&#8217;ll try to implement some complex language processing concepts for which I may be dealing with more of NLTK or even CoreNLP (personally, I like Stanford&#8217;s CoreNLP more).
  </p>
  
  <p>
    Code:&nbsp;<a href="https://github.com/vipul-sharma20/summrizer">https://github.com/vipul-sharma20/summrizer</a>
  </p>
  
  <p>
    I&#8217;ve also created a separate branch and initialized it with a Django based web application. Once the script works fine, I&#8217;ll try to host this script as a web application for text summarizing. But, my priority and focus is on creating a more efficient summarizing script 😀
  </p>

[keyboard]: /assets/images/keyboard.jpg
