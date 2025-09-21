---
layout: single
title: Safety of backups with self-hosting
date: 2025-09-21
excerpt: ""
tags:
  - scribbles
  - self-hosting
author_profile: false
---

This weekend, I updated and upgraded my self-hosted deployments, played around
with server storage and attached a fresh block storage volume to it. I also
fixed some problems with ephemeral storage in some of my one-click deployment
kind of self-hosted services.

All this was easy because of the safety net of backups that I had set up
earlier, after suffering from [a][a] [few][few] self-hosted deployment
downtimes.

I have been taking remote backups to [Backblaze B2][b2] for the last 5 months
using [restic][restic]. Most importantly, I have a working backup restoration
workflow that's tested well for times when things do go wrong.

Knowing that I can recover from any mess-up I might potentially make gives me
the confidence to perform some arguably destructive operations without a little
more confidence.


[a]: https://vipul.xyz/2025/04/05/self-hosting-downtime.html
[few]: https://vipul.xyz/2025/06/08/self-hosting-downtime-part-2.html
[restic]: https://restic.net/
[b2]: https://www.backblaze.com/cloud-storage
