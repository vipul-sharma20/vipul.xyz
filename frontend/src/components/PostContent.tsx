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
  }, [html]);

  return (
    <article
      ref={ref}
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
