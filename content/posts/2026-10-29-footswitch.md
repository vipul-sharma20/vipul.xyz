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

![USB footswitch with three pedals](https://images.vipul.xyz/posts/2024/usb-footswitch/d06aa305ed93097e.webp)

I kept default mapping from left-to-right as `i`, `<ESC>`, and `x` to switch to/from
`INSERT`, `NORMAL` mode on vim/nvim and to map a secondary in-game keybind. 

I tried to set it up for gaming by mapping a few secondary keybinds to the
pedals. Nothing too fancy. I have used a few times to trigger some abilities.
For example, in [Valorant][valorant] I use it for _ultimate_ abilities by
mapping the ultimate trigger key to one of the pedals.

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

Now I am using it for some developer experience/productivity use case. One of
the layer has some tmux macros like cycle through sessions/windows, open a
floating window to search tmux sessions by names, etc. I switch to this layer
while I am in terminal mode.

<figure style="text-align:center">
  <img
    src="https://images.vipul.xyz/posts/2024/usb-footswitch/5a61febb57e431f0.webp"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Tmux window searcher configured on left pedal of layer 1.</figcaption>
</figure>

Another layer is for desktop application/workspace switching. I feel my
[skhd][skhd] keymaps are much faster but hey, you gotta look cool and all
telling about it to people.

<figure style="text-align:center">
  <img
    src="https://images.vipul.xyz/posts/2024/usb-footswitch/85f73d05045cb559.webp"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Ergonomics of the footswitch.</figcaption>
</figure>

## Plans

My plan is to have a footswitch layer for different work modes. For example: if
I am in a meeting, I can quickly enable/disable recording/transcripts, put a
push-to-talk, put a timed annotation/bookmark, etc.

I can always have a _footswitchable_ interactions with all kinds of programs or
work modes (meeting, coding, reading, dictation etc.) by adding all the layers.

## Problems

I feel that just 2 pedals on the board are enough so that you can place each
foot on on of them. With the current three pedal setup, I feel it is difficult
to switch to the third one in case you already have a foot on two of those. I
mean, foot to pedal change time is much higher than making a few keystrokes so
it's slower.

In a stading desk mode (which I have been lately using a lot), it's not be easy
to use. Too much movement to move the pedals I feel.


[footswitch-post]: https://vipul.xyz/2024/04/usb-footswitch/
[valorant]: https://en.wikipedia.org/wiki/Valorant
[karabiner]: https://github.com/pqrs-org/Karabiner-Elements
[skhd]: https://github.com/asmvik/skhd
