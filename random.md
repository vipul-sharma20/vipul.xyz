---
layout: single
title: "Scribbles"
permalink: /scribbles/
---

Random scribbles, anything not so refined stuff I want to write and share.

---

<div class="posts__scribbles">
   <!-- <h3 class="archive__subtitle">Recent Posts</h3> -->

   {% for item in site.posts %}
   {% if item.tags contains 'scribbles' %}
    <div class="list__item">
      <article class="archive__item" itemscope="" itemtype="https://schema.org/CreativeWork">
        <h2 class="archive__item-title" itemprop="headline">
            <a href="{{ item.url }}" rel="permalink">{{ item.title }}</a>
        </h2>
        <p class="post_date"><i class="fa fa-calendar-alt fa-w-14 fa-fw" aria-hidden="true"></i> {{ item.date | date: "%b %d, %Y" }}</p>
        {% assign publish_year = item.date | date: '%Y' %}
        {% if publish_year > '2018' %}
            <p class="archive__item-excerpt" itemprop="description">{{ item.excerpt }}</p>
        {% endif %}
        <div class="tag-container">
            {% for tag in item.tags %}
                <a href="{{ tag.url }}/tags/{{ tag }}/" class="tag">{{ tag }}</a>
            {% endfor %}
        </div>
        </article>
    </div>
    {% endif %}
    {% endfor %}
</div>

