---
title: "Getting to know Bengaluru's trees"
date: 2026-11-04
excerpt: "An interactive map of Bengaluru's tree census, and a closer look at what the data can tell us."
tags: [bengaluru, trees, maps, data]
author_profile: false
permalink: /2026/11/bengaluru-trees
draft: true
---

I built [Bengaluru trees](https://trees.vipul.xyz/) to explore the city's
tree census. Instead of only describing it here, I wanted to put the actual
map in the post. You can search and explore it below without opening another
tab.

## Explore the map

Try searching for a place you know or a tree species. Zoom into a neighbourhood
and select a tree to see its recorded details.

<iframe
  src="https://trees.vipul.xyz/?embed=1"
  title="Interactive map of Bengaluru's trees"
  data-tree-census-embed="map"
  width="100%"
  height="650"
  loading="lazy"
  allow="geolocation https://trees.vipul.xyz"
></iframe>

[Open the map in its own page](https://trees.vipul.xyz/).

## From individual trees to the census

The map is useful for looking around a particular place. The analytics view
looks at the census in aggregate: a way to move from individual records to
broader patterns, and to ask different questions of the same data.

A census is a record of what was surveyed, not a guarantee that every tree is
represented or that every entry is correct. Keep the coverage and methodology
in mind when comparing places or interpreting the charts.

## Explore the analytics

The charts below are interactive too. Use their controls to explore the data;
the embedded page expands with its contents so you can keep scrolling through
the article.

<iframe
  src="https://trees.vipul.xyz/analytics?embed=1"
  title="Bengaluru tree census analytics"
  data-tree-census-embed="analytics"
  width="100%"
  height="1000"
  loading="lazy"
></iframe>

[Open the analytics in its own page](https://trees.vipul.xyz/analytics).

## Data and source

The underlying census data is available through
[OpenCity](https://data.opencity.in/dataset/bengaluru-tree-census-data).
The app's [source code is on GitHub](https://github.com/vipul-sharma20/bengaluru-trees).

<!-- Draft: add the story behind the project, implementation notes, and any
specific findings after checking them against the data and methodology. -->
