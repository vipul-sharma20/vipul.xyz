---
title: Privacy writing with neovim
draft: false
date: 2026-01-05
tags:
  - scribbles
  - neovim
author_profile: false
excerpt: "My writing workflow while sitting in the middle seat of a flight"
layout: single
---

I have found that some of my most productive blog writing time has been when I
have waited for boarding a flight.

I have recently started writing in the flights too mostly when these are over 2
hours. This time, I got middle seat and I was afraid of shoulder surfers around
me. Even if not intentional but just looking around, people could read what I
am typing which I didn't want.

So I used the 30 minutes of time before boarding the flight to start up claude
code and create a [ROT13][rot13] based encoding/decoding plugin for my needs.

Plugin code is at [vipul-sharma20/privacy-mode.nvim](https://github.com/vipul-sharma20/privacy-mode.nvim)

ROT13 has been natively supported with neovim/vim with `g?` and since I didn't
need a strong encoding but just a basic unreadability like cipher system, I
decided to use this.

<div style="text-align: center">
<video controls>
  <source src="https://s3.vipul.xyz/blog/privacy-mode-demo.mp4" type="video/mp4">
</video>
</div>

[rot13]: https://en.wikipedia.org/wiki/ROT13
