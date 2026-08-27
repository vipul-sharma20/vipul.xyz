import fs from 'fs';
import path from 'path';
import toml from 'toml';

export interface SiteConfig {
  site: {
    title: string;
    description: string;
    url: string;
    language: string;
  };
  author: {
    name: string;
    bio: string;
    email: string;
    avatar: string;
    socials: Record<string, string>;
  };
  navigation: {
    links: Record<string, string>;
    /** Path -> symbol, for nav items shown as a glyph rather than a word. */
    glyphs?: Record<string, string>;
  };
  content: {
    content_dir: string;
    assets_dir: string;
    posts_per_page: number;
    default_author_profile: boolean;
  };
  theme: {
    default_theme: string;
    default_font: string;
  };
  build: {
    site_url: string;
    search_body_limit: number;
  };
  analytics?: {
    plausible_domain?: string;
    plausible_script?: string;
  };
}

let _config: SiteConfig | null = null;

export function getConfig(): SiteConfig {
  // config.toml is read through fs, so it is not part of the dev server's module
  // graph and editing it triggers no reload. Skip the cache in development so
  // changes land on refresh, the same way content.ts handles markdown.
  if (_config && process.env.NODE_ENV !== 'development') return _config;

  const configPath = path.join(process.cwd(), '..', 'config.toml');
  const raw = fs.readFileSync(configPath, 'utf-8');
  _config = toml.parse(raw) as SiteConfig;
  return _config;
}
