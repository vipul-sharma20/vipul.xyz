import type { Metadata } from 'next';
import { Literata, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CommandSearch from '@/components/CommandSearch';
import ThemeProvider from '@/components/ThemeProvider';
import DevPanel from '@/components/DevPanel';
import { getConfig } from '@/lib/config';
import '@/styles/globals.css';

const literata = Literata({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-literata',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-ibm-plex-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-ibm-plex-mono',
});

const config = getConfig();
const navLinks = Object.entries(config.navigation.links).map(([label, href]) => ({ label, href }));
const imageModalScript = `
(() => {
  if (window.__vipulImageModalSetup) {
    return;
  }
  window.__vipulImageModalSetup = true;

  const modal = document.getElementById('imageModal');
  const modalImage = document.getElementById('imageModalImage');
  const closeButton = document.getElementById('imageModalClose');
  const galleryModal = document.getElementById('galleryLightbox');
  const galleryImage = document.getElementById('galleryLightboxImage');
  const galleryCloseButton = document.getElementById('galleryLightboxClose');
  const galleryPrevButton = document.getElementById('galleryLightboxPrev');
  const galleryNextButton = document.getElementById('galleryLightboxNext');
  let previousOverflow = '';
  let pointerStart = null;
  let galleryItems = [];
  let galleryIndex = -1;

  if (!modal || !modalImage) {
    return;
  }

  function getTargetImage(target) {
    if (!(target instanceof Element)) return null;
    const image = target.closest('.prose img');
    if (!(image instanceof HTMLImageElement)) return null;
    if (image.closest('.instagram-media')) return null;
    return image;
  }

  function getGalleryTrigger(target) {
    if (!(target instanceof Element)) return null;
    const trigger = target.closest('.photo-grid .polaroid[data-lightbox-src]');
    return trigger instanceof HTMLElement ? trigger : null;
  }

  function closeModal() {
    modal.hidden = true;
    modalImage.removeAttribute('src');
    document.body.style.overflow = previousOverflow;
  }

  function openModal(target) {
    const src = typeof target === 'string' ? target : target && (target.currentSrc || target.src);
    if (!src) return;
    if (modal.hidden) {
      previousOverflow = document.body.style.overflow;
    }
    modalImage.src = src;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  window.openModal = openModal;

  function renderGallery() {
    if (!galleryModal || !galleryImage || galleryIndex < 0 || galleryIndex >= galleryItems.length) {
      return;
    }
    const current = galleryItems[galleryIndex];
    const src = current.dataset.lightboxSrc;
    const alt = current.dataset.lightboxAlt || '';
    if (!src) return;

    galleryImage.src = src;
    galleryImage.alt = alt;
    galleryModal.hidden = false;
    document.body.style.overflow = 'hidden';

    if (galleryPrevButton) {
      galleryPrevButton.hidden = galleryIndex === 0;
    }
    if (galleryNextButton) {
      galleryNextButton.hidden = galleryIndex === galleryItems.length - 1;
    }
  }

  function openGallery(trigger) {
    if (!galleryModal || !galleryImage) return;
    const grid = trigger.closest('.photo-grid');
    if (!grid) return;
    galleryItems = Array.from(grid.querySelectorAll('.polaroid[data-lightbox-src]'));
    galleryIndex = galleryItems.indexOf(trigger);
    if (galleryIndex === -1) return;

    previousOverflow = document.body.style.overflow;
    renderGallery();
  }

  function closeGallery() {
    if (!galleryModal || !galleryImage) return;
    galleryModal.hidden = true;
    galleryImage.removeAttribute('src');
    document.body.style.overflow = previousOverflow;
  }

  function showPrevGalleryImage() {
    if (galleryIndex <= 0) return;
    galleryIndex -= 1;
    renderGallery();
  }

  function showNextGalleryImage() {
    if (galleryIndex >= galleryItems.length - 1) return;
    galleryIndex += 1;
    renderGallery();
  }

  document.addEventListener('pointerdown', (event) => {
    const image = getTargetImage(event.target);
    if (!image) {
      pointerStart = null;
      return;
    }
    pointerStart = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      image,
    };
  }, true);

  document.addEventListener('pointerup', (event) => {
    if (!pointerStart || pointerStart.pointerId !== event.pointerId) return;
    const moved = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
    const image = getTargetImage(event.target) || pointerStart.image;
    pointerStart = null;
    if (!image || moved > 10) return;
    event.preventDefault();
    openModal(image);
  }, true);

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target === modal || target === closeButton || target.closest('#imageModalClose')) {
      event.preventDefault();
      closeModal();
      return;
    }

    if (target === galleryModal || target === galleryCloseButton || target.closest('#galleryLightboxClose')) {
      event.preventDefault();
      closeGallery();
      return;
    }

    if (target === galleryPrevButton || target.closest('#galleryLightboxPrev')) {
      event.preventDefault();
      event.stopPropagation();
      showPrevGalleryImage();
      return;
    }

    if (target === galleryNextButton || target.closest('#galleryLightboxNext')) {
      event.preventDefault();
      event.stopPropagation();
      showNextGalleryImage();
      return;
    }

    const image = getTargetImage(target);
    if (image) {
      event.preventDefault();
      openModal(image);
      return;
    }

    const galleryTrigger = getGalleryTrigger(target);
    if (!galleryTrigger) return;
    event.preventDefault();
    openGallery(galleryTrigger);
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
    if (event.key === 'Escape' && galleryModal && !galleryModal.hidden) {
      closeGallery();
    }
    if (event.key === 'ArrowLeft' && galleryModal && !galleryModal.hidden) {
      showPrevGalleryImage();
    }
    if (event.key === 'ArrowRight' && galleryModal && !galleryModal.hidden) {
      showNextGalleryImage();
    }
  });
})();
`;

export const metadata: Metadata = {
  title: {
    default: config.site.title,
    template: `%s | ${config.site.title}`,
  },
  description: config.site.description,
  metadataBase: new URL(config.site.url || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/favicon.ico?v=logo', sizes: 'any' },
      { url: '/favicon-16x16.png?v=logo', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=logo', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png?v=logo',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={config.site.language || 'en'} className={`${literata.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        {config.analytics?.plausible_domain && (
          <script
            defer
            data-domain={config.analytics.plausible_domain}
            src={config.analytics.plausible_script || 'https://plausible.io/js/script.js'}
          />
        )}
      </head>
      <body>
        <ThemeProvider>
          <CommandSearch />
          <DevPanel />
          <div className="site-wrapper">
            <Nav links={navLinks} />
            <main className="site-main">
              {children}
            </main>
            <Footer />
          </div>
          <div id="imageModal" className="image-modal-overlay" hidden>
            <button id="imageModalClose" className="image-modal-close" aria-label="Close image modal">&times;</button>
            <img id="imageModalImage" className="image-modal-img" alt="" />
          </div>
          <div id="galleryLightbox" className="lightbox-overlay" hidden>
            <button id="galleryLightboxClose" className="lightbox-close" aria-label="Close gallery lightbox">&times;</button>
            <button id="galleryLightboxPrev" className="lightbox-nav lightbox-prev" aria-label="Previous image">&#8249;</button>
            <img id="galleryLightboxImage" className="lightbox-image" alt="" />
            <button id="galleryLightboxNext" className="lightbox-nav lightbox-next" aria-label="Next image">&#8250;</button>
          </div>
        </ThemeProvider>
        <script dangerouslySetInnerHTML={{ __html: imageModalScript }} />
      </body>
    </html>
  );
}
