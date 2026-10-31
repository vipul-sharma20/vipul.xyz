---
title: Footswitch
excerpt: "In 2024, I set up a USB footswitch for max productivity gains by using my unused limbs while working. This is a part 2 to it."
date: 2026-10-29
author_profile: false
permalink: /2026/10/footswitch
tags:
  - productivity
  - footswitch
  - scribbles
---

I posted about getting a [footswitch][footswitch-post] in early 2024. My
original philosophy was to get max productivity by making use of your unused
limbs.

My mental model of productivity came from sewing machines (you remember the
ones you could operate with your feet?) and guitar pedals. I was always amazed
by how the sewing machinery worked. What a piece of engineering!

Guitar players while playing with their hands can switch to whatever sound
effect they want by switching the sound through their guitar pedals and
professionals of course play around with dozens of them when they arrange all
of those pedals on a pedal board. So clearly, they are able to make the most
out of their humanly possible capacity.

![USB footswitch with three pedals](https://images.vipul.xyz/posts/2024/usb-footswitch/d06aa305ed93097e.webp)

I have added multiple layers to my footswitch so that same pedals can be
multiplexed in different ways. Just like how you would have different logical
layers for your keyboards. Switching a layer is through a keyboard shortcut (or
by long press left pedal for 400ms) and I can see a pop up notification on the
screen telling which layer it has switched to.

<figure style="text-align:center">
  <img
    src="https://images.vipul.xyz/posts/2024/usb-footswitch/02b9f1fe53abd7f6.webp"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Notification on layer change.</figcaption>
</figure>


I am using [Karabiner-Elements][karabiner] to define these
layers/macros/complex modifications associated with the footswitch. My local
definition looks like the JSON below which is then put into Karabiner-Elements
in its own compatible format.

```json scroll
{
  "device": {
    "vendor_id": 13651,
    "product_id": 45057,
    "description": "PCsensor FootSwitch (3553:b001)"
  },
  "layer_switch": {
    "pedal": "left",
    "hold_ms": 400
  },
  "pedals": [
    { "name": "left", "trigger_key": "i" },
    { "name": "middle", "trigger_key": "escape" },
    { "name": "right", "trigger_key": "x" }
  ],
  "layers": [
    {
      "name": "tmux",
      "bindings": {
        "left": {
          "description": "tmux: find window",
          "sequence": [
            { "modifiers": ["left_control"], "key": "b" },
            { "key": "f" }
          ]
        },
        "middle": {
          "description": "tmux: previous window",
          "sequence": [
            { "modifiers": ["left_control"], "key": "b" },
            { "key": "p" }
          ]
        },
        "right": {
          "description": "tmux: next window",
          "sequence": [
            { "modifiers": ["left_control"], "key": "b" },
            { "key": "n" }
          ]
        }
      }
    },
    {
      "name": "layer2",
      "bindings": {}
    },
    {
      "name": "layer3",
      "bindings": {}
    }
  ]
}
```

Right now I think of "work modes". For example: If I am on my terminal, I
switch to the layer that I have kept for "terminal mode". So the three pedals
now become tmux macros to go to the previous window, next window and search
floating window.

<figure style="text-align:center">
  <img
    src="https://images.vipul.xyz/posts/2024/usb-footswitch/5a61febb57e431f0.webp"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Tmux window searcher configured on left pedal of layer 1.</figcaption>
</figure>

If I am on my browser, in the "browser mode", I use it to scroll pages and
cycle tabs.

When I am in my neovim, I switch to the vim layer where the pedals become i,
`<ESC>` and A, for `INSERT` at the cursor's position, switch to `NORMAL` mode and
`INSERT` mode at the end of the line respectively. This has helped, I think I am
decent with it now with the vim and the tmux workflow. Am I extra productive? I
doubt but it's fun.

I first tried to just map `CTRL + b`, the default tmux prefix key to the pedals
so that I don't have to reach to `CTRL` much (I get that people remap it to
something easier) and pressing other action keys from keyboard like `c`, `w`,
`%`, `"` or whatever but I was not fast enough. I think that's where the [limb independence][limb-independence]
things come into play. I think micro movements are still better through
fingers. I mean if something requires both footswitch + keyboard motions, you
are better off by choosing one of the two options for it. These pedals could be
nice macros (probably like a 3 key macropad).

It has worked out for gaming really well in for example, in
[Valorant][valorant]. During normal gameplay with standard WASD based
movements, I can also press X (through one of the pedals) to trigger some game
mechanics which would be difficult if I had to hold W (moving forward) and X
(triggering the in-game ability) simultaneously using only the keyboard.

Another layer is for desktop application/workspace switching. I feel my
[skhd][skhd] keymaps are much faster but hey, you gotta look cool and all
telling about it to people.

If I think about the guitar analogy again, they also mostly do a one-time
effect switch through their pedals and are not constantly working through it. I
mean they are but not at the same speed/frequency like we do while engaging
with our keyboards or like while driving. So basically, they are triggering
one-off macros. Since I don't know how to drive, I am curious how they feel
about being engaged with all the limbs all the time and how that independence
works for them.

<figure style="text-align:center">
  <img
    src="https://images.vipul.xyz/posts/2024/usb-footswitch/85f73d05045cb559.webp"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Ergonomics of the footswitch.</figcaption>
</figure>

## Problems

Right now I also have problems with the ergonomics of it. I mean the foot
position (even moving foot from the middle pedal to the left pedal is time
taking, not fast enough for micro actions), the actuation force and the travel
it needs to register a press/release which are similar problems that people
would be opinionated about with their keyboard switches. And of course, while
using a standing desk setup, it's even more difficult as you can't also keep
hovering/resting over the pedals. While sitting, I am always hovering/resting
over 2 of the pedals.

I may not be 100% productive yet. Maybe it's one of those productivity curves
to cross or something that I'll realize after a few years just like how I feel
productive enough now after 13 years of grinding through vim/neovim.

## Plans

My plan going forward is to have more layers for different work modes. For
example: if I am in a meeting, I can quickly enable/disable
recording/transcripts, put a push-to-talk, put a timed annotation/bookmark,
etc.

I am also considering designing and 3D printing a more ergonomic one myself
along with the electronics stuff.


[footswitch-post]: https://vipul.xyz/2024/04/usb-footswitch/
[valorant]: https://en.wikipedia.org/wiki/Valorant
[karabiner]: https://github.com/pqrs-org/Karabiner-Elements
[skhd]: https://github.com/asmvik/skhd
[limb-independence]: https://en.wikipedia.org/wiki/Limb_independence
