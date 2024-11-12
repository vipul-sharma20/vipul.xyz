---
layout: single
title: "Self hosting"
permalink: "/2024/11/self-hosting/"
excerpt: "I have gotten myself into self-hosting since this year. This short post is to
talk about the motivation, current setup etc."
author_profile: false
tags: [100daystooffload, self-hosting] 
date: 2024-11-02T01:00:00+00:00
type: post
toc: true
---

I have gotten myself into self-hosting since this year. This blog post is to
talk about the motivation, current setup etc.

I wanted to give more details and publish a more elaborate post but it takes
a lot of time for me to write.<br><br>
I'll probably write individual posts in more detail for a few of the
self-hosted solutions I deploy.
{: .notice--success}

# Motivation
It started with getting a static IP from my ISP. I had setup a media server
that I planned to expose using this static IP.

A fun side-effect of getting a static IP is that I cannot use a different DNS
provider and I'll have to stick with my ISP's DNS.

I had a few Raspberry Pis with me and I thought if I can make use of those to
deploy a few small self-hosted solutions for myself.

# Infrastructure
More specifically, I am into self hosting on my home infra plus a free instance
from Oracle cloud because there's a thrill to my hardware / systems failing and
losing all my data. My state-of-the-art server rack has 3 Raspberry Pis,
version 3, 4 & 5. Only one to go<sup><a href="#references">[1]</a></sup>.

I also have an old gaming laptop that's a prime candidate right now to fit into
my pool of servers. I don't know what happened to it but it just won't create
any new partitions to install Linux.

For storage, I don't have a good solution yet. One of my storage is almost a 10
years old portable HDD that is spinning for its life right now.

# Deployments

I wrote this list of deployments as of November 2nd, 2024. This may become
outdated after some time with more / less deployments.
{: .notice--info}

## 1. Coolify
I am managing all my deployments through [coolify][coolify]

> Coolify is an open-source & self-hostable alternative to Heroku / Netlify / Vercel / etc.
> 
> It helps you manage your servers, applications, and databases on your own
> hardware; you only need an SSH connection. You can manage VPS, Bare Metal,
> Raspberry PIs, and anything else.

{% include image.html url="https://i.imgur.com/ApPlLn8.png" alt="coolify" size="500" caption="My coolify dashboard" %}

## 2. Uptime Kuma
> Uptime Kuma is an easy-to-use self-hosted monitoring tool.

All the deployments that I have written about in this post are getting
monitored through [Uptime Kuma][uptime] at
[https://uptime.vipul.xyz/status/home][uptime]

{% include image.html url="https://i.imgur.com/rqWCooe.png" alt="open-webui" size="700" caption="Uptime page" %}


## 3. Plausible

> Plausible Analytics is an easy to use, lightweight, open source and
> privacy-friendly alternative to Google Analytics. It doesn’t use cookies and
> is fully compliant with GDPR, CCPA and PECR. 

I have used their paid solution for a few years and I was pretty satisfied with
it. [Plausible][plausible] has a community edition that people can self host.

## 4. Immich

> High performance self-hosted photo and video management solution.

[Immich][immich] has been the most useful self-hosted solution for me right
now.

{% include image.html url="https://i.imgur.com/QPNN7RU.png" alt="coolify" size="700" caption="My Immich" %}

## 5. Nextcloud
[Nextcloud][nextcloud] is an open-source Google Drive alternative.

Since I have not figured out my storage and backups yet, I am not confident
enough to use my self-hosted Nextcloud as the only file storage mechanism.

{% include image.html url="https://i.imgur.com/8LJQMyp.png" alt="nextcloud" size="700" caption="Fresh Nextcloud deployment" %}

## 6. Whisper

> Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multitasking model that can
> perform multilingual speech recognition, speech translation, and language
> identification.

This was just an experiment to try out the new quantized
[Whisper.cpp][whisper.cpp] models on a CPU. It now just exists.

{% include image.html url="https://i.imgur.com/MP78lg0.png" alt="whisper" size="500" caption="Whisper.cpp server" %}

## 7. Llama 3.2
I am running Llama3.2 model using [Ollama][ollama]. This is deployed on my free
Oracle instance.

## 8. Open WebUI
> Open WebUI is an extensible, feature-rich, and user-friendly self-hosted
> WebUI designed to operate entirely offline. It supports various LLM runners,
> including Ollama and OpenAI-compatible APIs.

This is my interface to use Llama3.2 other than Ollama APIs

{% include image.html url="https://i.imgur.com/IVxAv7P.png" alt="open-webui" size="700" caption="UI to use Llama models" %}

## 9. Blog
I have a self-hosted version of this blog at [https://blog.vipul.xyz][blog].
This is running on a Raspberry Pi 5.

## 10. Minecraft

I am managing [Minecraft][minecraft] on-demand through a Coolify deployment on
my Oracle free instance. I don't keep it running always and that's the reason
why it shows red in my uptime page screenshot that I [added previously](#2-uptime-kuma).

Credits to [itzg/docker-minecraft-server][minecraft-server] for publishing the
Docker images.

---

## Next Steps

1. Version control all deployment manifests
2. Figure out better storage and backup mechanism
3. Stop Google One subscription

## References

[1] [Creed's grand plan][creed]

[coolify]: https://github.com/coollabsio/coolify
[plausible]: https://plausible.io/
[nextcloud]: https://github.com/nextcloud
[immich]: https://github.com/immich-app/immich
[whisper]: https://github.com/openai/whisper
[open-webui]: https://github.com/open-webui/open-webui
[uptime-kuma]: https://github.com/louislam/uptime-kuma
[whisper.cpp]: https://github.com/ggerganov/whisper.cpp
[ollama]: https://github.com/ollama/ollama
[blog]: https://blog.vipul.xyz
[uptime]: https://uptime.vipul.xyz/status/home
[creed]: https://youtu.be/aVeZ54g_ubE?t=13
[minecraft]: https://en.wikipedia.org/wiki/Minecraft
[minecraft-server]: https://github.com/itzg/docker-minecraft-server
