import Link from 'next/link';
import MicroMedia from './MicroMedia';
import MicroLoadMore from './MicroLoadMore';
import { formatMicroMonth, formatMicroTimestamp, type MicroImage } from '@/lib/content';

export interface StreamEntry {
  slug: string;
  url: string;
  date: string;
  tags: string[];
  html: string;
  images: MicroImage[];
}

interface MicroStreamProps {
  notes: StreamEntry[];
  /** URL of the next page of older notes, or null on the last page. */
  older?: string | null;
}

export default function MicroStream({ notes, older = null }: MicroStreamProps) {
  if (notes.length === 0) {
    return <p className="micro-empty">Nothing here yet.</p>;
  }

  const months = notes.map(note => formatMicroMonth(note.date));

  const items = notes.map((note, i) => {
    const month = months[i];
    const showMonth = month !== months[i - 1];

    return (
      <li key={note.slug} className="note">
        {showMonth && <div className="micro-month-marker">{month}</div>}
        <div className="micro-head">
          <Link href={note.url} className="micro-time">
            <time dateTime={note.date}>{formatMicroTimestamp(note.date)}</time>
          </Link>
          {note.tags.map(tag => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`} className="tag-capsule-sm">
              {tag}
            </Link>
          ))}
        </div>
        <div className="micro-body" dangerouslySetInnerHTML={{ __html: note.html }} />
        <MicroMedia images={note.images} />
      </li>
    );
  });

  return (
    <MicroLoadMore older={older} lastMonth={months[months.length - 1]}>
      {items}
    </MicroLoadMore>
  );
}
