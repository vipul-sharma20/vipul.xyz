---
layout: single
title:  "Moving from Vimscript to Lua"
excerpt: ""
date:   2022-01-16 00:30:12 +0530
permalink: "/2022/01/vimscript-to-lua"
author_profile: false
---

## Vim to Neovim

I moved to Neovim in 2018 when v0.3.0 version was released. Before this,
between 2015-2016, I was using Vim 7.4 until Vim 8.0 was released in 2016 which
was the first major release after 10 years.

## Vimscript to Lua

A few weeks ago I switched my Neovim configs from Vimscript to Lua. Neovim now
has an embedded Lua runtime and supports configuring the editor via Lua which
TBH feels more natural to work with because it's a proper general purpose
programming language. I have mostly worked with Vimscript till now to configure
my editor and writing plugins but Lua feels more intuitive and I would like to
take it up for any plugin tasks in the future.

With Lua being a general purpose programming language, a lot of constructs then
tend to be more verbose than Vimscript which on the other hand is a scripting
language which focuses specifically to configure the editor.

Lua is faster than Vimscript, Neovim is moving at a much faster pace with its
development and it has a strong ecosystem of tools and plugins in Lua. While I
was doing a spring cleaning of my Neovim configs, I decided to port the configs
into Lua. I like that people can always choose between Vimscript and Lua for
their configs, the interoperability is pretty good.

My experience overall working on porting the configs was smooth,
[nvim-lua-guide][nvim-lua-guide] and the official `:help` worked for the most
part.

I have posted my configs in a GitHub repository at
[https://github.com/vipul-sharma20/nvim-config/](https://github.com/vipul-sharma20/nvim-config/).
I also have my minimal dev environment as a public Docker image which has
Neovim configured which I can pull to any environment which is not my dev
machine.

You can try running Neovim with my configs by fetching the Docker image hosted
[here][docker-dev]. Dockerfile [here][docker-dev-dockerfile].

```bash
docker pull vipul20/docker-dev
docker run -it vipul20/docker-dev:latest
```

[docker-dev]: https://hub.docker.com/r/vipul20/docker-dev
[docker-dev-dockerfile]: https://github.com/vipul-sharma20/docker-dev/blob/master/Dockerfile
[nvim-lua-guide]: https://github.com/nanotee/nvim-lua-guide
