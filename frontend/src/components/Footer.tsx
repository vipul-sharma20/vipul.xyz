import { getConfig } from '@/lib/config';

export default function Footer() {
  const config = getConfig();
  const { name, socials } = config.author;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      &copy; {year} {name} &middot;{' '}
      <a href="/feed.xml">RSS</a>
      {Object.entries(socials).map(([label, url]) => (
        <span key={label}>
          {' '}&middot;{' '}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {label.charAt(0).toUpperCase() + label.slice(1)}
          </a>
        </span>
      ))}
    </footer>
  );
}
