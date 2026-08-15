---
date: 2026-08-15
draft: false
excerpt: "Mine Palace: I turned my notes (markdown documents) into a walkable Minecraft memory palace."
status: evergreen
tags:
- minecraft
title: Turning My Notes Into A Minecraft World
author_profile: false
---

In 2020, I came across [this project][mc-k8s], that allows you to do basic
Kubernetes administration through [Minecraft][minecraft].

Below is the video of the project in action where animals are pods and
deployments. Killing these animals also kill the pods/deployments.

<iframe
    src="https://www.youtube-nocookie.com/embed/IzgsgDADdyc"
    title="YouTube video player"
    style="width: 100%; aspect-ratio: 16 / 9; border: 0;"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
</iframe>

---

After this I always wanted to mod Minecraft or have a world that could become
like an in-game representation of something in real-life and interact with it.
With LLMs I also now had a way to compensate for my lack of skills to mod the
game.

[Razorpay][razorpay] hosted a hackathon in April, 2026 in collaboration with
[Opencode][opencode] where I got a chance to work on doing something with
Minecraft.

This project didn't fit in with any of the themes of the hackathon but I did it
anyway. This was built in around 3 hours of time and since then I have not
updated it but I have a plan to make it look nicer.

I decided to ~~build~~ vibe-code [Mine Palace][mine-palace], that turns a
markdown vault (set of markdown files in a directory) into a walkable Minecraft
world (memory palace). Diary/dated notes become years, months, and day alcoves.
Notes become shelves, lecterns, signs, and readable books you can open inside
Minecraft and walk through.

I have notes from past 9+ years in markdown files as daily diary notes or more
comprehensive project notes etc. and I wanted to navigate through them in a
Minecraft world.

In Minecraft, you can have a [**Chiseled Bookshelf**][chiseled-bookshelf] which
can hold [**Written Books**][written-book].

<figure style="text-align:center">
  <img
    src="https://github.com/user-attachments/assets/e31bfc8a-6b7c-4cd6-8b13-b2052e9ad14e"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Bookshelf with some empty slots and some slots holding "written" books (the colored texture ones)</figcaption>
</figure>

<figure style="text-align:center">
  <img
    src="https://github.com/user-attachments/assets/723bcf3f-0f68-4dcd-8b9a-56e8b5ccad22"
    alt="Descriptive alternative text"
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>How a written book looks like. You can write text in-game and save. It can have multiple pages</figcaption>
</figure>

These were the primary in-game _data structures_ that I planned to use to
represent my notes and created a world that I hosted on a remote server to
connect and navigate.

### Screenshots

Below are some of the screenshots from the world that was ultimately generated
and I was able to build. I used some GPT model via Opencode (they gave $500
credits to all the participants)

<figure style="text-align:center">
  <img
    src="https://github.com/user-attachments/assets/5dec2aab-3340-44d4-8fd2-818f6689fe59"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Bookshelf view</figcaption>
</figure>

<figure style="text-align:center">
  <img
    src="https://github.com/user-attachments/assets/a9b2ac56-c7ae-42de-a6f7-ae6d54b4b165"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Complete library view</figcaption>
</figure>

<figure style="text-align:center">
  <img
    src="https://github.com/user-attachments/assets/07df4f56-8dc6-42db-bdc7-aaf0fa8c1591"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Written note view from 2022</figcaption>
</figure>

<figure style="text-align:center">
  <img
    src="https://github.com/user-attachments/assets/cdf4061f-2926-42d3-8ccd-71a8620a44dd"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Aerial view of the Minecraft world</figcaption>
</figure>

---

### Postscript

I have been using Claude Code to make some small custom game-modes, random
structure generations, mob simulations, fireworks, buffs/nerfs to players etc.
when I play with friends on my Minecraft server. It has been extremely fun to
experiment with all this and play around if we are playing for a short session
and I can teardown the server until next time.


[minecraft]: https://en.wikipedia.org/wiki/Minecraft
[mc-k8s]: https://github.com/erjadi/kubecraftadmin
[razorpay]: https://www.ycombinator.com/companies/razorpay
[opencode]: https://github.com/anomalyco/opencode
[mine-palace]: https://github.com/vipul-sharma20/mine-palace
[chiseled-bookshelf]: https://minecraft.fandom.com/wiki/Chiseled_Bookshelf
[written-book]: https://minecraft.wiki/w/Written_Book
