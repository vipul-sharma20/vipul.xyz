---
layout: single
title: "Scribbles"
collection: random
permalink: /scribbles/
author_profile: true
---

Random scribbles, anything not so refined stuff I want to write and share.

---

{% assign sorted = (site.random | sort: 'date') | reverse %}

{% for item in sorted %}
<div class="list__item">
  <article class="archive__item" itemscope="" itemtype="https://schema.org/CreativeWork">
    <h2 class="archive__item-title" itemprop="headline">
        <a href="{{ item.url }}" rel="permalink">{{ item.title }}</a>
    </h2>
    </article>
</div>
{% endfor %}
