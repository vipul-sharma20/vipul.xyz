---
id: 17
title: 'GSoC 2015: Coding Period (25th May &#8211; 7th June)'
date: 2015-06-07T20:27:00+00:00
author: Vipul
layout: single
permalink: /2015/06/gsoc-2015-coding-period-25th-may-7th-june.html
blogger_blog:
  - www.vipul.xyz
blogger_author:
  - Vipul Sharma
blogger_permalink:
  - /2015/06/gsoc-2015-coding-period-25th-may-7th.html
blogger_internal:
  - /feeds/3213730204187539187/posts/default/5852677008846058587
image: /wp-content/uploads/2015/06/suggestion.png
categories:
  - Uncategorized
---
<div dir="ltr" style="text-align: left;">
  The coding period started 2 weeks ago, from 25th May. In these two weeks I worked according to the timeline which I created during the community bonding period.</p> 
  
  <p>
    I worked on implementing Ajax based searching of duplicate tickets feature. Initially, I thought that it has to be created using Whoosh and JQuery from scratch but it turned out that something similar was implemented in <i>/+search </i>view. The<i> /+search </i>view<i> </i>has an Ajax based search form which displays content suggestions of various contenttypes, name term suggestions and content term suggestions along with informations like revision id, size, date of creation and file type. So, I used the code of<i> /+search</i> view for implementing duplicate ticket search. I made some changes in the existing code to allow it to search tickets and added few lines of code in <i>ajaxsearch.html</i> template to render duplicate ticket suggestions as the <i>/+search</i> view displayed some results which were not necessary as suggestions for duplicate tickets. Just a few lines of CSS were only required to keep the rendered result tidy.
  </p>
  
  <p>
    Obviously, I was not able to code it in one go as I don&#8217;t have much experience in working on large codebase. But my mentors were very helpful. They guided me, reviewed my code and gave me suggestion on how to reduce few redundant code segments. Their advice was really helpful as I reduced a lot of redundant code and now it looks pretty.<br />Codereview: <a href="https://codereview.appspot.com/236490043">https://codereview.appspot.com/236490043</a>
  </p>
  
  <p>
    This is how it looks:
  </p>
  
  <div style="clear: both; text-align: center;">
    <a href="http://138.68.252.233/wp-content/uploads/2015/06/suggestion.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="329" src="http://138.68.252.233/wp-content/uploads/2015/06/suggestion-300x155.png" width="640" /></a>
  </div>
  
  <p>
    I am currently working on file upload feature so that a user can upload any patch file, media or screenshot. I&#8217;ve implemented it by creating a new item for every file uploaded. I&#8217;ve few issues regarding how to deal with item_name and itemids which I am discussing with my mentor and I hope that I&#8217;ll figure it out very soon 🙂</div>
