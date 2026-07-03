---
date: 2026-07-04
draft: false
excerpt: I built a Stream Deck clone with an ESP32-S3 touch panel
status: evergreen
tags:
- hardware
- esp32
- productivity
title: ESP32 Stream Deck
author_profile: false
---

I built [esp32-streamdeck][firmware], a small DIY Stream Deck-like controller
using an ESP32-S3 touch display. The firmware runs on an [Elecrow CrowPanel 7"
ESP32-S3][crowpanel] (costs < $40), draws a 3x3 grid in LVGL, reads touches
from the GT911 controller, and HTTP requests to a companion server running on
my Mac.

The server, [esp32-streamdeck-server][server], is a small FastAPI server that
handles/receives touch events made from the touch screen. Actions are mapped in
a YAML file which are executed as shell commands.

<p align="center">
  <img src="https://github.com/user-attachments/assets/aaeac9ae-762c-4b40-b068-8ef3812dcb21" alt="Stream Deck grid" />
</p>

## Structure

On the firmware side there is a fixed tile table like below which is also
rendered and shown in the photo I have added above.

```cpp
static const Tile TILES[9] = {
    { "mute_mic",      "Mic Mute",   LV_SYMBOL_AUDIO,   0x3B82F6 },
    { "play_pause",    "Play/Pause", LV_SYMBOL_PLAY,    0x22C55E },
    { "next_track",    "Next",       LV_SYMBOL_NEXT,    0x22C55E },
    { "vol_down",      "Vol Down",   LV_SYMBOL_LEFT,    0x22C55E },
    { "vol_up",        "Vol Up",     LV_SYMBOL_RIGHT,   0x22C55E },
    { "dnd_toggle",    "DND",        LV_SYMBOL_BELL,    0xF97316 },
    { "open_slack",    "Slack",      LV_SYMBOL_ENVELOPE,0x3B82F6 },
    { "open_terminal", "Alacritty",  LV_SYMBOL_SETTINGS,0xF97316 },
    { "lock_screen",   "Lock",       LV_SYMBOL_CLOSE,   0xEF4444 },
};
```

On tap, the firmware POSTs the key to `/tap` (the server hosted on my machine).

```json
{
    "key": "mute_mic"
}
```

The server holds a YAML config like below:

```yaml
mute_mic:
  toggle: true
  on:  "osascript -e 'set volume input volume 0'"
  off: "osascript -e 'set volume input volume 75'"

open_terminal:
  run: "open -a Alacritty"
```

The server then runs appropriate commands / scripts on my machine.

## Notes layer

I have added a second layer that displays my daily diary notes that usually has
some markdown bullet points as tasks/notes etc. This layer keeps on refreshing
by polling requests to the server.

<p align="center">
  <img src="https://github.com/user-attachments/assets/39339d9f-6d4a-405f-b287-f0a2837add4f" alt="Notes view" />
</p>



[firmware]: https://github.com/vipul-sharma20/esp32-streamdeck
[server]: https://github.com/vipul-sharma20/esp32-streamdeck-server
[crowpanel]: https://www.elecrow.com/esp32-display-7-inch-hmi-display-rgb-tft-lcd-touch-screen-support-lvgl.html
