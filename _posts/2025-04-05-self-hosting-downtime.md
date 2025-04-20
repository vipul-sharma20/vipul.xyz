---
layout: single
title: Self-hosting Downtime
draft: false
date: 2025-04-05
excerpt: "My Raspberry Pi 5 went offline due to an incorrect fstab configuration, causing a multi-day downtime."
toc: true
tags:
  - self-hosted
  - debugging-story
  - scribbles
author_profile: false
---

Just a few days ago (31st March) I [wrote about setting up backups][backup] for
my [self-hosted][self-hosted] tools.

My Raspberry Pi 5 decided to fool me a day later than the tradition has it and
it went off the network. I discovered this when I was at work. The uptime pings
were failing, and I couldn't SSH. I came back home, tried to plug a different
LAN cable but it didn't work.

After this, I tried to plug the thing off an on. I was just following the
universal first step of troubleshooting, if something can be turned off and on,
do it. At this step, I should've tried to plug my monitor in and see what was
actually happening but I decided to just forcefully reboot by plugging it off
and on.

Unfortunately, it booted up in ["Emergency Mode"][emergency-mode]. After going
through the logs through `journactl -xb`, I was able to figure out that it was
because of config that I had added to mount one of my disks as NFS in
[`/etc/fstab`][fstab].

> fstab (after file systems table) is a system file commonly found in the
> directory /etc on Unix and Unix-like computer systems. In Linux, it is part
> of the util-linux package. The fstab file typically lists all available disk
> partitions and other types of file systems and data sources that may not
> necessarily be disk-based, and indicates how they are to be initialized or
> otherwise integrated into the larger file system structure.

I don't remember doing this config and it was not set up completely /
correctly. I do remember playing around with NFS once but they work just fine.
This means that since I added this config, my Raspberry Pi was never rebooted
for any reason. When I had decided to turn it off and on, it got stuck in
Emergency Mode. Very likely that it was stuck in Emergency Mode earlier as well
when I did not connect it with a display.

Anyway, once I fixed the config, I was able to get back into my systems, all
the tools came back up automatically.

![uptime-plot](https://i.imgur.com/IVpRgSP.png)

> [!NOTE]
> I couldn't get the time for 3 days to look at the problems properly so the
> total downtime was huge. Until then, I deployed some things on my local
> machine or other Raspberry Pi / cloud server

## Learnings / Realizations

- I was kinda happy dealing with all this because I realized that my self-hosted
  tools do have some utility in my life and they are not just gimmicks. Also, I
  was confident that I'll be able to recover things even if I had to reinstall
  everything
- Setup backups sooner. And more importantly test the backups i.e. try
  restoring the backups to know that they work
- Don't rely on reliability / lifetime of SD cards

[backup]: https://til.vipul.xyz/2025-03-31-ideas-april-2025#projects
[self-hosted]: https://vipul.xyz/2024/11/self-hosting/
[emergency-mode]: https://forums.raspberrypi.com/viewtopic.php?t=297919
[fstab]: https://en.wikipedia.org/wiki/Fstab
