---
layout: single
title: "Trying out new note taking setup with Obsidian & Vimwiki"
permalink: "/2025/02/note-taking-obsidian/"
excerpt: "Exploring my new note-taking workflow using Obsidian and Vimwiki for better organization and productivity"
author_profile: false
tags: [scribbles, self-hosting, llm, note-taking] 
date: 2025-02-23T14:42:15+00:00
type: post
---

I had written about my [note-taking setup in 2022][note-taking]. TLDR was that
I couldn't move myself from my [Vimwiki][vimwiki] based daily note-taking workflow.

However, recently I've been exploring [Obsidian][obsidian] as a complementary
tool. Motivation was to explore the extensive ecosystem of Obsidian and its
tools, while maintaining the simplicity of Vimwiki over Neovim, a workflow I've
relied on for the past six years.

Although I wanted to explore the plugin ecosystem, I have kept the setup
minimal for now, with only a few essential quality-of-life plugins installed.

I am writing this as a quick review after using this setup for 2-3 weeks. I'll
be writing a longer and better quality post if I choose continue with this
workflow.
{: .notice--info}

### Remote Sync
This is really helpful for me since I can now edit notes on my Mac using
Vimwiki or Obsidian and on my phone using Obsidian's Android app and these get
synced with my other notes.

I have been versioning and syncing my Vimwiki notes until now using git. For
phone & desktop syncing of notes, the plugin that I am using doesn't sync
directly with git so I have setup my own [Minio][minio] server that acts as an
intermediate storage to keep bidirectional sync between my desktop and phone
notes. This storage can also be ephemeral and I have no problem losing it since
I am already syncing notes on a private GitHub repository.

{% include image.html url="https://i.imgur.com/NaemtJg.png" alt="minio" size="500" caption="MinIO Sync" %}

### Cosmetic
Just made some small CSS changes for the documents to look better. I am liking
the WYSIWYG setup of my current changes which seems better than hooking up a
full blown SSG for the notes or a simple markdown rendered in Neovim

{% include image.html url="https://i.imgur.com/3FlRwc1.png" alt="cosmetic" size="500" caption="Custom Obsidian CSS" %}

### Task Management
I am using [Tasks][tasks] plugin for managing my daily tasks and todos. The
plugin provides a nice interface for creating, tracking, and organizing tasks
with due dates, priorities, and other metadata.

Until now, it has been smoothly integrated in my workflow with nice tracking
and querying feature.

{% include image.html url="https://i.imgur.com/ovC9eTR.png" alt="task-management" size="500" caption="Task Management" %}

[note-taking]: https://vipul.xyz/2022/04/note-taking/
[obsidian]: https://obsidian.md/
[minio]: https://min.io/
[tasks]: https://publish.obsidian.md/tasks/Introduction#Task+management+for+the+Obsidian+knowledge+base
[vimwiki]: https://github.com/vimwiki/vimwiki
