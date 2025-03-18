---
layout: single
title: "Journal"
collection: journal
permalink: /journal/
---

My public journal. I post here every week.

I have stopped, weekly journals and started writing small, rough notes / posts
about my day-to-day work, learnings etc. at [https://til.vipul.xyz][til]. This
should act as a journal or a way to catchup on the latest stuff I am doing.
{:.notice--info}

---

{% assign sorted = (site.journal | sort: 'date') | reverse %}

<div class = "posts__scribbles">
{% for item in sorted %}
<div class="list__item">
  <article class="archive__item" itemscope="" itemtype="https://schema.org/CreativeWork">
    <h2 class="archive__item-title" itemprop="headline">
        <a href="{{ item.url }}" rel="permalink">{{ item.title }}</a>
    </h2>
    </article>
</div>
{% endfor %}
</div>

[til]: https://til.vipul.xyz
