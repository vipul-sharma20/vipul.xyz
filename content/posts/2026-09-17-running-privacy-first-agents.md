---
layout: single
title: "Running A Privacy-First LLM Agent Workflow"
date: 2026-09-17
excerpt: "Using a self-hosted Qwen model on Modal for my agents needing data privacy"
tags:
  - self-hosted
  - llm
  - privacy
  - scribbles
author_profile: false
---

I know what I write here is not a complete private setup or a guarantee of true
privacy, But I have kept the definition loose to privacy that I can _afford_.

There are a few LLM agent use-cases I have in mind that I want complete privacy
for, like financial analysis (maybe an extension of [hdfc-analytics][hdfc-analytics]), 
my emails, health records management, etc.

I planned to start with setting up this workflow for emails as it acts like a
data store for a lot of things like weekly credit card bills, invoices, travel
tickets (that helped me [build my travel analytics][flight-analysis] once), etc.

I would like to use truly locally hosted LLMs but, since I am constrained by
the lack of hardware, I am at the mercy of cloud _self-hosteable_ LLM models
and their guarantees of not sharing and accessing my data in their [data & privacy policy][modal-data-privacy].

<figure style="text-align:center">
  <img
    src="https://images.vipul.xyz/posts/2026/modal-data-privacy/473f3235de084412.webp"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption><a href="https://modal.com/">Modal's</a> data privacy policy.</figcaption>
</figure>

Starting with my email use-case, I have set up an on demand
[Qwen3-4B-Instruct-2507][qwen], served by [vLLM][vllm] on an L4 instance on
[Modal][modal] that reads my emails, triages it, and posts a digest into a
private channel on my self-hosted [Mattermost][mattermost].

I am still working on how periodic this check should be. Since email is an
async mode of communication, some degree of _asyncness_ or TAT for responses
should be expected. But now that people have their complementary or co-pilots,
we are kinda questioning traditional functioning alltogether. For now, it runs
every 3 hours but a lower frequency can help me with costs and probably running
a larger model. In case I want to run it on-demand, I can ask my [Hermes Agent][hermes] 
to trigger this workflow for me which acts just as a trigger and has no access to other data.

I planned to start with setting up this workflow for emails as it acts like a
data store for a lot of things like weekly credit card bills, invoices, travel
tickets (that helped me [build my travel analytics][flight-analysis] once), etc.

Point of doing all this was to set up some kind of kinda privacy first agent
setup that helps me as a groundwork for some of my other use-cases. 

As of now a warm run is around 60 seconds of L4 time which roughly comes around
$0.015 per run.


[mattermost]: https://github.com/mattermost/mattermost
[vllm]: https://github.com/vllm-project/vllm
[qwen]: https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507
[modal]: https://modal.com/
[hdfc-analytics]: https://github.com/vipul-sharma20/hdfc-analytics
[modal-data-privacy]: https://modal.com/docs/guide/security#data-privacy
[flight-analysis]: https://vipul.xyz/2025/12/22/flight-journey/
[hermes]: https://github.com/NousResearch/hermes-agent
