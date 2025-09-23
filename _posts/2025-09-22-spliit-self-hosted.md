---
layout: single
title: Self hosting Spliit, a Splitwise alternative
date: 2025-09-22
excerpt: ""
tags:
  - scribbles
  - self-hosting
author_profile: false
---

I have been using [spliit][spliit] for last one year as an alternative for
[Splitwise][splitwise]. Around 2 years ago, Splitwise restricted the number of
expenses you could add in a day for free tier users + ads. Basically, unusable
without the pro plan.

I have tracked 6 of my trips on my self-hosted spliit _(lost 1 trip's data
because of ephemeral storage of my docker container and losing it after
restart)_. I used my phone primarily to add/manage expenses. It doesn't have an
Android app but the mobile site experience is pretty neat.

It also has a feature for [creating expense from receipts][feature]:
> You can offer users to create expense by uploading a receipt. This feature
> relies on OpenAI GPT-4 with Vision and a public S3 storage endpoint

I have not used this feature yet. Probably, I'll give it a try in one of my
future trips.

{% include image.html url="/assets/images/2025/09/spliit.png" alt="spliit" size="500" caption="Screenshot of my groups" %}

[spliit]: https://github.com/spliit-app/spliit
[splitwise]: https://www.splitwise.com/
[feature]: https://github.com/spliit-app/spliit?tab=readme-ov-file#create-expense-from-receipt
