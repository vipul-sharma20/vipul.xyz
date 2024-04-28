---
layout: single
title: "USB Footswitch"
permalink: "/2024/04/usb-footswitch"
excerpt: ""
author_profile: false
tags: [100daystooffload, productivity, footswitch]
date: 2024-03-29T00:27:00+00:00
type: post
---

I bought a USB footswitch recently. Most of the time, I am on my laptop and my
plan is to make use of the unused limbs (my feet) while working for hopefully
better productivity & efficiency.

If nothing, I'll atleast have some fun playing around with it. Already using it
for gaming right now.

---

[vim-clutch][vim-clutch] is a well known hardware pedal that helps working with
vim by switching between Insert Mode and Normal Mode on pedal press and
release.

I have got a triple pedal setup. I went with _the more the merrier_ philosophy.

<div style="text-align: center">
<img src="https://gist.github.com/vipul-sharma20/4bcbb1cd077674c941c3b9841d4ea5cc/raw/0287b22c249a44be89357922845ddcf479a52423/20240425_175539.jpg" alt="pedal" style="width:400px;"/>
<p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px"></p>
</div>

I have already configured my 2 pedals to activate Insert Mode (`i`) & Normal
Mode (`<ESC>`) respectively. This is unlike vim-clutch that could keep Insert
Mode active as long as the pedal is pressed and return to Normal Mode as soon
as it is released.

<div style="text-align: center">
<img src="https://gist.github.com/vipul-sharma20/4bcbb1cd077674c941c3b9841d4ea5cc/raw/0287b22c249a44be89357922845ddcf479a52423/20240425_175534.jpg" alt="pedal" style="width:400px;"/>
<p style="text-align:center;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">From left to right, it's configured as <i>i</i> for Insert Mode, <i>ESC</i> for Normal Mode & <i>x</i> to trigger ultimate ability in Valorant</p>
</div>

In vim-clutch, the person has combined two pedals into one to achieve this as
the USB pedal manufacturer (mine & vim-clutch hardware manufacturer is the
same) have only made the Pedal Down event as programmable but not the Pedal Up
event.

This means that on pressing the pedal, I can map a key(say, `i` for Insert
Mode) but I cannot map a key when the pedal is released (say, `<ESC>` for
Normal Mode). Again, with vim-clutch, they have solved in a really ingenious
way by combining two pedals to one.

It has been just a week for me working with these. I think I'll have to get
used to this as it is still not quite natural to make use of foot switches for
anything right now. I'll post more on this once I have hacked around it more
and build any workflow with these switches.

---

Huge thanks to [rgerganov][rgerganov], to create the [command line utility][footswitch] to configure these footswitches.


[vim-clutch]: https://github.com/alevchuk/vim-clutch
[rgerganov]: https://github.com/rgerganov/footswitch
[footswitch]: https://github.com/rgerganov/footswitch
