---
layout: single
title:  "Sharingan: Newspaper text and context extractor"
date:   2019-05-30 14:30:12 +0530
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

## Text Extraction

I’ve used tesseract to extract the text from the segmented images.
> Tesseract was originally developed at Hewlett-Packard Laboratories Bristol and at Hewlett-Packard Co, Greeley Colorado between 1985 and 1994, with some more changes made in 1996 to port to Windows, and some C++izing in 1998.
> In 2005 Tesseract was open sourced by HP. Since 2006 it is developed by Google.

## Manual Mode

Sharingan provides both automatic and manual segmentation mode. Below is the demo of manual segmentation.

![alt text][manual_mode]
![alt text][manual_mode1]

## Context extraction

The phrase structure of a sentence in English is of the form:

![alt text][phrase]

The above rule means that a sentence (S) consists of a Noun Phrase (NP) and a Verb Phrase(VP). We can further define grammar for a Noun Phrase but let’s not get into that 🙂

A Verb Phrase defines the action performed on or by the object whereas a Noun Phrase function as verb subject or object in a sentence. Therefore, NP can be used to extract the important topics from the sentences.
I’ve used Brown Corpus in Natural Language Toolkit (NLTK) for Part Of Speech (POS) tagging of the sentences and defined custom Context Free Grammar (CFG) for extracting NP.

> “The Brown Corpus was the first million-word electronic corpus of English, created in 1961 at Brown University. This corpus contains text from 500 sources, and the sources have been categorized by genre, such as news, editorial, and so on.”

A part-of-speech tagger, or POS-tagger, processes a sequence of words, and attaches a part of speech tag to each word.

```python
>>> text = word_tokenize("And now for something completely different")
>>> nltk.pos_tag(text)
[('And', 'CC'), ('now', 'RB'), ('for', 'IN'), ('something', 'NN'),
('completely', 'RB'), ('different', 'JJ')]
```

In my context extractor script, I’ve used unigram as well as bigram POS tagging. A unigram tagger is based on a simple statistical algorithm: For every token/word assign a tag that is more likely for that token/word which is decided as per the lookup match found in the trained data. The drawback of unigram tagging is, we can just tag a token with a “most likely” tag in isolation with the larger context of the text.

Therefore, for better results we use an n-gram tagger, whose context is current token along with the POS tags of preceding n-1 tokens. The problem with n-gram taggers is sparse data problem which is quite immanent in NLP.

> “As n gets larger, the specificity of the contexts increases, as does the chance that the data we wish to tag contains contexts that were not present in the training data.”

I’ve also defined a custom CFG to extract Noun Phrases from the POS tagged list of tokens.

Applying all this logic to get the keypoints from the text content extracted above gives:

```
[‘residential terraces’, ‘busy markets’, ‘Puppies’, ‘inhumane conditions’,
‘popular e-commerce sites’, ‘Sriramapuram’, ‘Russell Market’,
‘issue licences’, ‘meeting conditions’, ‘positive impact’, ‘pet owners’,
‘R. Shantha Kumar’, ‘welfare ofﬁcer’, ‘Animal Welfare Board’, ‘India’]
[‘Kittie’]
[‘Compassion Unlimited’]
[‘public spaces’, ‘Animal’, ‘rights activists’, ‘civic body’, ‘Bengaluru’],
[‘BENGALURU’, ‘Bruhat Bengaluru Mahanagar Palike’, ‘Dane’, ‘English Mastiff’,
‘Bulldog’, ‘Boxer’, ‘Rottweiler’, ‘Bernard’, ‘Shepherd’, ‘Retriever’,
‘draft guidelines’, ‘sterilisation’, ‘pet dogs ’, ‘Owners’]
```

As said earlier, this project is still under development and requires more tuning to perform better and produce accurate results.

If anyone is kind enough to help me or suggestions for this project; I am typically online as vipul20 at freenode 🙂

[raw]: /assets/images/raw.jpeg "No Image"
[edge]: /assets/images/edge.jpeg "No Image"
[dilated]: /assets/images/dilated.jpeg "No Image"
[contours]: /assets/images/contours.jpeg "No Image"
[approximation]: /assets/images/approximation.jpeg "No Image"
[extracted]: /assets/images/extracted.png "No Image"
[phrase]: /assets/images/phrase.png "No Image"
[thresholded]: /assets/images/thresholded.png "No Image"
[github]: https://github.com/vipul-sharma20/sharingan
[manual_mode]: /assets/images/manual_mode.gif "No Image"
[manual_mode1]: /assets/images/manual_mode1.gif "No Image"
