/**
 * Prebuild script — generates search-index.json and feed.xml.
 * Single source of truth: delegates to content.ts.
 * Run via: npx tsx scripts/prebuild.ts
 */
import { writeStaticFiles } from '../src/lib/content';

writeStaticFiles();
