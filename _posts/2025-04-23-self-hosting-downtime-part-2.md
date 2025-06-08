---
layout: single
title: Self-hosting Downtime (Part 2)
draft: false
date: 2025-06-08T23:00:00+00:00
excerpt: "My Raspberry Pi 5 went offline due to an incorrect fstab configuration, causing a multi-day downtime."
toc: true
tags:
  - self-hosted
  - debugging-story
author_profile: false
---

I started writing this post on 23rd April, 2025 and I am finally finishing it
up and posting on 8th June, 2025. It took me 45 days to come back to my draft
and finishing it up.
{: .notice--info}

In the [part 1 of my self-hosting dowtime][part-1], I wrote briefly about 3
days of downtime due to a misconfiguration of the fstab file on my Raspberry Pi 5.

Things went downhill from there.

I'll write about how I messed up things further and my redemption.

# The Problem

After the [first downtime][part-1], I planned to setup backup of some of my
important data. But before that, I wanted to secure my hardware. I got some
heat sink and a fan for my Raspberry Pi 5. I also I 3D printed a case for it.

While putting my Raspberry Pi 5 in the case, I broke my SD card. I thought it
should be safe enough to keep the Raspberry Pi switched on along with the SD
card slotted in while putting on the case. But I was wrong. I didn't realize it
immediately but when the uptime went all red, I saw a piece of SD card fell
down, split in half.

{% include image.html url="https://i.imgur.com/h0KQI2K.png" alt="sdcard" size="400" caption="Broken SD Card" %}

This meant I lost all the data of my self-hosted things deployed on this RPi.
The biggest problem was that my [Coolify][coolify] was setup on this RPi. For
most of my self-hosted deployments, I deploy everything on my free Oracle
server and maintain persistence using my RPi 5. This way, I should not be
worried about any risk of Oracle shutting things down randomly. But that
doesn't make my setup extremely reliable.

## *I have backup but ...*
When the last downtime happened, I happen to take a manual backup of Coolify on
my dev machine and I hoped to get everything in order with this backup but
turns out the backup doesn't backs up the `.env` file which contains an
`APP_KEY` which is mandatory to restore the backup. This key is used to decrypt
your data during restoration.

There is a note when you first setup Coolify that says to keep this `APP_KEY`
safe for backup/restore. Unfortunately, I missed this message and never backed
up either the `.env` file or the `APP_KEY` specifically.

In the end, my backup was of no use so I had to try another way.

---

# Redemption
It was not truly a redemption but just some restoration and some way to avoid
these problems in future.

## Recovered data
My Coolify deployment and some persitent data was gone but since most of my
Docker containers were running on the Oracle instance, I was able to get a
backup of the docker volumes and hence recover the deployments related data
back.

I setup Coolify again on my RPi5, added all the deployments and plugged those
containers with the data recovered from the docker volumes and everything was
back again.

## 3 2 1 Backup
Before wasting and time I setup the [3 2 1 backup strategy][backup-strategy]
for my data.

In summary 3-2-1 backup strategy means having 3 copies of your data, on 2
different media, with 1 copy offsite

In my interpretation of this rule, I consider production deployed service's
data/peristence as the first copy, a backup on another disk as the second copy
and another offsite/cloud backup as the third copy. Maybe this is the intended
interpretation or not but this kind of backup strategy felt good enough to me.

I'll go into some specifics in the next/later section.


# Backup Strategy
I'll go into some specifics of my backup strategy here, more specifically the 3
2 1 stragegy that I have followed for myself.

## The 3 Copies
1. **Primary data** - Live data on both my Oracle server and Raspberry Pi 5
2. **Local backup** - External 2TB HDD connected to my RPi (accessible via NFS to Oracle)
3. **Cloud backup** - [Backblaze B2][backblaze] cloud storage

## The 2 Different Media
- Physical storage (local SSDs + external HDD)
- Cloud storage (Backblaze B2)

## The 1 Offsite Copy
- Backblaze B2, which is geographically separate from my home setup

## Technical Setup

I chose [Restic][restic] as my backup tool because it supports both cloud
storage and local repositories, handles deduplication well, and has strong
encryption built-in.

### Automation

I set up automated daily backups using cron jobs:
- Oracle: 2 AM IST for cloud backup, 3 AM IST for local backup  
- Raspberry Pi: 1 AM IST for cloud backup, 4 AM IST for local backup

Each backup script applies a retention policy keeping 7 daily, 4 weekly, and 6 monthly snapshots.

I also have weekly health check scripts that verify:
- Backups completed within the last 24 hours
- Repository integrity using `restic check`
- Available storage space on the external HDD

### The Setup Cost

- Backblaze B2: ~$5/month for ~100GB of backup data
- 2TB External HDD: One-time cost of ~$80

---

# *Now if things go south...*

- If my Oracle server gets terminated, I can restore from either local or cloud backups
- If my home loses power/internet, my cloud backups are still accessible
- If my external HDD fails, I still have cloud backups
- If Backblaze has issues, I have local backups

Most importantly, I tested the restore procedures.

The peace of mind this setup provides is worth the small monthly cost and the
time investment. I can now experiment with my self-hosted setup without the
constant fear of losing everything to a hardware failure.


[part-1]: https://vipul.xyz/2025/04/05/self-hosting-downtime.html
[coolify]: https://coolify.io
[backup-strategy]: https://www.backblaze.com/blog/the-3-2-1-backup-strategy/
[restic]: https://restic.net/
[backblaze]: https://www.backblaze.com/docs/cloud-storage-about-backblaze-b2-cloud-storage
