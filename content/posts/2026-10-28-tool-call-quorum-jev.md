---
title: "Quorum Pattern For Tool Call LLMs & Jev"
date: 2026-10-28
excerpt: "I tried a quorum-based orchestration pattern for agent tools using small tool call models"
permalink: /2026/10/quorum-vs-jev/
tags:
  - llm
  - agents
author_profile: false
---

Around the time when [Jev][jev] was launched (in September 2026), I was
experimenting with a quorum-based orchestration pattern for agent tools using
some really small, on-device deployable tool call models. This was specifically
for a side project where I am building an ESP32 based personal voice
agent/assistant.

> I'm building a personal voice agent on ESP32-based hardware that acts as a
> thin mic and speaker layer.
> 
> On the agent side, I'm experimenting with a quorum-based orchestration for
> common agent tools that I have.
> 
> I call FunctionGemma, LFM2.5 and Needle 2 concurrently with the transcript.
> If they reach a quorum on a tool call, the tool is invoked locally in under
> 100ms. Otherwise it's offloaded to my Hermes Agent to make the call.

_source microblog [here][tweet]._

Jev does a similar job with its [Choice][choice] question where if you give it
the tools as options and it picks one, or none of those. So I tried to compare
how Jev fares against these models, individually and in a quorum.

---

I believe canonically, [Berkeley Function-Calling Leaderboard][bfcl] (BFCL) has
been the way of determining efficacy of such use-cases (but not exactly as we
are comparing Jev's "choice" with a function calling benchmark) but I tried to
evaluate for my use-cases.

Since I was working on building a voice agent for myself, I was working with a
few tools/intents like: `add_task`, `list_tasks` and `complete_task` (tasks are
[tasks.nvim][tasks.nvim] like `- [ ] #task` lines in my wiki diary),
`web_search`, `ask_wiki`, `set_reminder`, `set_timer`, `get_weather`,
`play_music`, `get_time`, `get_date`, etc.

I had an LLM write 333 short voice style utterances for these tools, with
chit-chat and look-alikes. For all the models, they get tools (their names and
description) and no parameters, and they have to pick one tool or none of them.
I ran all the runs locally on an M5 Mac, one model at a time, except Jev, which
is of course API call. I won't consider these as reliable response
times/latency numbers as I didn't care to give nice and constrained env for
testing. For me it was more about functional efficacy and just vibes of the
latency numbers.

## Quorum

My original quorum had Needle 2, FunctionGemma and LFM2.5 230M where I ask them
at once and they act when majority (2 of them) pick the same tool. I expected a
few tiny models voting to hold up against a big one.


| Quorum | Accuracy | p50 latency |
|:---:|:--:|:--:|
| [Needle 2][needle2] + [FunctionGemma][functiongemma] + [LFM2.5 230M][lfm230], 2 of 3 | 57.1% | 149 ms |
| [Needle 3][needle3] + [FunctionGemma][functiongemma] + [LFM2.5 230M][lfm230], 2 of 3 | 55.4% | 146 ms |
| [Needle 2][needle2] + [LFM2.5 350M][lfm350], both agree | 60.4% | 135 ms |
| [Needle 2][needle2] + [Granite 4.0 350M][granite] + [LFM2.5 350M][lfm350], 2 of 3 | **71.0%** | 135 ms |
| [Needle 3][needle3] + [Granite 4.0 350M][granite] + [LFM2.5 350M][lfm350], 2 of 3 | 70.0% | 124 ms |


Latency numbers are arguable as all of them shared/were spawned up together on
my Mac. Again, don't quote me on these.

FunctionGemma and LFM2.5 230M both decline a lot of real commands, so two of
three rarely agree on a tool and the quorum fallbacks to no call at all. It
never calls a tool on chit-chat like statements, but it gets only 47% of
commands right.

The best quorum I found had Granite 4.0 350M in it but it picks a tool for
almost everything, chit-chat included. Its mistakes overlap least with the
others and it repeats 19% of Needle 2's wrong picks while Needle 3 repeats 41%
(understandably so?). This way Granite and one other pick the commands, and
Needle 2 and LFM2.5 350M can vote down the chit-chat, so that works out well.
That's 6 points over Needle 2 alone (but still 25 under Jev). I tried every
combination of 2 to 6 local models and none went past 71%.

This Needle 2/3 + Granite + LFM2.5 350M quorum setup proved to be a better
set-up than using any one of the open models that I evaluated individually.
Individual model performance is in the next section.
{: .notice--info}

As one optimization on not just blindly using Jev, The quorum can work as a
filter. When Needle 2 and LFM2.5 350M agree, which happens on 45% of turns,
they're right 91% of the time. Sending only the rest to Jev which scores 92.7%
which is three points under Jev alone, with 45% fewer API calls. But surely I
am not saving a lot of money through this already cheap Jev model.

## Individual Models


| Model | Accuracy | p50 latency |
|:---:|:--:|:--:|
| [Jev][jev] | **95.7%** | 270 ms |
| [Needle 2][needle2] | 65.0% | 115 ms |
| [Granite 4.0 350M][granite] | 64.0% | 114 ms |
| [LFM2.5 350M][lfm350] | 63.0% | 121 ms |
| [Needle 3][needle3] | 58.4% | 27 ms |
| [Laya][laya] | 55.8% | 115 ms |
| [FunctionGemma][functiongemma] | 50.5% | 44 ms |
| [LFM2.5 230M][lfm230] | 46.2% | 135 ms |
| [Qwen3 0.6B][qwen3] | 44.9% | 208 ms |


## On Fairness of Comparison

The models that I am comparing here are fundamentally different but can be used
to solve _similarish_ kind of problems in my case. Jev's `Choice` picks from
the options that I give it, and it cannot write text, so it cannot fill in
arguments. When I ran the same utterances with parameters, I had to turn each
argument into another choice (priority from low/medium/high, minutes from the
durations found in the sentence) and pass the whole sentence as the task title,
so _"add buy milk to my list"_ becomes `add_task(title="add buy milk to my
list")`. If I score on the arguments too, Jev drops to 74.2%, against 67.9% for
LFM2.5 350M.

The smaller models are built to carry out the entire thing where they can pick
a tool and pull its arguments out of the sentence. For example: "remind me
tomorrow morning to take out the trash", LFM2.5 350M returns
`set_reminder(text="take out the trash", when="tomorrow morning")`, while Jev
can only hand the whole sentence to both fields. Taking the parameters away
works against them. Given an `add_task` with no title field, LFM2.5 230M
replies _"I don't have access to a tool that can add items to a task list"_,
and hence some accuracy drops (58% to 46%).

In the end, this does narrow measurement on whether a small tool call model can
stand in for Jev on a "choice" type question. 

The test set is small and written for my own made up tools, so take the numbers
as directional.
{: .notice--info}

[tweet]: https://vipul.xyz/micro/2026/09/18/0010/
[laya]: https://github.com/NandhaKishorM/laya
[jev]: https://typesafe.ai/
[choice]: https://docs.typesafe.ai/primitives/choice
[bfcl]: https://gorilla.cs.berkeley.edu/leaderboard.html
[tasks.nvim]: https://github.com/vipul-sharma20/tasks.nvim
[needle2]: https://huggingface.co/Cactus-Compute/needle2
[needle3]: https://huggingface.co/Cactus-Compute/needle3
[functiongemma]: https://huggingface.co/google/functiongemma-270m-it
[lfm230]: https://huggingface.co/LiquidAI/LFM2.5-230M
[lfm350]: https://huggingface.co/LiquidAI/LFM2.5-350M
[granite]: https://huggingface.co/ibm-granite/granite-4.0-350m
[qwen3]: https://huggingface.co/Qwen/Qwen3-0.6B
