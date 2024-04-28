---
layout: single
title:  "Note taking"
excerpt: "I have followed the same workflow for note taking for the past 3 years."
date:   2022-04-17 00:30:12 +0530
permalink: "/2022/04/note-taking"
author_profile: false
tags: [neovim, vim, vimwiki, productivity]
type: post
---

I have been following the same workflow for note taking for the past 3 years.

I wanted to have a system using which I can be consistent while being ok to
take a trade-off of it not being the perfect one. I now have 750+ daily diary
notes now which is roughly more than 95% of working days logged using the
current system.

## My idea of note-taking

The intention is to have a smooth note-taking workflow to organize my
knowledgebase.

### Daily note-taking

My basic requirement here is to make daily notes for work, discussions, fleeting
notes, tasks in a way that is easy to access and edit.

### Documents

A general repository of documents, an organized knowledgebase for my work /
personal stuff, easily accessible with minimal tooling overhead.

## The defunct workflow

Until 2019, I had no consistent way of taking and keeping track of notes from
work or otherwise.

During this time, I had tried out the good ol' pen and paper methods,
maintaining a physical daily diary but the information accessibilty becomes
difficult over time. I tried Mac OS' default notes app for a few months but it
felt it was good enough for small todo list tracking. To be honest, I might
have also not followed a good approach of creating effective notes.

<div style="text-align: center">
<img src="/assets/images/notes.svg" alt="mac-notes-app" style="width:500px;"/>
<p style="text-align:left;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">Image 1: My notes in the "Notes" app in Mac OS. Each day I used to create a new note and jot down everything dealing what that particular day (tasks, meetings etc.). This was my way of note-taking in 2018 to early 2019.</p>
</div>

## The present day

After trying some out-of-the-box solutions, I realized that I was
missing the freedom to create my own customizations and automations on top of
the tools I use.

I have now embedded my note taking workflow into my general working setup via
my editor using [Vimwiki][vimwiki].

As per Vimwiki's [documentation][vimwiki]:

> With VimWiki, you can:
> 
> - Organize notes and ideas
> - Manage to-do lists
> - Write documentation
> - Maintain a diary
> - Export everything to HTML

### Daily note taking

This is the most useful part of my current setup. I have a "diary" wiki for
every day to keep track of current day's work, meetings, thoughts etc. A few
keystrokes (`<leader>w<leader>w`) and I can just start writing.

I have a few automations in place for daily diary like auto populating a list
of my work tickets from Jira (I can update their stasuses from my diary as
well), list of meetings to attend, creating list of items for standup meeting
etc.

For individual meetings and discussions, I keep quick notes in the diary and
then move them around to appropriate places.

<div style="text-align: center">
<img src="/assets/images/vimwiki-diary-view.png" alt="vimwiki-diary-view" style="width:500px;"/>
<p style="text-align:left;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">Image 2: This is a minimal view of an auto-generated diary wiki. I add all my daily notes and stuff on this. I disabled a few task tracking workflows to keep it minimal for demonstration purposes.</p>
</div>


### Documents

These are just normal wiki documents linked with each other if required but
more importantly with vimwiki, I can cleanly organize, access and query the
information.

### Managing personal notes

I have a separate wiki for my personal notes. It's like a replica of my work
wiki setup with of course not so much of a powerful workflow and automation. It
has it's own diary and repository of documentation. This is to keep my work and
other personal things isolated.

Vimwiki lets you achieve this really easily. `2<leader>ww` and I am in my
personal wiki space.

### Version control

All the notes and the documents which I mantain is version controlled in a git
repo and I push them to a self-hosted git server (it's just a small Linode
instance with a git server installed).

I have enabled a cron to auto commit diary wikis and push to remote repo
everyday at a specific time. For larger documents, it requires more thoughtful
version control than blind auto commits for which I go by the conventional git
workflow.

## Things I'd want to improve

### Sharing

Sharing docs and notes with others is difficult in this workflow, there's not
public view of the information. Therefore, I have to usually duplicate some
information to a more publicly accessible location when I want to share.

Sometimes, it is meant to be this way (duplicating information). For example:
quick meeting notes, drafts of some ideas etc. which eventually are supposed to
have a refined public representation in the form of a public doc, email etc.
However, if I have any detailed permanent doc which I want to share would need
to be duplicated in its entirety and published somewhere more accessible.

Another drawback is the vimwiki markup syntax. I use vimwiki's own syntax using
which I can't share the docs as other people might not be familiar with it.
Although vimwiki supports markdown, I am fairly comfortable with the vimwiki's
markup syntax. If it becomes too much of a hindrance over time, I'll consider
moving completely to markdown.

<div style="text-align: center">
<img src="/assets/images/vimwiki-diary-ui-view.png" alt="vimwiki-diary-ui-view" style="width:500px;"/>
<p style="text-align:left;padding:5px;font-size:0.7em;margin-top:5px;margin-left:25px;margin-right:15px">Image 2: This is UI view of the diary wiki as displayed in image 1 previously. This is good for sharing it as a screenshare item or just for display purposes. You wouldn't share an html with people.</p>
</div>

### Cross-platform

My current workflow assumes having access to my work or personal machine. It's
currently difficult to create notes on the fly when I don't have access to my
machine. These are mostly fleeting notes while in a conversation with someone,
some interesting thoughts while commmute etc.

I would want to improve it to atleast make it accessible via my phone.
Technically, I can go to my remote repository and add things but that's not
very convenient.

Currently, I just use my phone's default note-taking app and log which tbh is
very convenient. It just requires some manual effort to sync it up with my
organized system.

### The irreplaceables?

There are instances where pen & paper is the way to go.

In 2016, during my job interviews, whenever I explained about my projects and
work, I used to also draw and jot down the topics I was discussing in the call.
Over the 10-15 minutes of discussion, I could clearly see the links among the
pieces I am talking about, if it follows a logical flow and find any missing
piece in the discussion.

Now in 2022, this is equally helpful for me being on the other side of the
interview. I keep a notebook and try to create a map of people's work. I try to
create a basic block diagram of the projects people talk about based on their
explanation and then do QnA on them to understand the hows, whys, any missing
components and details which I couldn't understand.

This is one instance where notebook is irreplaceable or atleast the one I would
always prefer.

## About task tracking

I have a task tracking system which is closely integrated with my daily diary
note taking workflow. I will probably write a different blog post about it.

In short few words, I use [Taskwarrior][taskwarrior] with Vimwiki to manage my
tasks which are independent or grouped by projects, time tracking
prioiritization etc. Vimwiki has a clean integration with Taskwarrior via
[Taskwiki][taskwiki].


[vimwiki]: https://github.com/vimwiki/vimwiki
[taskwarrior]: https://taskwarrior.org/
[taskwiki]: https://github.com/tools-life/taskwiki
