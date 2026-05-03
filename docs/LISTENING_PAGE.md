# /listening page — current build

Status as of 2026-05-03. The `/listening` page on vipul.xyz shows what bands I've been listening to over time. Data lives entirely outside this repo now; the page fetches it at runtime from `s3.vipul.xyz`.

## Pipeline

```
Spotify Web API (cron, hourly)
        │
        ▼
~/spotify-history/data/history.csv          (private, OVH disk only — track names + ms-precision timestamps)
        │
        ▼   aggregate.py
~/spotify-history/data/listening.json       (top-10 lastWeek + weekly timeline)
        │
        ▼   mc cp
s3.vipul.xyz/blog/listening.json            (public-anonymous, Cache-Control: public,max-age=300)
        │
        ▼   browser fetch on /listening
ListeningClient.tsx → JoyPlot
```

The full sync/aggregate/publish lives in [`spotify-history`](https://git.vipul.xyz) (separate repo). Cron runs on the OVH VPS at minute 5 of every hour:

```cron
5 * * * * /opt/spotify-history/sync-and-publish.sh >> /var/log/spotify-history/sync.log 2>&1
```

Spotify's `/me/player/recently-played` endpoint caps at the last 50 plays, so anything sooner than once-per-50-plays is fine. Hourly is comfortable.

## Files in this repo

```
frontend/src/app/listening/page.tsx             # server-component shell — title + intro + <ListeningClient />
frontend/src/components/listening/
  ListeningClient.tsx                           # client component: fetch s3.vipul.xyz/blog/listening.json, render JoyPlots
  JoyPlot.tsx                                   # hand-rolled SVG ridgeline; granularity prop = 'week' | 'day'
frontend/src/lib/
  chartPalettes.ts                              # 10 palette presets (mono-slate is current default)
  useChartPalette.ts                            # client hook reading localStorage + dev-panel events
frontend/src/components/DevPanel.tsx            # has a "Chart Palette" section, dev-only
```

No `data/` directory in this repo, no Last.fm fetcher, no build-time aggregator. Listening data is *not* committed — it lives on the OVH host (private) and on RustFS (public top-10 only).

## Public payload shape (`s3.vipul.xyz/blog/listening.json`)

```json
{
  "generatedAt": "2026-05-03T22:51:03.886Z",
  "lastWeek": {
    "range": ["2026-04-20", "2026-04-26"],
    "artists": ["..."],
    "days": [{ "date": "2026-04-20", "counts": { "Foo Fighters": 3 } }]
  },
  "timeline": {
    "artists": ["..."],
    "weeks": [{ "weekStart": "2025-04-28", "counts": { "Red Hot Chili Peppers": 4 } }]
  }
}
```

Top 10 artists per section, no totals, no factoids, no track names ever. Same shape that used to ship at build time.

## Page rendering

Server component (`page.tsx`) renders title + intro + `<ListeningClient />`. The client component fetches `https://s3.vipul.xyz/blog/listening.json` on mount. Loading state shows "Loading…"; error state shows the failure message. On success: `JoyPlot` for "Last week" (Mon–Sun before current week, day granularity) and "{firstYear}–{currentYear}" (week granularity).

`/listening` builds as a static page at deploy time (no listening data baked in); the chart only appears after JS runs and the fetch completes.

## Privacy / threat model

| Surface | Contents |
|---|---|
| Static HTML at `/listening` | Title + intro paragraph. **No chart data** — not in HTML, not in pre-rendered SVG. |
| Browser DevTools (Network tab) | One GET to `s3.vipul.xyz/blog/listening.json`: top 10 artists + per-week / per-day counts. No track names, no timestamps below day level. |
| `s3.vipul.xyz/blog/listening.json` (direct fetch) | Same as Network tab. |
| Public GitHub repo | **Nothing listening-related.** No raw data, no day-bucketed cache. |
| OVH disk (`/opt/spotify-history/data/history.csv`) | Per-play, with track names and ms-precision timestamps. **Private** — never published, never leaves OVH. |

What's not exposed:

- Track names — never reach RustFS or the browser.
- Long-tail artists below top 10 — never enter the public JSON.
- Spotify OAuth tokens — `.tokens.json` on OVH (mode 600).
- Last.fm — eliminated as a data source; no Last.fm API key, no scrobble exposure.

## CORS / caching

- RustFS `blog` bucket: `RUSTFS_CORS_ALLOWED_ORIGINS=*` (set on the container). Browser fetch from `vipul.xyz` works without extra config.
- `mc cp` sets `Cache-Control: public, max-age=300` per upload. Browser cache hits for 5 min; first miss after that is typically a cheap 304 revalidation.

## Updating the page

The blog deploy is **decoupled** from listening updates:

- **Listening data refresh** = cron on OVH replacing `s3.vipul.xyz/blog/listening.json`. No GitHub Actions, no rebuild. Visitors see new data within ~5 min (cache TTL).
- **Page code change** = normal `git push` to master → `deploy.yml` → GitHub Pages.

## Useful commands

```bash
# manually run a publish from OVH
ssh debian@139.99.124.221 'cd /opt/spotify-history && ./sync-and-publish.sh'

# check what's currently public
curl -sS https://s3.vipul.xyz/blog/listening.json | jq '.generatedAt, .timeline.artists'

# tail cron output
ssh debian@139.99.124.221 'tail -f /var/log/spotify-history/sync.log'

# dev server
cd frontend && npm run dev
```

## Design decisions worth knowing

- **Runtime fetch, not build-time bake.** Decouples blog deploys from listening updates. Static HTML stays empty until JS runs, which also keeps view-source clean.
- **OVH cron, not Mac/Pi.** Co-located with RustFS — uploads hit `127.0.0.1:39000` directly, no public hop. Always-on, no laptop sleep concerns.
- **Spotify direct, not Last.fm.** Eliminates Last.fm's privacy hole (its API exposes scrobbles regardless of profile-privacy toggle). Tradeoff: Spotify's recently-played endpoint doesn't expose `ms_played`, so we can't filter skipped tracks the way the Spotify export and Last.fm could. Counts are slightly inflated by skips on live data; acceptable noise.
- **Joy plot.** Most distinctive (looks like *Unknown Pleasures*); the visual intrusion of upper-row peaks tells the story of which artist mattered when.
- **Mono palette.** The site has one accent (warm sienna). Multi-color charts felt generic; mono-slate fits the typography-first aesthetic.
