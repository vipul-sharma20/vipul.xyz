'use client';

import { useEffect, useRef } from 'react';

interface PostContentProps {
  html: string;
}

export default function PostContent({ html }: PostContentProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const analyticsFrames = root.querySelectorAll<HTMLIFrameElement>(
      'iframe[data-tree-census-embed="analytics"]',
    );

    // The analytics page grows as charts and filters change. Only the matching
    // embedded window may resize its own frame, never another post element.
    const resizeAnalytics = (event: MessageEvent) => {
      if (event.data?.type !== 'tree-census:resize'
        || typeof event.data.height !== 'number'
        || !Number.isFinite(event.data.height)
        || event.data.height <= 0) return;

      for (const frame of analyticsFrames) {
        if (event.source === frame.contentWindow
          && event.origin === new URL(frame.src).origin) {
          frame.style.height = `${Math.ceil(event.data.height)}px`;
        }
      }
    };
    window.addEventListener('message', resizeAnalytics);

    // History restores can load the child before this listener is ready.
    // Ask for its current height rather than waiting for another chart change.
    const requestAnalyticsSize = () => {
      for (const frame of analyticsFrames) {
        frame.contentWindow?.postMessage(
          { type: 'tree-census:request-resize' },
          new URL(frame.src).origin,
        );
      }
    };
    window.addEventListener('pageshow', requestAnalyticsSize);
    for (const frame of analyticsFrames) {
      frame.addEventListener('load', requestAnalyticsSize);
    }

    // The app defaults height notifications to the published blog. Local and
    // portal previews must name their own origin without editing the draft.
    if (window.location.origin !== 'https://vipul.xyz') {
      for (const frame of analyticsFrames) {
        const src = new URL(frame.src);
        if (src.searchParams.get('parentOrigin') !== window.location.origin) {
          src.searchParams.set('parentOrigin', window.location.origin);
          // Cancel a pending lazy navigation before replacing its target URL.
          frame.loading = 'eager';
          frame.src = src.href;
        }
      }
    }
    requestAnalyticsSize();

    // Execute any script tags in the rendered HTML
    const scripts = root.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    // Instagram embeds
    const win = window as unknown as Record<string, { Embeds?: { process: () => void } }>;
    if (root.querySelector('.instagram-media') && !win.instgrm) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    } else if (win.instgrm?.Embeds?.process) {
      win.instgrm.Embeds.process();
    }

    return () => {
      window.removeEventListener('message', resizeAnalytics);
      window.removeEventListener('pageshow', requestAnalyticsSize);
      for (const frame of analyticsFrames) {
        frame.removeEventListener('load', requestAnalyticsSize);
      }
    };
  }, [html]);

  return (
    <article
      ref={ref}
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
