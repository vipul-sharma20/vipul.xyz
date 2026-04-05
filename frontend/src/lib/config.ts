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
    rss_limit: number;
    search_body_limit: number;
  };
  analytics?: {
    plausible_domain?: string;
    plausible_script?: string;
  };
}

let _config: SiteConfig | null = null;

export function getConfig(): SiteConfig {
  if (_config) return _config;

  const configPath = path.join(process.cwd(), '..', 'config.toml');
  const raw = fs.readFileSync(configPath, 'utf-8');
  _config = toml.parse(raw) as SiteConfig;
  return _config;
}
