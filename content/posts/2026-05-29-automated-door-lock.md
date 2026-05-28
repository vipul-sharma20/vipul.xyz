---
date: 2026-05-29
draft: false
excerpt: Planning a linear-servo door opener that retracts my rim lock's slider
status: evergreen
tags:
    - scribbles
    - hardware
    - home-automation
author_profile: false
title: Automating My Door Lock
---

My front door has a surface-mounted rim night latch, that auto-locks when you
pull the door shut. Mostly I just slide the little bottom lever (right → left)
to pop the latch, walk out and close the door and it locks itself.

<figure class="article-image article-image-center">
  <img src="https://github.com/user-attachments/assets/bbbeefae-dd09-4f5f-a7f6-57f47ab36cd3" alt="Yale rim night latch — white body with a chrome turn-knob, a small slider lever at the bottom-left, and the spring bolt on the right" loading="lazy" style="border: 0;" />
  <figcaption>The lock looks like this. Notice the small slider on the bottom left</figcaption>
</figure>

I am planning to automate door unlocking without replacing it with a smart lock
but through mechanical parts and unlocking the door on command through an app
or something.

Below is a representation (Claude built it) of how I imagine it will work like.

<iframe class="door-lock-iframe" src="{{ site.baseurl }}/assets/html/door-lock/door-lock-animation.html" width="100%" height="480px" frameborder="0" scrolling="no" style="border: 0; display: block; overflow: hidden;"></iframe>

## Tentative Plan

I knew I would need a servo but Claude suggested to go for a linear servo which
seems to be the best option for this. I'll have to do some research on the
stiffness and the travel distance etc. before I can narrow down on the best
option.

To communicate remotely, I have spare ESP32 and an old Raspberry Pi 3. I will
probably use an ESP32 as it'll be smaller and easier to mount on the door.

I am not too sure of the power supply logistics TBH, can get a little messy to
keep it more practical for day-to-day use.

Once I have things working, I'll probably wrap it all up in a 3D printed
housing.

I have not decided the mechanism to trigger unlock (some kind of scan vs app
etc.), but that's the easy part.
