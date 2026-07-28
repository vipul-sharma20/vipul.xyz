---
date: 2026-07-28
draft: false
title: 'tasks.nvim: Markdown-native task management for Neovim'
excerpt: Shameless copy of Obsidian tasks for Neovim
status: evergreen
tags:
- neovim
- productivity
- scribbles
- note-taking
author_profile: false
---

This post should've been published in April. It's a project showcase blog post
and since there was already a README for it, I was not too excited. I had this
in draft since then and I thought of quickly finishing it up on my flight.
{: .notice--info}

[tasks.nvim][tasks-nvim], a small Neovim plugin for managing tasks from
plain markdown files.

I have been using markdown notes for a long time (since 2018). Some notes are
daily diary entries, some are project notes, some are meeting notes, some are
rough scratch docs.

I had tried [Obsidian tasks][obsidian-tasks] to manage tasks for a few weeks in
2025. I felt Obsidian's vim mode was too slow while making multiple quick
motions in `NORMAL` mode or switching between `NORMAL`/`INSERT` modes.

I liked the markdown nativeness of the tasks on Obsidian and I wanted to do it
in my Neovim workflow to be fast and simpler. So yea, it's a heavily copied
version of Obsidian's task management but as a Neovim plugin.

A task in this setup is a markdown checkbox with `#task` on it:

```markdown
- [ ] #task Ship the API changes  [due:: 2026-03-25]  [priority:: high]
- [/] #task Review the migration plan [[tasks/migration-plan]]
- [x] #task Fix auth middleware  [completion:: 2026-03-21]
```

There is some optional metadata on the same line. Due dates, priorities,
labels, completion dates, wiki links etc.

---

## Task dashboard

`:Tasks` opens a floating dashboard built by scanning the markdown _vault_ (a
directory of markdown files in my case) with [`ripgrep`][ripgrep], parsing
matching markdown lines, and grouping them using simple queries.

<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/68897be2-ac93-4769-80c8-a42f2a48ee85" alt="" style="max-width:100%;" />
  <figcaption>tasks.nvim dashboard</figcaption>
</figure>

The default sections are mostly urgency based like overdue, due today, and
pending. The sections are [configurable][section-config]. Updating a task
changes the original markdown line in the original file.

Basic statuses:

```markdown
[ ] todo
[/] in-progress
[x] done
[-] cancelled
```

Marking a task done or cancelled adds a `completion` date.

---

## Notes attached to tasks

For some tasks, they may also need some more notes. A 1:1 task and associated
note mapping doesn't exist with tasks plugin in Obsidian AFAIK.

```markdown
- [/] #task Refactor payment service [[tasks/refactor-payments]]  [due:: 2026-03-25]
```

The `[[tasks/refactor-payments]]` link points to a normal markdown file. The
dashboard can open that note inline in the same floating window which I can
edit, save and return to the task list.

<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/edcda2bb-047d-4e99-8bcd-e904650bfd8f" alt="" style="max-width:100%;" />
  <figcaption>Editing a linked task note inline</figcaption>
</figure>

---

## Labels and search

Labels are hashtags (except `#task`, that's a special label to denote a "task").

```markdown
- [ ] #task #api-team Deploy API service  [due:: 2026-03-28]
- [ ] #task #otel Estimate timelines for OTel migration
```

The dashboard can filter by label and switch into a status grouped view for
that label. There is also a fuzzy search over task description, date, priority,
and tags.

<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/6e87b896-594d-486a-a8f0-3c6d7fad4b70" alt="" style="max-width:100%;" />
  <figcaption>Filtering tasks by label</figcaption>
</figure>

I also added inline highlighting for `#task` and labels in normal markdown
buffers. It is cosmetic mostly for me to easily scan through my eyes.

<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/de466589-40c4-43d5-9ee2-7b01fabd1e3d" alt="" style="max-width:100%;" />
  <figcaption>Inline task highlighting inside a markdown buffer</figcaption>
</figure>

---

## My Setup

Here are configs of my `tasks.nvim`, sections I use etc.

```lua
require("tasks.nvim").setup({
    vault_path = "~/notes",       -- root of markdown vault
    diary_path = "~/notes/diary", -- where diary entries live
    tasks_path = "tasks",         -- note files dir (relative to vault_path)

    sections = {
        { name = "P0 (Overdue)",  query = "not done\ndue before today\nsort by due" },
        { name = "P1 (Due Today)", query = "not done\ndue today\nsort by due" },
        { name = "All Pending",   query = "not done\n(due after today) OR (no due date)" },
    },

    symbols = {
        todo        = "✗",
        in_progress = "◐",
        done        = "✓",
        cancelled   = "●",
    },

    width  = 0.6, -- float width as fraction of editor
    height = 0.7,
})
```

---

## macOS menu bar

I also made [tasks.macos][tasks-macos], a tiny macOS menu bar app for the same
task format.

<figure style="text-align:center">
  <img src="https://github.com/user-attachments/assets/40ae5d4c-2b8d-40d7-b742-01846aa563dc" alt="" style="max-width:400px;" />
  <figcaption>tasks.macos menu bar view</figcaption>
</figure>

It is a read-only view of the tasks that would show up in the dashboard. This
is useful for times when I don't have my Neovim opened and I can have a quick
look at the active tasks


[tasks-nvim]: https://github.com/vipul-sharma20/tasks.nvim
[tasks-macos]: https://github.com/vipul-sharma20/tasks.macos
[obsidian-tasks]: https://publish.obsidian.md/tasks/Introduction
[ripgrep]: https://github.com/burntsushi/ripgrep
[section-config]: https://github.com/vipul-sharma20/tasks.nvim#setup
