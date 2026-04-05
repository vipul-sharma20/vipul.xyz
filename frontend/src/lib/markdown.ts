import MarkdownIt from 'markdown-it';
import { createHighlighter, type Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light'],
      langs: [
        'javascript', 'typescript', 'python', 'bash', 'shell',
        'json', 'yaml', 'html', 'css', 'markdown', 'ruby',
        'go', 'rust', 'sql', 'dockerfile', 'plaintext',
      ],
    });
  }
  return highlighterPromise;
}

function preprocessJekyllSyntax(content: string): string {
  // Replace Jekyll/Liquid template variables
  content = content.replace(/\{\{\s*site\.baseurl\s*\}\}/g, '');
  content = content.replace(/\{\{\s*site\.url\s*\}\}/g, '');
  return content;
}

function preprocessJekyllIncludes(content: string): string {
  // Convert {% include article-image.html src="..." alt="..." position="..." caption="..." %}
  content = content.replace(
    /\{%\s*include\s+article-image\.html\s+(.*?)%\}/g,
    (_match: string, attrs: string) => {
      const src = attrs.match(/src="([^"]*)"/)?.[1] || '';
      const alt = attrs.match(/alt="([^"]*)"/)?.[1] || '';
      const position = attrs.match(/position="([^"]*)"/)?.[1] || 'center';
      const caption = attrs.match(/caption="([^"]*)"/)?.[1] || '';
      const figcaption = caption ? `\n  <figcaption>${caption}</figcaption>` : '';
      return `<figure class="article-image article-image-${position}">
  <img src="${src}" alt="${alt}" loading="lazy" />${figcaption}
</figure>`;
    }
  );

  // Convert {% include image.html url="..." alt="..." size="..." caption="..." %}
  content = content.replace(
    /\{%\s*include\s+image\.html\s+(.*?)%\}/g,
    (_match: string, attrs: string) => {
      const url = attrs.match(/url="([^"]*)"/)?.[1] || '';
      const alt = attrs.match(/alt="([^"]*)"/)?.[1] || '';
      const size = attrs.match(/size="([^"]*)"/)?.[1] || 'center';
      const caption = attrs.match(/caption="([^"]*)"/)?.[1] || '';
      const positionClass = size === 'small' ? 'small' : size === 'full' ? 'full' : 'center';
      const figcaption = caption ? `\n  <figcaption>${caption}</figcaption>` : '';
      return `<figure class="article-image article-image-${positionClass}">
  <img src="${url}" alt="${alt}" loading="lazy" />${figcaption}
</figure>`;
    }
  );

  return content;
}

export async function renderMarkdown(content: string): Promise<string> {
  const highlighter = await getHighlighter();

  // Pre-process Jekyll syntax before markdown rendering
  content = preprocessJekyllSyntax(content);
  content = preprocessJekyllIncludes(content);

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  // Enable tables (built-in)
  md.enable('table');

  // Custom code block renderer using Shiki
  md.options.highlight = (code: string, lang: string) => {
    const language = lang || 'plaintext';
    try {
      const loadedLangs = highlighter.getLoadedLanguages();
      if (loadedLangs.includes(language as never)) {
        return highlighter.codeToHtml(code, {
          lang: language,
          theme: 'github-light',
        });
      }
    } catch {
      // fall through to default
    }
    // Fallback: escape and wrap in pre/code
    const escaped = md.utils.escapeHtml(code);
    return `<pre><code class="language-${language}">${escaped}</code></pre>`;
  };

  let html = md.render(content);

  // GitHub-style callouts: > [!NOTE], > [!TIP], > [!IMPORTANT], > [!WARNING], > [!CAUTION]
  // markdown-it renders these as <blockquote>\n<p>[!TYPE]\ncontent</p>\n</blockquote>
  const ghCalloutMap: Record<string, string> = {
    'NOTE': 'notice-info',
    'TIP': 'notice-success',
    'IMPORTANT': 'notice',
    'WARNING': 'notice-warning',
    'CAUTION': 'notice-danger',
  };

  html = html.replace(
    /<blockquote>\s*\n?\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n?([\s\S]*?)<\/p>\s*\n?\s*<\/blockquote>/g,
    (_, type: string, content: string) => {
      const className = ghCalloutMap[type] || 'notice';
      const label = type.charAt(0) + type.slice(1).toLowerCase();
      return `<div class="${className}"><p class="callout-title">${label}</p><p>${content.trim()}</p></div>`;
    }
  );

  // Kramdown-style notice blocks: {: .notice--info} (backward compat)
  // Note: typographer converts -- to – (en dash), so match both
  // Case 1: {: .notice} appears AFTER the closing tag
  html = html.replace(
    /(<(?:p|blockquote|div|ul|ol)[^>]*>[\s\S]*?<\/(?:p|blockquote|div|ul|ol)>)\s*\n?\{:\s*\.notice(?:(?:--|–)(info|success|warning|danger))?\s*\}/g,
    (_, element: string, type: string) => {
      const className = type ? `notice-${type}` : 'notice';
      return `<div class="${className}">${element}</div>`;
    }
  );
  // Case 2: {: .notice} is INSIDE the <p> tag (markdown-it inlines it)
  // Use [^]* that won't cross </p> boundaries
  html = html.replace(
    /<p>([^<]*(?:<(?!\/p>)[^<]*)*)\n?\{:\s*\.notice(?:(?:--|–)(info|success|warning|danger))?\s*\}<\/p>/g,
    (_, content: string, type: string) => {
      const className = type ? `notice-${type}` : 'notice';
      return `<div class="${className}"><p>${content.trim()}</p></div>`;
    }
  );

  return html;
}
