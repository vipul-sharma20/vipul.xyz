---
title: "Bengaluru Trees"
date: 2026-11-05
excerpt: "I made a map-based explorer and analytics for Bengaluru's tree census"
tags: [bengaluru, trees, visualization]
author_profile: false
permalink: /2026/11/bengaluru-trees
---

You can also view this at [trees.vipul.xyz][trees]. This blog post has more
content + some background on how it came about. You can visit/share the website
directly if you want to skip all that.
<br></br>
LLM was heavily used to write code (source [here][bengaluru-trees]) &
visualizations but not for any content writing or refining.
{: .notice--info}

I made [trees.vipul.xyz][trees], a map-based explorer and analytics for
Bengaluru's July 2026 BBMP tree census.

---

I was interested in knowing more about the trees of Bengaluru. I searched about
it and found a webpage about prominant [trees of Bengaluru by IISC][trees-archive] 
which I found interesting.

I notice in almost all the parks of Bengaluru each tree (almost all) of them
are marked/painted with codes to ID them like in the image below.

<figure style="text-align:center">
  <img
    src="https://images.vipul.xyz/uploads/b9f97972f9d05029.webp"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Photo of a tree ID/label from a park in Indiranagar.</figcaption>
</figure>

I tried to find about there was any formal census data of all these marked
trees and was I able to find a census dataset at [OpenCity][opencity]. However,
in the data I couldn't find this particular tree ID or any other tree marked
with similar pattern of IDs. The census had different way to ID trees. For
example, `GN8535GA1RAK001` is one of the example of how tree IDs are stored in
the dataset. _(This tree ID is BTW for the [Pink Trumpet Tree][trumpet-tree]
that we all love)_.

For the image above, I could interpret it as ID 371 for a tree in _Hoysala
Nagar_. But I am not too sure.

---

Since I quit my job in October, every morning I go to [Cubbon Park][cubbon-park], walk around a bit,
sit on a bench and do nothing for some time. The sounds are nice, topped with
some early morning honking.

I carry my tablet along with me to write my thoughts, respond to
emails/messages from the previous day and some vibe-coding. I stay there doing
this until I feel like having a second round of breakfast which is usually
around 11:00 AM.

During one of these Cubbon Park sessions, I decided to use the census dataset
by [OpenCity][opencity] and build a map-based explorer and probably some
analytics.

## Explore

Below is a map view of Bengaluru with all the trees from the census data mapped
to their reported coordinates. You can try searching for a place you know or a
tree species. 

I wanted to keep it more searchable by how they are colloquially called but it
is what is for now. I'll need some time and help to do it.

A note that the census data seems to be not 100% complete/accurate as you'll
see in the coverage per area visualization in the later sections. There are
some areas where you won't see any/much coverage or areas that may have trees
but their species as unidentified.

Photographs of trees were not available in the census data. They are sourced
from multiple sources which had permissable licensing. Appropriate attribution
and license information have been specified. So they are reference images, not
photographs of the individual mapped tree or verification of the census
identification.

<iframe
  src="https://trees.vipul.xyz/?embed=1"
  title="Interactive map of Bengaluru's trees"
  data-tree-census-embed="map"
  width="100%"
  height="1000"
  scrolling="no"
  loading="lazy"
  allow="geolocation https://trees.vipul.xyz"
></iframe>

[Open the map in its own page](https://trees.vipul.xyz/).

The census data didn't have Cubbon Park, Lalbagh (and other) park's data. I
would've felt bad if I didn't add anything about Cubbon Park in this
exploration while I got inspired and literally started building it sitting on a
bench there.

Fortunately, there is a report submitted by [MovingUp Products (FlippAR)][flippar] 
(_who btw make amazing postcards, highly recommended_) in May 2022, 
[Tree Mapping & Inventory Project][cubbon-report]. I have used this report to extract
information about Cubbon Park's trees. Since it was not a detailed dataset as
OpenCity one, when you go to Cubbon Park on the map, it gives you a summary
view. I couldn't find any equivalent study about Lalbagh so there's nothing
about it.


## Analytics

Below is some region based aggregation of the data so you could see which
region report how many trees and kind of species. Again, not that the census is
not complete and may have incomplete and inaccurate information.

You can click on individual regions and look at some stats.

<iframe
  src="https://trees.vipul.xyz/analytics?embed=1"
  title="Bengaluru tree census analytics"
  data-tree-census-embed="analytics"
  width="100%"
  height="1000"
  scrolling="no"
  loading="lazy"
></iframe>

[Open the analytics in its own page](https://trees.vipul.xyz/analytics).

## Data and source

- The underlying census data is available through
[OpenCity](https://data.opencity.in/dataset/bengaluru-tree-census-data).
- The app's [source code is on GitHub](https://github.com/vipul-sharma20/bengaluru-trees).
- May 2022, Cubbon Park tree mapping report can be found [here][cubbon-report].
- Thanks to the photographers and contributors who made their images
  available through [Wikimedia Commons](https://commons.wikimedia.org/),
  [iNaturalist](https://www.inaturalist.org/) and the
  [Royal Botanic Gardens, Kew](https://www.kew.org/).
  Images are used under their respective Creative Commons licences
  (CC BY or CC BY-SA) or CC0 public-domain dedications.
  Individual credits, source links and licence details are available
  in each photo’s viewer.

---

## Postscript

1. I would like to know how to volunteer if possible for this census activity.
   So anyone reading this who knows about it, please [let me know][contact].
2. I need help with getting the colloquial names of the trees so that the
   search experience is better. I don't know how to go about it.
3. Until writing this I didn't know that MovingUp Products who did Cubbon
   Park's tree mapping was FlippAR. I know about them through their postcards
   made for [Indian Music Museum][museum].

<figure style="text-align:center">
  <img
    src="https://images.vipul.xyz/bengaluru-trees/tablet-in-the-park-395ebf144e5950c3.webp"
    alt=""
    style="max-width:700px;"
    loading="lazy"
  />
  <figcaption>Proof of work (Cubbon Park)</figcaption>
</figure>




[trees]: https://trees.vipul.xyz
[bengaluru-trees]: https://github.com/vipul-sharma20/bengaluru-trees
[cubbon-park]: https://en.wikipedia.org/wiki/Cubbon_Park
[opencity]: https://data.opencity.in/dataset/bengaluru-tree-census-data
[trees-archive]: https://web.archive.org/web/20250818222309/https://wgbis.ces.iisc.ac.in/biodiversity/pubs/ETR/ETR75/annex3.html
[trumpet-tree]: https://en.wikipedia.org/wiki/Tabebuia_rosea
[flippar]: https://shops.arpostcards.in/
[cubbon-report]: https://cubbonpark.in/tree-info/assets/report/Tree_Mapping_Report_Cubbon_Park_compressed.pdf
[contact]: https://vipul.xyz/about/#contact
[museum]: https://indianmusicexperience.org/
