---
layout: single
title: "Lily58: Building a Split Keyboard"
permalink: "/2024/10/lily58-keyboard/"
excerpt: "I built my own split keyboard from scratch"
author_profile: true
tags: [100daystooffload, keyboard] 
date: 2024-10-13T10:30:00+00:00
type: post
toc: true
toc_sticky: false
toc_label: "Contents"
image: "https://i.imgur.com/tbCRgtI.jpeg"
---

## Introduction

For the past few weeks, I’ve been working on building a custom split keyboard.
This post documents the entire process, including previous attempts, mistakes I
made along the way, and the lessons I learned.

## Past attempt (2021)

I once shared a [post about building my first mechanical
keyboard][mechanical-keyboard], though that was mostly just assembling
pre-bought parts. In 2021, I discovered the [Lily58][lily58], an open-source
keyboard. I ordered a build kit from [Keyhive][keyhive], which was shipped from
the US and ended up being quite expensive due to customs fees. After receiving
the kit, I spent a few hours working on it and [posted a journal
entry][lily58-first-try] about the partial build. That’s when I realized I had
missed ordering some essential components—build plates, a case, and a TRRS
jack.

<div style="text-align: center">
<video width="450" height="350" controls>
  <source src="/assets/videos/diode-solder.mp4" type="video/mp4">
</video>
<p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">
    Video from 2021. Abandoned it after soldering one half of the keyboard when
    I was missing a few parts.
</p>
</div>


## The build

I paused the build in 2021 until taking it up again in August this year.

I have kept all the resources for the build like PCBs, firmware that I flashed,
STLs for plates and case etc. in a repo [here][keebs]
{: .notice--info}

### 1. Printing the PCB

I have put the gerber files [here][gerber].
{: .notice}

I got the PCB printed online through a PCB fabrication company
([LionCircuits][lioncircuits]). They also helped me fix some of the defects
which I had no clue about.

This costed me around 6k INR (around 70 USD) for 6 plates. I can make 3
keyboards using these. I could've reduced the cost by half here by using the
default green solder mask. The black one costed me more.

{% include image.html url="https://raw.githubusercontent.com/vipul-sharma20/keebs/refs/heads/main/lily58/PCB/pcb.png" alt="pcb" size="400" caption="Render of the gerber" %}

You can see the printed PCB through some other images later in the post.


### 2. Soldering the diodes

Soldered 58 of [1N4148W][1N4148W] for each key slot on the PCB.

Tricky thing about these is to solder them in the correct alignment. These are
frustratingly small to work with (*read: don't have soldering experience*). I
made a few mistakes working with these like soldering a few of them incorrectly
aligned and loose solder which caused some of the keys not working in the final
build, but it was easy to fix.

<div class="caption-wrapper">
    <p class="caption">
    58 of these 1N4148W diodes. They are super small and need to be soldered in
    the correct orientation.
    <br><br>
    <img src="https://i.imgur.com/zFNHsR2.jpeg" alt="{{ include.alt }}" style="width:200px;border:1px solid #000"/>
    </p>
</div>

{% include image.html url="https://i.imgur.com/VCx6sVg.jpeg" alt="diodes" size="500" caption="1N4148W diodes soldered" %}


### 3. Soldering the switch sockets

These are the sockets on which the key switches go. They were comparatively
easier to solder than the diodes.

I made a big mistake here. Instead of soldering the two halves in mirror
orientations, I accidentally soldered both as if they were the right half. The
correct method was to solder one half, then flip the other half laterally
(inverted) before soldering it. Unfortunately, I didn’t notice this until after
I had already soldered all the diodes and sockets, so I had to desolder
everything and start over on the correct side.

<div class="caption-wrapper">
    <p class="caption">
    They kind of sit in place in the PCB holes so they are easy to solder.
    <br><br>
    <img src="https://i.imgur.com/jBs0E3F.jpeg" alt="{{ include.alt }}" style="width:200px;border:1px solid #000"/>
    </p>
</div>

{% include image.html url="https://i.imgur.com/opnYwvd.jpeg" alt="sockets" size="500" caption="Switch sockets" %}

### 4. Arduino and friends

Soldered [Arduino Pro Micro][pro-micro], TRRS jack and the reset switch.

I made a mistake soldering the [pin headers][pin-headers]—they didn’t go all
the way through the board, but I didn’t notice and soldered them anyway. Once
they were in place, I realized my mistake, but I couldn’t fully desolder them.
I tried using a desoldering pump and wick, but they didn’t work. I then heated
the pins and tried pulling them out with my Swiss Army knife’s pliers, which
damaged the board. Some copper traces inside the PCB came off along with the
pins. In the end, I had to switch to a different board to continue.

<div class="caption-wrapper">
    <p class="caption">
    There's an OLED module on top of Arduino Pro Micro in this image.
    <br><br>
    <img src="https://i.imgur.com/ZwUNzk4.jpeg" alt="{{ include.alt }}" style="width:200px;border:1px solid #000"/>
    </p>
</div>

{% include image.html url="https://i.imgur.com/nvYL14Y.jpeg" alt="arduino" size="500" caption="Soldered Ardunio Pro Micro, TRRS Jack and Reset Switch" %}

### 5. Putting the plates and switches

I printed the plates for the keyboard which I found at
[serverwentdown/lily58-3d][3d-print-designs] with my 3D printer. For key
switches, I used Cherry MX brown switches. I wanted to try some linear switches
but I already had these with me.

<div style="text-align: center">
<video width="450" height="350" controls>
  <source src="https://i.imgur.com/jtvo7nH.mp4" type="video/mp4">
</video>
<p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">
3D printed the plates. Credits to <a href="https://github.com/serverwentdown/lily58-3d">serverwentdown/lily58-3d</a> for open sourcing the designs.
</p>
</div>

{% include image.html url="https://i.imgur.com/m44uNaY.jpeg" alt="plates" size="500" caption="With the 3D printed plate" %}

{% include image.html url="https://i.imgur.com/BUiqlJ6.jpeg" alt="plates" size="500" caption="With key switches" %}

### 6. Flash the firmware

I flashed the firmware before putting any keycaps so that I can easily without
disassembling entirely resolve any issues with incorrectly soldered diodes,
socket or bent key switch pins.

I used the [QMK Firwmare][qmk], an open-source firmware for microcontrollers
for keyboards.

I have kept my firmware file, code, keymaps etc. [here][firmware].
{: .notice}


### 7. Testing the keyboard

After flashing the firmware, I tested the keyboard and found that about 10 keys
were not working. I identified and resolved several issues:

1. **Misaligned diodes**: Some diodes were installed incorrectly. I had to
   invert and resolder them.
2. **Loose solder joints**: A few diodes and sockets weren’t soldered properly.
   I resoldered the ones that looked questionable.
3. **Header pin soldering for Arduino**: Although the header pins appeared fine
   visually, they weren’t making proper contact. After reinforcing the solder
   on each pin individually, a few issues were resolved.
4. **Replacing sockets, diodes, and switches**: Each key on the PCB relies on
   these three components. For the keys that still didn’t work after
   resoldering, I replaced the sockets, diodes, and switches, which fixed the
   issues for 1–2 defective keys.

In hindsight, using a multimeter would have made troubleshooting much easier
and saved me a lot of time.

### 8. Putting the keycaps

I didn’t spend much time choosing the keycaps. I just ordered the first
ortholinear profile keycaps I came across since there weren’t many options
available anyway. They look clean and simple, which works for me.

### 9. The case

I came across a few designs on [Maker World][maker-world], but the widest
variety—low profile, high profile, different wall configurations, etc. was
available with the [Manta58][manta58]. I decided to print one of the
low-profile designs on my 3D printer, and here’s a timelapse of the process.

<div style="text-align: center">
<video width="450" height="350" controls>
  <source src="https://i.imgur.com/rO64wVa.mp4" type="video/mp4">
</video>
<p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">
3D printed the case. Credits to <a href="https://capsuledeluxe.com/manta58/">Capsule Deluxe</a> for open sourcing the designs.
</p>
</div>

### 10. Final build

{% include image.html url="https://i.imgur.com/tbCRgtI.jpeg" alt="lily58" size="500" caption="Lily58" %}
{% include image.html url="https://i.imgur.com/RpOocpm.jpeg" alt="lily58" size="500" caption="Lily58" %}

---

## Build cost

Here's a breakdown of the cost of all of the components that were required for
the build.

| Component        | Cost (INR) | Cost (USD) | Image |
|:------------------:|:------------:|:------------:|:-------:|
| PCB              | ₹1000      | $12.00     |<img src="https://i.imgur.com/VCx6sVg.jpeg" alt="{{ include.alt }}" style="width:200px;border:1px solid #000"/>       |
| Arduino ProMicro | ₹1000      | $12.00     |<img src="https://i.imgur.com/ZwUNzk4.jpeg" alt="{{ include.alt }}" style="width:200px;border:1px solid #000"/>      |
| OLED module      | ₹600       | $7.20      | see Arduino image (black screen)      |
| Key Sockets      | ₹500       | $6.00      |<img src="https://i.imgur.com/jBs0E3F.jpeg" alt="{{ include.alt }}" style="width:200px;border:1px solid #000"/>       |
| 1N4148W diodes   | ₹100       | $1.20      | <img src="https://i.imgur.com/zFNHsR2.jpeg" alt="{{ include.alt }}" style="width:200px;border:1px solid #000"/>      |
| Key Switch       | ₹1900      | $22.80     | <img src="https://i.imgur.com/BUiqlJ6.jpeg" alt="{{ include.alt }}" style="width:200px;border:1px solid #000"/> |
| Key Caps         | ₹2500      | $30.00     |<img src="https://i.imgur.com/NWXOVjR.jpeg" alt="{{ include.alt }}" style="width:200px;border:1px solid #000"/> |
| TRRS Jack        | ₹100       | $1.20      | see Arduino image |
| TRRS Cable       | ₹300       | $3.60      | see connecting cable in the [final build](#10-final-build) |
| Tact Switch      | ₹20        | $0.24      | see Arduino image (Reset Switch) |
| M2 Spacers       | ₹200       | $2.40      | - |
| M2 Screws        | ₹100       | $1.20      | - |
| **Total**        | **₹8300**  | **~$100**  |  |

Additionally, I 3D printed [plates](#5-putting-the-plates-and-switches) and
[case](#9-the-case) that used around 150g of filament (PLA) that costs around
₹150 (~$2). I'll conveniently not factor in the cost of the 3D printer itself
{: .notice--warning}

## Retrospection

### Things I would do differently / what I could've done better

1. Shitty soldering work: I’m not too bothered by this since I know I’ll
   improve with more experience.
2. Insufficient research on the build: I didn’t dive deep enough into the build
   process and logistics, which also led to me missing some crucial parts in
   2021.
3. Gave up too soon in 2021: This ties into the previous point. Looking back, I
   realize that with just a bit more effort, I could have completed the build
   back then, but for some reason, I didn’t follow through.

### Fulfillment

1. After a long time there was no LLM that was used to assist with my work. I
   felt a sense of accomplishment that I would feel during completing a college
   hobby project, the one you build after learning a new language / framework.
2. Bringing something functional into existence: Software gives the feeling of
   bringing something logical into existence through your imagination and
   instructions to the computer. Working with this kind of hardware gave a
   similar experience, albeit in a more tangible form. They were pieces of
   electronics a few weeks ago and building them into one of the programmer's
   most used tool is super cool.


[mechanical-keyboard]: https://vipul.xyz/random/building-mechanical-keyboard/
[lily58-first-try]: http://localhost:4000/journal/2021-09-26/#building-my-own-lily58-split-keyboard 
[lily58]: https://github.com/kata0510/Lily58
[keyhive]: https://keyhive.xyz/
[keebs]: https://github.com/vipul-sharma20/keebs/tree/main/lily58
[gerber]: https://github.com/vipul-sharma20/keebs/tree/main/lily58/PCB
[lioncircuits]: https://www.lioncircuits.com/
[1N4148W]: https://www.diodes.com/assets/Datasheets/BAV16W_1N4148W.pdf
[pro-micro]: https://deskthority.net/wiki/Arduino_Pro_Micro
[pin-headers]: https://en.wikipedia.org/wiki/Pin_header
[3d-print-designs]: https://github.com/serverwentdown/lily58-3d
[qmk]: https://docs.qmk.fm/
[firmware]: https://github.com/vipul-sharma20/keebs/tree/main/lily58/firmware
[maker-world]: https://makerworld.com/en
[manta58]: https://capsuledeluxe.com/manta58/
