import { notFound } from 'next/navigation';
import { User } from 'lucide-react';
import { getAllPosts, getPostBySlug } from '../../../lib/posts';
import { parseMarkdownForCategory } from '../../../lib/markdownRenderers';
import MarkdownInteractive from '../../../components/MarkdownInteractive';
import VerticalScrollGallery from '../../../components/VerticalScrollGallery';
import PoetryPostContent from '../../../components/PoetryPostContent';
import PostFooterCTA from '../../../components/PostFooterCTA';

const COLLECTION_STYLES = {
  Life: {
    label: '文字日常',
    categoryTextClass: 'text-amber-800',
  },
  Travel: {
    label: '遊記攝影',
    categoryTextClass: 'text-blue-700',
  },
  Discussion: {
    label: '經濟討論',
    categoryTextClass: 'text-green-700',
  },
};

function getCollectionStyle(collection) {
  return (
    COLLECTION_STYLES[collection] || {
      label: collection || '其他',
      categoryTextClass: 'text-gray-600',
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

function hasTag(post, keyword) {
  const tags = post.tags ?? [];
  return tags.some((t) => String(t).includes(keyword));
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const category = post.category ? String(post.category).trim() : '';
  const isGalleryLayout = hasTag(post, '攝影') || category === '攝影集';
  const isPoetryLayout = hasTag(post, '詩文') || category === '新詩';
  const layoutType = isGalleryLayout ? '攝影集' : isPoetryLayout ? '新詩' : null;

  const { html, blocks } = parseMarkdownForCategory(
    post.contentResolved || post.content || '',
    layoutType
  );

  // 攝影集模式：tag 含「攝影」或 category 攝影集
  if (isGalleryLayout && blocks) {
    return (
      <div className="w-full overflow-x-hidden">
        <VerticalScrollGallery
          blocks={blocks}
          title={post.title || ''}
          info={post.info || ''}
        />
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
          <PostFooterCTA collection={post.collection} />
        </div>
      </div>
    );
  }

  // 攝影集但無 blocks（fallback 至標準渲染）
  if (isGalleryLayout) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <header className="mb-10">
          <h1 className="text-3xl font-serif font-bold mb-4">{post.title}</h1>
          {post.info ? <p className="text-lg text-gray-600">{post.info}</p> : null}
        </header>
        <article className="bg-white rounded-2xl shadow p-8 sm:p-10">
          <MarkdownInteractive html={html} />
          <PostFooterCTA collection={post.collection} />
        </article>
      </div>
    );
  }

  // 新詩模式：tag 含「詩文」或 category 新詩，琥珀色詩箋 + 防拷貝
  if (isPoetryLayout) {
    const collStyle = post.collection ? getCollectionStyle(post.collection) : null;
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 poetry-sheet-wrapper">
        <header className="mb-8">
          {post.category ? (
            <p
              className={`text-xs font-semibold sm:text-sm ${
                collStyle ? collStyle.categoryTextClass : 'text-amber-800'
              }`}
            >
              {post.category}
            </p>
          ) : null}
        </header>
        <PoetryPostContent
          html={html}
          title={post.title || ''}
          date={post.date || post.dateDisplay}
        />
        <div className="mt-8">
          <PostFooterCTA collection={post.collection} />
        </div>
      </div>
    );
  }

  // 標準模式：category 與 series 同一列（中間留一格間距）；作者／日期在下方
  const collStyle = post.collection ? getCollectionStyle(post.collection) : null;
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <header className="mb-10">
        {post.category || post.series ? (
          <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {post.category ? (
              <span
                className={`text-xs font-semibold sm:text-sm ${
                  collStyle ? collStyle.categoryTextClass : 'text-gray-600'
                }`}
              >
                {post.category}
              </span>
            ) : null}
            {post.series ? (
              <span className="text-xs font-serif font-bold tracking-wide text-amber-700 sm:text-sm">
                {post.series}
              </span>
            ) : null}
          </div>
        ) : null}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-wide leading-snug md:leading-tight mb-4 text-[#333333]">
          {post.title}
        </h1>
        {post.info ? <p className="text-lg text-gray-600 leading-relaxed mb-2">{post.info}</p> : null}
        {(post.author || post.dateDisplay || post.date) ? (
          <p className="flex items-center gap-2 text-sm text-gray-500">
            {post.author ? (
              <>
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </>
            ) : null}
            {post.dateDisplay || post.date ? (
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

