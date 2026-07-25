import { getConfig } from '@/lib/config';
import AuthorSocials from './AuthorSocials';

export default function AuthorSidebar() {
  const config = getConfig();
  const { author } = config;

  return (
    <aside className="author-sidebar">
      <div className="author-sidebar-inner">
        <img
          src={author.avatar}
          alt={author.name}
          className="author-avatar"
          width={90}
          height={90}
        />
        <div className="author-name">{author.name}</div>
        <p className="author-bio">{author.bio}</p>
        <AuthorSocials />
      </div>
    </aside>
  );
}
