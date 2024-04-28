---
layout: single
title: "Fixing this blog"
excerpt: ""
permalink: "/random/fixing-this-blog/"
author_profile: true
tags: [100daystooffload]
date: 2024-03-27T01:00:00+00:00
type: post
---

After posting about taking up the [100DaysToOffload][100DaysToOffload] I want
to make sure that my writing experience is smooth, the blog has the right posts
at the right place, navigating through content is easy, etc.

I will be working on the blogging experience stuff for a few days after work to
make it the way I would find it comfortable to post.

---

### Moving to GitHub Actions

I could see that clicking on tags would not lead to anywhere. I saw that the
default build workflow was missing building of tags and related pages. I
decided to just move to custom GitHub Action to do the site build and that
seems to have solved the problem. I wanted it to be straightforward to look at
all the 100DaysToOffload posts easily and now it works fine.

The [tags][tags] page shows all the posts associated by all the tags available
(a lot of my old posts don't have any tags linked) and all the posts associated
to any particular tag can be found by `/tags/<tag-name>/`. For example, all
100DaysToOffload posts can be found [here][100DaysToOffload-tag] ("scribble"
type posts are not showing up here as of now and this requries a fix).

### Navigation

I don't like how the blog is structured right now. It has "Posts", that are
supposed to be more refined. There's a "Scribbles" page that is supposed to
have not so refined content where TBH, some of it is better content than the
ones in the main page and the same goes for the "Journal" page. I had added
"Journal" page to document weekly about learnings or some work stuff that I
could share. Again, some of the content there is still way better than some of
the main page posts.

I would like to structure the entire thing better. Maybe just "Posts", "Music"
& "Journal".


[100DaysToOffload]: https://vipul.xyz/2023/07/100-days-to-offload
[tags]: https://vipul.xyz/tags/
[100DaysToOffload-tag]: https://vipul.xyz/tags/100daystooffload/
