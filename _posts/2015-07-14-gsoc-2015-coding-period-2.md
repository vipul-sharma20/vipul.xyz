---
id: 15
title: 'GSoC 2015: Coding Period'
date: 2015-07-14T15:43:00+00:00
author: Vipul
layout: single
permalink: /2015/07/gsoc-2015-coding-period-2.html
blogger_blog:
  - www.vipul.xyz
blogger_author:
  - Vipul Sharma
blogger_permalink:
  - /2015/07/gsoc-2015-coding-period.html
blogger_internal:
  - /feeds/3213730204187539187/posts/default/3402275135582334887
categories:
  - Uncategorized
---
<div dir="ltr" style="text-align: left;">
  Passed my mid term evaluations 🙂 Thanks to my mentors for all their support and guidance.</p> 
  
  <p>
    I&#8217;ve been working on implementing threaded comments in ticket modify view. Earlier the comments were created by creating message markups of all the comments and then concatenating them in the content part of the ticket item. In this way, editing/reply to comments was not possible.
  </p>
  
  <p>
    <b>New implementation:</b> <br />Each comment is a new item which refers to the itemid of the ticket in which it is created. In this way, it is easy to query all the comments of a particular ticket.
  </p>
  
  <p>
    Initially, I worked on non-threaded comments, then added a feature to reply to comments. It is similar to non-threaded comments but the difference is, there is a new field &#8220;reply_to&#8221; which stores the itemid of the comment to which a reply is made which is hence, stored in the &#8220;refers_to&#8221; field of the comment reply. After this, I tried to create a tree of all the comments in a ticket which included comments, replies of comments, replies of replies and so on.
  </p>
  
  <p>
    Something like :<br />&nbsp;[[<MoinMoin.storage.middleware.protecting.ProtectedRevision object at 0x7f907596d550>, [<MoinMoin.storage.middleware.protecting.ProtectedRevision object at 0x7f9075963d50>, []]]]
  </p>
  
  <p>
    The list above, is the tree of 1 single comment which has 1 reply and 1 reply to reply.
  </p>
  
  <p>
    Still more work has to be done to render the comments in threaded form in the UI. Also, there is some issues in the recursive function I wrote for parsing the comments/reply tree which I think can be fixed soon.
  </p>
  
  <p>
    CR: <a href="https://codereview.appspot.com/256840043/">https://codereview.appspot.com/256840043/</a>
  </p>
</div>
