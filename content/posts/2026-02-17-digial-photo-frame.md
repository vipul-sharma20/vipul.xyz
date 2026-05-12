---
date: 2026-04-15
permalink: /2026/04/15/digital-photo-frame/
draft: false
excerpt: I built a digital photo frame using Raspberry Pi Touch Display
status: evergreen
author_profile: false
tags:
- raspberrypi
- photography
- self-hosted
title: Digital Photo Frame
---

This is a late blog post for a side-project that I did in January 2026. I had
to go on a side quest while working on this and turns out that the 
[side quest has its own blog post][side-quest] and I am writing about my
original work 4 months later.

<div class="caption-wrapper">
    <p class="caption">
    I have actually built a streamdeck using a cheap 7 inch esp32 touchscreen.
    <br><br>
    I am running late on my blog posts, I'll be posting about it soon.
    </p>
</div>

I had a few ideas to work on using a small touch screen like making a
streamdeck, digital photo frame, a small calendar or read-only view of daily
notes/tasks kinda thing.

I purchased a [Raspberry Pi Touch Display 2][rpi-touch] to just tinker around
and make something out of it. It has a resolution of 720 x 1280 which by
standards of cheap touch screens, is not too bad so I planned to use this for a
digital photo frame.

The photo frame is just a small self-hosted web application showcasing images
from my Immich album. I am using a Rapsberry Pi 4 (2GB) with Raspbian
installed. So I need to just open up a web browser and open the photo frame app
which just cycles over photos from my album.

I have also added a few pages that I can swipe or select to switch to my
calendar view, my notes view etc.

Below are some of the photos of the build.


<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/d17ab443-4ab3-40f7-a669-4d19c8472cc9" alt="screen-image" style="max-width:700px;" />
  <figcaption>The touch screen</figcaption>
</figure>


<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/e785d429-8963-404d-bdfa-7d7643fb2208" alt="Rpi with screen" style="max-width:700px;" />
  <figcaption>Screen plugged with a Raspberry Pi 4 (2GB)</figcaption>
</figure>

<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/7b0043da-4be3-48c3-b135-fd494f9320f0" alt="Screen with case" style="max-width:700px;" />
  <figcaption>With a 3D printed case</figcaption>
</figure>

<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/db43910d-b94d-4492-836b-586d22afb9d4" alt="Case with stands" style="max-width:700px;" />
  <figcaption>With leg stands screwed up</figcaption>
</figure>

<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/d4770600-60d4-468c-9c52-17d398c3917e" alt="finished frame 1" style="max-width:700px;" />
  <figcaption>Finished photo frame, exhibit A</figcaption>
</figure>

<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/c477e74a-7464-412b-839f-2dd99c6c83fb" alt="finished frame 2" style="max-width:700px;" />
  <figcaption>Finished photo frame, exhibit B</figcaption>
</figure>

<figure style="text-align:center">
  <video controls playsinline preload="metadata" style="max-width:640px;">
    <source src="https://github.com/user-attachments/assets/59778810-87db-43f0-b5df-0024d668fecb" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>In motion</figcaption>
</figure>

---

## Credits

- [CreationThroughChaos for sharing the 3D printed case model][case]


[rpi-touch]: https://www.raspberrypi.com/documentation/accessories/touch-display-2.html
[side-quest]: https://vipul.xyz/2026/01/20/bambulab-extruder-fix/
[case]: https://makerworld.com/en/models/789481-desktop-case-for-raspberry-pi-7-touch-display-2
