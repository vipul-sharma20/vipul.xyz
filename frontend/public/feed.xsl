<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <title><xsl:value-of select="/rss/channel/title"/> — RSS Feed</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            max-width: 680px;
            margin: 2em auto;
            padding: 0 1.25em;
            background: #faf8f5;
            color: #2d2a26;
            line-height: 1.6;
          }
          h1 { font-size: 22px; margin-bottom: 0.2em; }
          .subtitle { color: #6b6560; font-size: 14px; margin-bottom: 2em; }
          .item { margin-bottom: 1.5em; }
          .item-title { font-size: 17px; font-weight: 600; }
          .item-title a { color: #a0522d; text-decoration: none; }
          .item-title a:hover { text-decoration: underline; }
          .item-date { font-size: 13px; color: #6b6560; }
          .item-desc { font-size: 15px; color: #6b6560; margin-top: 0.2em; }
          .info { background: #f0ece6; border-left: 3px solid #ddd5cb; padding: 0.75em 1em; margin-bottom: 2em; font-size: 14px; color: #6b6560; }
          .info a { color: #a0522d; }
        </style>
      </head>
      <body>
        <h1><xsl:value-of select="/rss/channel/title"/></h1>
        <p class="subtitle"><xsl:value-of select="/rss/channel/description"/></p>
        <div class="info">
          This is an RSS feed. Copy the URL into your feed reader to subscribe.
          <a href="{/rss/channel/link}">Visit the blog →</a>
        </div>
        <xsl:for-each select="/rss/channel/item">
          <div class="item">
            <div class="item-title">
              <a href="{link}"><xsl:value-of select="title"/></a>
            </div>
            <div class="item-date"><xsl:value-of select="pubDate"/></div>
            <xsl:if test="description != ''">
              <div class="item-desc"><xsl:value-of select="description"/></div>
            </xsl:if>
          </div>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
