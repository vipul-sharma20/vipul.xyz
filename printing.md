---
title: 3D Printing
layout: single
permalink: /threedee/
collection: printing
entries_layout: grid
classes: wide
author_profile: true
---

{% assign sorted = (site.printing | sort: 'date') | reverse %}
{% for item in sorted %}
<div class="grid__item">
 {% assign cover = item.url | split: "/" %}
  <article class="archive__item" itemscope="" itemtype="https://schema.org/CreativeWork">
      <div class="archive__item-teaser">
        <img src="{{ item.header.teaser }}" alt="">
      </div>
    <h2 class="archive__item-title" itemprop="headline">
        <a href="{{ item.url}}" rel="permalink">{{ item.title }}
</a>
    </h2>
    <p class="archive__item-excerpt" itemprop="description">{{ item.excerpt }}</p>
    <p class="portfolio_date"><i class="fa fa-calendar-alt fa-w-14 fa-fw" aria-hidden="true"></i> {{ item.date | date: "%b %d, %Y" }}</p>
    <div class="tag-container">
        {% for tag in item.tags %}
            <a href="{{ tag.url }}/tags/{{ tag }}/" class="tag">{{ tag }}</a>
        {% endfor %}
    </div>
  </article>
</div>
{% endfor %}
