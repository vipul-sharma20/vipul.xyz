---
layout: single
title: "Using any LLM on Open-WebUI"
permalink: "/2025/02/open-webui-all-llms/"
excerpt: "Setting up Open-WebUI to work with any LLM model"
author_profile: false
tags: [scribbles, self-hosting, llm] 
date: 2025-02-16T12:24:25+00:00
type: post
---

I self-hosted [Open-WebUI][open-webui] to use Llama models that
I had deployed through Ollama.

I wanted to try all the models on Groq (Llama, Deepseek, etc.), Anthropic and
OpenAI through Open-WebUI and they have good support to configure all these
LLMs. Doing this, I now have access to all the major LLMs from one UI.

{% include image.html url="https://i.imgur.com/4XleFio.png" alt="open-webui" size="600" caption="Open-WebUI Models Preview" %}

{% include image.html url="https://i.imgur.com/G9pshmg.png" alt="open-webui" size="600" caption="Open-WebUI" %}

Below are the models that are now available now.

### OpenAI

1. gpt-4o-mini-audio-preview-2024-12-17
1. gpt-4o-2024-11-20
1. gpt-4o-audio-preview-2024-10-01
1. gpt-4o-audio-preview
1. gpt-4o-mini-realtime-preview-2024-12-17
1. gpt-4o-mini-2024-07-18
1. gpt-4o-mini
1. gpt-4o-mini-realtime-preview
1. gpt-4o-realtime-preview-2024-10-01
1.  gpt-4o-audio-preview-2024-12-17
1.  gpt-4o-2024-08-06
1.  gpt-4o
1.  gpt-4o-realtime-preview-2024-12-17
1.  gpt-4o-realtime-preview
1.  gpt-4o-2024-05-13
1.  chatgpt-4o-latest
1.  gpt-4-turbo
1.  gpt-4-turbo-2024-04-09
1.  gpt-4-turbo-preview
1.  gpt-4-0125-preview
1.  gpt-4-1106-preview
1.  gpt-4-0613
1.  gpt-4
1.  gpt-3.5-turbo-1106
1.  gpt-3.5-turbo-instruct
1.  gpt-3.5-turbo-instruct-0914
1.  gpt-3.5-turbo-0125
1.  gpt-3.5-turbo
1.  gpt-3.5-turbo-16k-0613
1.  gpt-3.5-turbo-16k
1.  omni-moderation-2024-09-26
1.  omni-moderation-latest

#### O Series

1. o3-mini-2025-01-31
1. o1-mini-2024-09-12
1. o1-preview-2024-09-12
1. o1-mini
1. o3-mini
1. o1-preview
1. o1
1. o1-2024-12-17

### Deepseek

1. deepseek-r1-distill-llama-70b
2. deepseek-r1-distill-qwen-32b

### Anthropic

1. anthropic/claude-3-haiku
2. anthropic/claude-3-opus
3. anthropic/claude-3-sonnet
4. anthropic/claude-3.5-haiku
5. anthropic/claude-3.5-sonnet

### Meta (Llama)

1. llama-guard-3-8b
1. llama3-8b-8192
1. llama-3.1-8b-instant
1. llama-3.2-3b-preview
1. llama3-70b-8192
1. llama-3.3-70b-versatile
1. llama-3.3-70b-specdec
1. llama-3.2-11b-vision-preview
1. llama-3.2-1b-preview
1.  llama-3.2-90b-vision-preview

### Alibaba (Qwen)

1. qwen-2.5-32b
2. qwen-2.5-coder-32b

### Google (Gemma)

1. gemma2-9b-it

### Mistral
1. mixtral-8x7b-32768

[self-hosting]: https://vipul.xyz/2024/11/self-hosting/
[open-webui]: https://github.com/open-webui/open-webui
