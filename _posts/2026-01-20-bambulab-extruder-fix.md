---
layout: single
title: "Fixing stuck filament in Bambulab P1S"
draft: false
date: 2026-01-20
tags:
  - 3dprinting
author_profile: false
excerpt: Filament broke in my 3D printer's extruder and nozzle, this is a small blog post on my experience
---

Last weekend I was building something using my Raspberry Pi Touch 2 with a
Raspberry Pi 4 (will post a blog on this too soon). For my display and the
Raspberry Pi, I needed to 3D print a case and I found really good model
[here][model].

### Side Quest

Unfortunately, when I started my printer I got a message on Bambu Studio that
my filament is stuck somewhere in my extruder. I have got broken filament
issues multiple times usually in the AMS unit and I have opened it up quite a
few times to quickly get it resolved.

There have been a few times when I have found this issue of filament getting
stuck in the extruder and in all those times, just disconnecting the PTFE tubes
and pulling it out had worked out fine. But this time, I couldn't see loose
filament stuck anywhere from wherever I could disconnect the PTFE tube from. I
realized that I will need to open up the nozzle/extruder unit.

It was kind of a tangent from my main project that I really wanted to finish up
but I was not fussed about it as I anyway wanted to replace the stock stainless
steel nozzle/gear assembly with a hardened steel one. I had replacements with
me for more than a year now but never got the chance to upgrade it so I thought
I can take this opportunity to swap the extruder gears and the nozzle with
hardened ones.

<div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 20px;">
  <div style="flex: 1; text-align: center;">
    <img src="/assets/images/2026/01/nozzle.jpg" alt="nozzle" style="width:100%; max-width:500px; height:400px; object-fit:cover; border:1px solid #000; cursor: pointer;" onclick="openModal(this)" />
    <p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">Hardened steel nozzle replacement</p>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/assets/images/2026/01/gears.jpeg" alt="gears" style="width:100%; max-width:500px; height:400px; object-fit:cover; border:1px solid #000; cursor: pointer;" onclick="openModal(this)" />
    <p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">Hardened steel extruder gear replacements</p>
  </div>
</div>

---
A small rant: It was so much simpler when for any issue encountered while
printing, on Bambu Studio, I could straight up get links to appropriate wiki to
fix things. Now it guides you through "Bambu AI" which I have felt as a little
annoying.

---

### Dissassembly

I like how easy it is to work with these printers. This is unlike the tough
times I faced with my Ender3 V2 previously. Major frustration was the frequent
maintenance that my Ender3 V2 required.

It was quite straightforward to pop open the front cover and get the entire
unit out in minutes. After disassembling the gears and the nozzle, I was
expecting to find some broken filament in the detached PTFE tube but I didn't
see anything.

<div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 20px;">
  <div style="flex: 1; text-align: center;">
    <img src="/assets/images/2026/01/assembly.jpeg" alt="" style="width:100%; max-width:500px; height:400px; object-fit:cover; border:1px solid #000; cursor: pointer;" onclick="openModal(this)" />
    <p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">Toolhead without the cover</p>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/assets/images/2026/01/toolhead-disassembled.jpg" alt="" style="width:100%; max-width:500px; height:400px; object-fit:cover; border:1px solid #000; cursor: pointer;" onclick="openModal(this)" />
    <p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">After removing extruder gears & nozzle</p>
  </div>
</div>

---

### Broken Filament Reveal

After not finding anything in detached the PTFE, I was now expecting something
to be stuck in the the gears and I saw a tiny broken orange filament stuck in
the gears.

<div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 20px;">
  <div style="flex: 1; text-align: center;">
    <img src="/assets/images/2026/01/orange-filament-stuck.jpg" alt="" style="width:100%; max-width:500px; height:400px; object-fit:cover; border:1px solid #000; cursor: pointer;" onclick="openModal(this)" />
    <p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">This little shit</p>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/assets/images/2026/01/orange-filament.jpg" alt="" style="width:100%; max-width:500px; height:400px; object-fit:cover; border:1px solid #000; cursor: pointer;" onclick="openModal(this)" />
    <p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">Broken filament that was stuck</p>
  </div>
</div>

After this, I replaced the stainless steel extruder gear assembly with the
hardened steel one.

#### The Unexpected

After removing the broken piece of filament from the extruder gear, I noticed
that there was another piece of white filament jammed and broken in the nozzle.
This is what was originally loaded in the nozzle through the AMS before all
this happened.

This was not easy to pull out as it is slotted in extremely tight. Since this
is the nozzle, the filament was once molten at 220°C just before to be spewed
out from the nozzle on the print bed for printing and now, this was frozen at
room temperature inside the nozzler

{% include image.html url="/assets/images/2026/01/white-filament-stuck.jpg" alt="" size="400" caption="Broken white filament stuck in nozzle" %}

To remove this, I read somewhere to heat up one end of a thin allen/hex key
(this is the same size that comes with the printer), shove it in the nozzle so
that it's a few millimiters in, let it sit there and cool down for a few
seconds. Once it's cooled down, pull the key and the stuck filament inside the
nozzle should come out easily completely. This worked out perfectly.

<div style="display: flex; justify-content: space-between; gap: 10px; margin-bottom: 20px;">
  <div style="flex: 1; text-align: center;">
    <img src="/assets/images/2026/01/allen-key-nozzle.jpg" alt="" style="width:100%; max-width:500px; height:400px; object-fit:cover; border:1px solid #000; cursor: pointer;" onclick="openModal(this)" />
    <p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">Toolhead without the cover</p>
  </div>
  <div style="flex: 1; text-align: center;">
    <img src="/assets/images/2026/01/allen-key-pull-out.jpg" alt="" style="width:100%; max-width:500px; height:400px; object-fit:cover; border:1px solid #000; cursor: pointer;" onclick="openModal(this)" />
    <p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">Disassembled tool head (extruder gears & nozzle)</p>
  </div>
</div>

---
Another rant: Since I wanted to swap out the stainless steel nozzle with a
hardened steel one, I could have just replaced it without going through the
effort of pulling out the stuck filament but Bambulab doesn't give the wiring
attached with the nozzle which doesn't look too straightforward TBH to swap
out.

It requires some re-wiring the same wires on the old nozzle to the new one with
some thermal pasting which I didn't expect. I chose to settle with hardened
steel extruder gear and put the existing stainless steel nozzle back in after
removing the stuck filament. Since just removing the nozzle is easy, I'll
probably do it later.

---


[model]: https://makerworld.com/en/models/789481-desktop-case-for-raspberry-pi-7-touch-display-2
