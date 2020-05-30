---
id: 14
title: 'GSoC 2015: Coding Period'
date: 2015-08-04T13:26:00+00:00
author: Vipul
layout: single
permalink: /2015/08/gsoc-2015-coding-period.html
blogger_blog:
  - www.vipul.xyz
blogger_author:
  - Vipul Sharma
blogger_permalink:
  - /2015/08/gsoc-2015-coding-period.html
blogger_internal:
  - /feeds/3213730204187539187/posts/default/3342135287362566118
image: /wp-content/uploads/2015/08/advanced.png
categories:
  - Uncategorized
---
<div dir="ltr" style="text-align: left;">
  I&#8217;ve been working on implementing advanced search feature to filter tickets based on its metadata like effort, severity, difficulty, priority, author, tags and assignee. In this way a user can filter tickets based on specific requirements by filling the advanced search form.<br />For this I created a new view:<i> /+tickets/query </i>which contains a form for searching tickets.</p> 
  
  <p>
    Screenshot:
  </p>
  
  <div style="clear: both; text-align: center;">
    <a href="http://138.68.252.233/wp-content/uploads/2015/08/advanced.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="339" src="http://138.68.252.233/wp-content/uploads/2015/08/advanced-300x160.png" width="640" /></a>
  </div>
  
  <p>
    CR: <a href="https://codereview.appspot.com/256230043">https://codereview.appspot.com/256230043</a>
  </p>
  
  <p>
    It still requires some UI improvements which I&#8217;ll finish it soon.
  </p>
  
  <p>
    I&#8217;ve also been improving the implementation of comment mechanism in ticket modify view.<br />The new implementation now supports markdown syntax. A user can reply to comments and also new comment is automatically posted if any metadata is updated.<br />For eg: if effort field is changed from None to 3, a comment will be posted as &#8220;Update: Effort changed from None to 3&#8221; which will be like any other comment.
  </p>
  
  <p>
    Screenshot:
  </p>
  
  <div style="clear: both; text-align: center;">
    <a href="http://138.68.252.233/wp-content/uploads/2015/08/comments.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" height="340" src="http://138.68.252.233/wp-content/uploads/2015/08/comments-300x160.png" width="640" /></a>
  </div>
  
  <p>
    CR: <a href="https://codereview.appspot.com/256840043/">https://codereview.appspot.com/256840043/</a></div>
