import { marked } from 'marked';
import { notFound } from 'next/navigation';
import { User } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import MarkdownInteractive from '../../../components/MarkdownInteractive';
import PostFooterCTA from '../../../components/PostFooterCTA';

const COLLECTION_STYLES = {
  Life: {
    label: '文學日常',
    className: 'bg-amber-100 text-amber-700',
  },
  Travel: {
    label: '遊記攝影',
    className: 'bg-blue-100 text-blue-700',
  },
  Discussion: {
    label: '經濟討論',
    className: 'bg-green-100 text-green-700',
  },
};

function getCollectionStyle(collection) {
  return (
    COLLECTION_STYLES[collection] || {
      label: collection || '其他',
      className: 'bg-gray-100 text-gray-700',
    }
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: '找不到文章' };

  const title = post.title || '文章';
  const description = post.info || post.excerpt || '';
  const urlPath = `/posts/${post.slug}`;

  return {
    title,
    description,
    alternates: { canonical: urlPath },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: 'article',
      images: post.thumbnail ? [{ url: post.thumbnail }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.thumbnail ? [post.thumbnail] : undefined,
    },
  };
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  marked.setOptions({
    gfm: true,
    breaks: true,
    headerIds: false,
    mangle: false,
  });
  const html = marked.parse(post.contentResolved || post.content || '');

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {post.collection ? (() => {
            const style = getCollectionStyle(post.collection);
            return (
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${style.className}`}>
                {style.label}
              </span>
            );
          })() : null}
          {post.category ? (
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              {post.category}
            </span>
          ) : null}
          {post.series ? (
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-serif tracking-[0.18em] text-amber-800">
              {post.series}
            </span>
          ) : null}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-wide leading-snug md:leading-tight mb-4 text-[#333333]">
          {post.title}
        </h1>
        {post.info ? <p className="text-lg text-gray-600 leading-relaxed mb-2">{post.info}</p> : null}
        {(post.author || post.dateDisplay || post.date) ? (
          <p className="text-sm text-gray-500 flex items-center gap-2">
            {post.author ? (
              <>
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </>
            ) : null}
            {(post.dateDisplay || post.date) ? (
              <span>
                {post.author ? '・' : null}
                發表於{post.dateDisplay || post.date}
              </span>
            ) : null}
          </p>
        ) : null}
      </header>

      <article className="bg-white rounded-2xl shadow p-8 sm:p-10">
        <MarkdownInteractive html={html} />

        <PostFooterCTA collection={post.collection} />
      </article>
    </div>
  );
}

