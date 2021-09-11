---
layout: single
title: "Journal"
collection: journal
permalink: /journal/
---

My public work journal.

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
