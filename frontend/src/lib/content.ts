import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getConfig } from './config';

const CONTENT_DIR = path.join(process.cwd(), '..', 'content');
const KNOWN_COLLECTIONS = new Set(['posts', 'music', 'printing', 'albums', 'journal', 'pages']);
const DATE_PREFIX_RE = /^\d{4}-\d{2}-\d{2}-/;

export interface ContentItem {
  slug: string;
  title: string;
  date: string | null;
  tags: string[];
  collection: string;
  excerpt: string;
  permalink: string | null;
  thumbnail: string | null;
  draft: boolean;
  meta: Record<string, unknown>;
  raw_markdown: string;
}

export interface PostListItem {
  slug: string;
  title: string;
  date: string | null;
  tags: string[];
  excerpt: string;
  permalink: string | null;
  thumbnail: string | null;
  collection: string;
}

export interface TagInfo {
  name: string;
  count: number;
}

export interface SearchEntry {
  slug: string;
  title: string;
  excerpt: string;
  collection: string;
  tags: string[];
  date: string | null;
  permalink: string | null;
  body: string;
}

function slugFromFilename(filename: string): string {
  const name = filename.replace(/\.md$/, '');
  return name.replace(DATE_PREFIX_RE, '');
}

function parseDate(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString();
  const str = String(value);
  try {
    const d = new Date(str);
    if (!isNaN(d.getTime())) return d.toISOString();
  } catch { /* ignore */ }
  return null;
}

function getAllMarkdownFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  function walk(d: string) {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.md')) results.push(full);
    }
  }
  walk(dir);
  return results;
}

function parseFile(filePath: string): ContentItem | null {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  const rel = path.relative(CONTENT_DIR, filePath);
  const parts = rel.split(path.sep);
  let collection = parts.length > 1 ? parts[0] : 'pages';
  if (!KNOWN_COLLECTIONS.has(collection)) collection = 'pages';

  const slug = slugFromFilename(path.basename(filePath));
  const title = (data.title as string) || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const date = parseDate(data.date);

  let tags: string[] = [];
  if (Array.isArray(data.tags)) tags = data.tags.map(String);
  else if (typeof data.tags === 'string') tags = data.tags.split(',').map(t => t.trim()).filter(Boolean);

  const excerpt = (data.excerpt as string) || '';

  const permalink = (data.permalink as string) || null;
  const thumbnail = (data.thumbnail as string) || null;
  const draft = Boolean(data.draft);

  // Collect remaining metadata
  const { title: _, date: _d, tags: _t, excerpt: _e, permalink: _p, thumbnail: _th, draft: _dr, status: _s, layout: _l, ...meta } = data;

  if (draft) return null;

  return {
    slug, title, date, tags, collection, excerpt,
    permalink, thumbnail, draft, meta, raw_markdown: content,
  };
}

// Cache the loaded content in module scope (persists across build-time calls)
let _cache: ContentItem[] | null = null;

function loadAll(): ContentItem[] {
  // In development, skip cache so content changes are picked up without restart
  if (_cache && process.env.NODE_ENV !== 'development') return _cache;
  const files = getAllMarkdownFiles(CONTENT_DIR);
  const items: ContentItem[] = [];
  for (const f of files) {
    try {
      const item = parseFile(f);
      if (item) items.push(item);
    } catch (e) {
      console.warn(`Failed to parse ${f}:`, e);
    }
  }
  _cache = items;
  return items;
}

function sortByDate<T extends { date: string | null }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });
}

function toListItem(item: ContentItem): PostListItem {
  return {
    slug: item.slug, title: item.title, date: item.date,
    tags: item.tags, excerpt: item.excerpt, permalink: item.permalink,
    thumbnail: item.thumbnail, collection: item.collection,
  };
}

// Public API

export function getPosts(): PostListItem[] {
  const all = loadAll();
  const posts = all.filter(i => i.collection === 'posts' && !i.tags.some(t => t.toLowerCase() === 'scribbles'));
  return sortByDate(posts).map(toListItem) as PostListItem[];
}

export function getScribbles(): PostListItem[] {
  const all = loadAll();
  const scribbles = all.filter(i => i.collection === 'posts' && i.tags.some(t => t.toLowerCase() === 'scribbles'));
  return sortByDate(scribbles).map(toListItem) as PostListItem[];
}

export function getPost(slug: string): ContentItem | undefined {
  return loadAll().find(i => i.collection === 'posts' && i.slug === slug);
}

export function getCollection(name: string): PostListItem[] {
  const items = loadAll().filter(i => i.collection === name);
  return sortByDate(items).map(toListItem) as PostListItem[];
}

export function getCollectionItems(name: string): ContentItem[] {
  const items = loadAll().filter(i => i.collection === name);
  return sortByDate(items);
}

export function getCollectionItem(collection: string, slug: string): ContentItem | undefined {
  return loadAll().find(i => i.collection === collection && i.slug === slug);
}

export function getPage(slug: string): ContentItem | undefined {
  return loadAll().find(i => i.collection === 'pages' && i.slug === slug);
}

export function getTags(): TagInfo[] {
  const all = loadAll();
  const tagMap = new Map<string, number>();
  for (const item of all) {
    for (const tag of item.tags) {
      const lower = tag.toLowerCase();
      tagMap.set(lower, (tagMap.get(lower) || 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getTagPosts(tag: string): PostListItem[] {
  const all = loadAll();
  const items = all.filter(i => i.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  return sortByDate(items).map(toListItem) as PostListItem[];
}

/**
 * Compute the URL path for a content item, matching Jekyll's URL structure.
 * - If permalink is set, use it
 * - Posts without permalink: /year/month/day/slug/
 * - Collections use their own prefix
 */
export function getUrlPath(item: ContentItem | PostListItem & { collection: string; permalink: string | null; date: string | null }): string {
  if (item.permalink) {
    // Normalize: strip trailing slash for consistency, but keep .html
    return item.permalink.replace(/\/$/, '') || '/';
  }

  if ('collection' in item && item.date) {
    const d = new Date(item.date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');

    switch (item.collection) {
      case 'posts':
        return `/${year}/${month}/${day}/${item.slug}`;
      case 'music':
        return `/music/${item.slug}`;
      case 'printing':
        return `/threedee/${item.slug}`;
      case 'albums':
        return `/gallery/${item.slug}`;
      case 'journal':
        return `/journal/${item.slug}`;
      case 'pages':
        return `/${item.slug}`;
    }
  }

  return `/${item.slug}`;
}

/**
 * Get all post URL paths as segment arrays for generateStaticParams.
 */
export function getAllPostPaths(): { slug: string[] }[] {
  const all = loadAll();
  const results: { slug: string[] }[] = [];

  for (const item of all) {
    if (item.collection !== 'posts') continue;
    const urlPath = getUrlPath(item);
    // Split path into segments, filter empty strings
    const segments = urlPath.replace(/^\//, '').replace(/\/$/, '').split('/');
    results.push({ slug: segments });
  }

  return results;
}

export function getPostByPath(segments: string[]): ContentItem | undefined {
  const all = loadAll();
  const targetPath = '/' + segments.join('/');

  for (const item of all) {
    if (item.collection !== 'posts') continue;
    const itemPath = getUrlPath(item);
    // Compare with and without trailing slash, and with .html
    if (itemPath === targetPath || itemPath === targetPath + '/' || itemPath + '/' === targetPath) {
      return item;
    }
  }

  // Fallback: try matching by slug (last segment)
  const slug = segments[segments.length - 1].replace(/\.html$/, '');
  return all.find(i => i.collection === 'posts' && i.slug === slug);
}

export function getAllSlugs(): { collection: string; slug: string; date: string | null; permalink: string | null }[] {
  return loadAll().map(i => ({ collection: i.collection, slug: i.slug, date: i.date, permalink: i.permalink }));
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function stripMarkdown(md: string): string {
  return md
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_~`]{1,3}/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\{[^}]*\}/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function getSearchIndex(): SearchEntry[] {
  return loadAll().map(i => ({
    slug: i.slug, title: i.title, excerpt: i.excerpt,
    collection: i.collection, tags: i.tags, date: i.date,
    permalink: i.permalink,
    body: stripMarkdown(i.raw_markdown).slice(0, 500),
  }));
}

export function generateRssFeed(): string {
  const config = getConfig();
  const siteUrl = config.build.site_url;
  const limit = config.build.rss_limit;
  const all = loadAll();
  const sorted = sortByDate(all).slice(0, limit);

  const items = sorted.map(item => {
    const link = getUrlPath(item);
    const pubDate = item.date ? new Date(item.date).toUTCString() : '';
    return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${siteUrl}${link}</link>
      <guid>${siteUrl}${link}</guid>
      <description>${escapeXml(item.excerpt || '')}</description>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${config.site.title}</title>
    <link>${siteUrl}</link>
    <description>${config.site.description}</description>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;
}

/**
 * Write static files (search index + RSS) to public/.
 * Called by the prebuild script before Next.js build.
 */
export function writeStaticFiles(): void {
  const publicDir = path.join(process.cwd(), 'public');
  fs.mkdirSync(publicDir, { recursive: true });

  const searchIndex = getSearchIndex();
  fs.writeFileSync(
    path.join(publicDir, 'search-index.json'),
    JSON.stringify(searchIndex)
  );
  console.log(`Generated search index with ${searchIndex.length} entries`);

  const rss = generateRssFeed();
  fs.writeFileSync(path.join(publicDir, 'feed.xml'), rss);
  console.log('Generated feed.xml');
}
