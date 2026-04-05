// Re-export types and functions from content engine
// This file exists for backward compatibility with components that import from '@/lib/api'
export type {
  ContentItem,
  PostListItem,
  TagInfo,
  SearchEntry as SearchResult,
} from './content';
