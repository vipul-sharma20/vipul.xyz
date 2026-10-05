---
title: "Orchestrating Minecraft Agents With Jev & Hermes"
date: 2026-10-06
excerpt: "I put AI bots in my Minecraft world orchestrated by Hermes and Jev."
tags:
  - minecraft
  - llm
  - agents
author_profile: false
---

For a good part of this year and since the last few weeks, a lot of my
LLM/agentic ideas have been around the game of [Minecraft][minecraft].
Minecraft being a [sandbox game][sandbox-game], gives all the freedom to do
whatever you want. I wanted to experiment with Minecraft being an interface for
a data-store and for this, I previously built on _[Minepalace][minepalace]_. To
make use of all the freedom in a Minecraft world, my plan was to plug AI
agents as playable characters.

I have [Hermes][hermes] set up for my agentic stuff. I wanted to create
multiple [agent profiles][agent-profiles] i.e. multiple Minecraft bots who can
join my world and each of them can have their own memory, personality, and
goals.

The bots and mechanics are built on [mineflayer][mineflayer], that speaks the
[Minecraft protocol][protocol] and gives a scriptable player. It can walk, dig, place
blocks, craft, fight and read chat, and the server treats it like any other
player who logged in.

---

Each bot's config describes its objective in English. I use a Hermes planner
that reads the objective and turns it into a plan. This is like a list of goals
like `mine` or `craft`, each with its arguments and a one-line reason. The
planner submits the plan through one tool, `set_plan`, which checks every block
and item name against the server. If a step is invalid, `set_plan` rejects it
and names the failed step, and the planner can fix it in the same turn.

Once the plan is set, the agents carry it out on their own. Whenever the
situation changes, [Jev][typesafe], a fast decision mode, decides what happens
next. It either picks the next step or, if the current goal is still in
progress, leaves the body alone to finish it.

## Combat Orchestration

Jev fits well with the combat use-case as there are a handful of options and
the right decision can come from reading the situation in-game instead of
arithmetic written in the code. It is also the one place in the project where
handing the decision to the Hermes planner would be too slow as well as too
expensive. As the fight changes in seconds, a bigger LLM loop would take
multiple seconds before there's an actionable output.

The combat check asks Jev three questions in a single request. Jev answers them
in parallel, so all three cost one round trip.

```python
questions = {
    "action": choice(
        "A Minecraft player is in danger from a hostile mob. Pick the single "
        "best thing for it to do in the next moment. Judge it as a player "
        "would: some mobs are far more dangerous than others, a mob that "
        "shoots from a distance cannot be fought the same way as one that has "
        "to reach you, fighting without a weapon is usually a mistake, and "
        "zombies and skeletons burn up on their own once the sun is up.",
        options),
    "danger": score("How much trouble is this player in?", [...]),
    "winning": noul(
        "Is this player winning the fight it is in?",
        yes="It is healthy enough, armed, and the mob is the one in trouble.",
        no="It is hurt, or unarmed, or outnumbered, and losing ground."),
}
```

Jev also only sees options the bot can act on in the moment. For example: `eat`
is offered only when there is food in the inventory, `retreat_to_player` only
when a real person is within 48 blocks, and `carry_on` only when the bot is
already in fight/flight.

<figure style="text-align:center">
  <video playsinline controls preload="metadata" style="max-width:640px;">
    <source src="https://github.com/user-attachments/assets/bc09443e-0e98-4b22-8db9-621d80435201" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Jev rating the odds and choosing. One bot breaks off mid-fight as
  its own winning reading drops.</figcaption>
</figure>


## Goal Driven Task Orchestration

The second video is six agents working on a goal ladder from an empty
inventory, with a very few model calls so that agents/players don't get stuck
in a _thinking_ loop until LLM prescribes on what should be done.

An agent helps with coming up for a [recipe][crafting] in single pass for a goal. For
example: below would be the recipe to build a [stone pickaxe][stone-pickaxe] from an empty
inventory

```plaintext
mine 4x oak_log -> craft 11x oak_planks -> craft 4x stick -> craft crafting_table
  -> place crafting_table -> craft wooden_pickaxe -> mine 3x cobblestone
  -> craft stone_pickaxe
```

<figure style="text-align:center">
  <video playsinline controls preload="metadata" style="max-width:640px;">
    <source src="https://github.com/user-attachments/assets/499b9050-fb13-49e9-9fc4-c351a6d0d3a5" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <figcaption>Six agents on a shared ladder of objectives, from an empty
  inventory.</figcaption>
</figure>

### Jev's Purpose

Jev makes some judgement calls that are left other than the recipe actions that
the agents carry on themselves.

There are technically multiple kinds of materials that can be used to build the
same item. The code logic sees everything within 48 blocks of the bot, and when more
than one kind of wood or stone would do, Jev picks one based on how much of
each is nearby and how far away it is. This way, one [Birch][birch] tree at 12
blocks is worse than an [Oak][oak] [forest][forest] at 30. In case this decision is taken 
by the code logic, the tie goes by item id, which picks [cobbled deepslate][cobbled-deepslate]
for a stone pickaxe and sends a bot that has just spawned on the surface underground.

The other calls are about the agent body. When a [mob][mob] is nearby, Jev
decides whether it is safe to start the next job at all. For example: walking
off to mine next to a [creeper][creeper] is not right. While a job is running,
Jev decides whether it is still the best use of the moment or whether the next
step should take over. If a mob attacks, the reflexes take the body and the
combat questions from earlier decide the fight actions.

The bot only reconsiders when there's a new plan, a job finishing or failing, a
mob coming inside the _defend radius_, or the health and food descriptions
changing. There's a 10 seconds heartbeat while a person is online that makes
sure a bot whose situation has stopped changing still gets another check. Most
of these checks go in code, and Jev is only called when one of the calls above
is open.

---

[minecraft]: https://en.wikipedia.org/wiki/Minecraft
[minepalace]: https://vipul.xyz/2026/08/15/minepalace/
[hermes]: https://github.com/NousResearch/hermes-agent
[typesafe]: https://typesafe.ai/
[mineflayer]: https://github.com/PrismarineJS/mineflayer
[sandbox-game]: https://en.wikipedia.org/wiki/Sandbox_game
[agent-profiles]: https://hermes-agent.nousresearch.com/docs/user-guide/profiles
[stone-pickaxe]: https://minecraft.wiki/w/Stone_Pickaxe
[tick]: https://minecraft.wiki/w/Tick
[protocol]: https://minecraft.wiki/w/Java_Edition_protocol
[crafting]: https://minecraft.wiki/w/Crafting
[cobbled-deepslate]: https://minecraft.wiki/w/Cobbled_Deepslate
[mob]: https://minecraft.wiki/w/Mob
[creeper]: https://minecraft.wiki/w/Creeper
[birch]: https://minecraft.wiki/w/Birch
[oak]: https://minecraft.wiki/w/Oak
[forest]: https://minecraft.wiki/w/Forest
