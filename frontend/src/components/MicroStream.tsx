import Link from 'next/link';
import MicroMedia from './MicroMedia';
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
}

export default function MicroStream({ notes }: MicroStreamProps) {
  if (notes.length === 0) {
    return <p className="micro-empty">Nothing here yet.</p>;
  }

  let lastMonth: string | null = null;

  return (
    <ol className="micro-stream">
      {notes.map((note) => {
        const month = formatMicroMonth(note.date);
        const showMonth = month !== lastMonth;
        lastMonth = month;

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
      })}
    </ol>
  );
}
