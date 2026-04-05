---
date: 2020-08-22 12:27:00+00:00
excerpt: ''
permalink: /random/rpi-nfs-server/
status: evergreen
tags:
- raspberrypi
- home-automation
title: 'rpi-nfs-server: Network File System over Raspberry Pi'
type: post
---

## About

I had a portable HDD and a raspberry pi lying around so I used them to create
Netfork File System in my local home network.

I use a Macbook Air as my dev machine which has served me well for 2.5+ years
now. One big problem I have is the storage. It has a 128GB SSD and it's mostly
filled with a lot of Docker images and other work related data. The NFS server
helps a lot with the storage considering I am working from WFH for this entire
year.

I have created an interactive Shell script to setup NFS server on raspberry pi
with a USB Hard Disk.

Repository at: [https://github.com/vipul-sharma20/rpi-nfs-server][0]

[0]: https://github.com/vipul-sharma20/rpi-nfs-server