import { notFound } from 'next/navigation';
import Link from 'next/link';
import { User } from 'lucide-react';
import { getAllPosts, getPostsByCollection, getPostBySlug } from '../../../lib/posts';
import { buildPostListFilterHref } from '../../../lib/postListRoutes';
import { parseMarkdownForCategory } from '../../../lib/markdownRenderers';
import MarkdownInteractive from '../../../components/MarkdownInteractive';
import VerticalScrollGallery from '../../../components/VerticalScrollGallery';
import PoetryPostContent from '../../../components/PoetryPostContent';
import PostFooterCTA from '../../../components/PostFooterCTA';

const SITE_NAME = '斑泥 Bānní';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://banni-walks.com').replace(/\/$/, '');

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

const postMetaLinkFocus =
  'rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2';

function PostCategorySeriesLinks({ collection, category, series, categoryClassName }) {
  const cat = category ? String(category).trim() : '';
  const ser = series ? String(series).trim() : '';
  if (!cat && !ser) return null;
  return (
    <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
      {cat ? (
        <Link
          href={buildPostListFilterHref(collection, { category: cat })}
          className={`text-xs font-semibold sm:text-sm hover:underline ${categoryClassName} ${postMetaLinkFocus}`}
        >
          {cat}
        </Link>
      ) : null}
      {ser ? (
        <Link
          href={buildPostListFilterHref(collection, { series: ser })}
          className={`text-xs font-serif font-bold tracking-wide text-amber-700 sm:text-sm hover:underline ${postMetaLinkFocus}`}
        >
          {ser}
        </Link>
      ) : null}
    </div>
  );
}

function toAbsoluteUrl(input) {
  if (!input) return undefined;
  const url = String(input);
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) return `${SITE_URL}${url}`;
  return `${SITE_URL}/${url}`;
}

function toIsoDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: '找不到文章' };

  const baseTitle = post.title || '文章';
  const section = getCollectionStyle(post.collection).label;
  const title = baseTitle;
  const description = post.info || post.excerpt || `${baseTitle}｜${section}`;
  const urlPath = `/posts/${post.slug}`;
  const publishedTime = toIsoDate(post.dateISO ?? post.date);
  const ogImage = toAbsoluteUrl(post.thumbnail);

  return {
    title,
    description,
    alternates: { canonical: urlPath },
    openGraph: {
      title,
      description,
      url: urlPath,
      type: 'article',
      images: ogImage ? [{ url: ogImage }] : undefined,
      publishedTime,
      authors: [post.author || SITE_NAME],
      section,
      tags: post.tags && post.tags.length > 0 ? post.tags : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
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

  const relatedPosts =
    post.collection && typeof post.collection === 'string'
      ? (await getPostsByCollection(post.collection))
          .filter((p) => p.slug !== post.slug)
          .slice(0, 3)
      : [];

  const category = post.category ? String(post.category).trim() : '';
  const isGalleryLayout = hasTag(post, '攝影') || category === '攝影集';
  const isPoetryLayout = hasTag(post, '詩文') || category === '新詩';
  const layoutType = isGalleryLayout ? '攝影集' : isPoetryLayout ? '新詩' : null;

  const { html, blocks } = parseMarkdownForCategory(
    post.contentResolved || post.content || '',
    layoutType
  );

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title || '文章',
    description: post.info || post.excerpt || undefined,
    datePublished: toIsoDate(post.dateISO ?? post.date),
    dateModified: toIsoDate(post.dateISO ?? post.date),
    author: {
      '@type': 'Person',
      name: post.author || SITE_NAME,
    },
    mainEntityOfPage: `${SITE_URL}/posts/${post.slug}`,
    image: toAbsoluteUrl(post.thumbnail) || undefined,
    articleSection: getCollectionStyle(post.collection).label,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首頁',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: '所有文章',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title || '文章',
        item: `${SITE_URL}/posts/${post.slug}`,
      },
    ],
  };
  const jsonLdPayload = JSON.stringify([articleJsonLd, breadcrumbJsonLd]);

  // 攝影集模式：tag 含「攝影」或 category 攝影集
  if (isGalleryLayout && blocks) {
    return (
      <div className="w-full overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdPayload }}
        />
        <VerticalScrollGallery
          blocks={blocks}
          title={post.title || ''}
          info={post.info || ''}
        />
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
          {relatedPosts.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                想看更多
              </h2>
              <div className="space-y-3">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/posts/${p.slug}`}
                    className="block rounded-xl border border-amber-100/90 bg-white/80 p-4 shadow-sm hover:bg-white transition"
                  >
                    <div className="text-sm text-gray-500 mb-1">
                      {p.dateDisplay || p.dateISO || p.date}
                    </div>
                    <div className="font-serif text-lg font-semibold text-gray-900">{p.title}</div>
                    {p.excerpt ? (
                      <div className="text-sm text-gray-600 mt-1 line-clamp-2 whitespace-pre-line">
                        {p.excerpt}
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-10">
            <PostFooterCTA collection={post.collection} />
          </div>
        </div>
      </div>
    );
  }

  // 攝影集但無 blocks（fallback 至標準渲染）
  if (isGalleryLayout) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdPayload }}
        />
        <header className="mb-10">
          <h1 className="text-3xl font-serif font-bold mb-4">{post.title}</h1>
          {post.info ? <p className="text-lg text-gray-600">{post.info}</p> : null}
        </header>
        <article className="bg-white rounded-2xl shadow p-8 sm:p-10">
          <MarkdownInteractive html={html} />

          {relatedPosts.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
                想看更多
              </h2>
              <div className="space-y-3">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/posts/${p.slug}`}
                    className="block rounded-xl border border-amber-100/90 bg-white/80 p-4 shadow-sm hover:bg-white transition"
                  >
                    <div className="text-sm text-gray-500 mb-1">
                      {p.dateDisplay || p.dateISO || p.date}
                    </div>
                    <div className="font-serif text-lg font-semibold text-gray-900">{p.title}</div>
                    {p.excerpt ? (
                      <div className="text-sm text-gray-600 mt-1 line-clamp-2 whitespace-pre-line">
                        {p.excerpt}
                      </div>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-8">
            <PostFooterCTA collection={post.collection} />
          </div>
        </article>
      </div>
    );
  }

  // 新詩模式：tag 含「詩文」或 category 新詩，琥珀色詩箋 + 防拷貝
  if (isPoetryLayout) {
    const collStyle = post.collection ? getCollectionStyle(post.collection) : null;
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 poetry-sheet-wrapper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdPayload }}
        />
        <header className="mb-8">
          {post.category ? (
            <Link
              href={buildPostListFilterHref(post.collection, {
                category: String(post.category).trim(),
              })}
              className={`inline-block text-xs font-semibold sm:text-sm hover:underline ${
                collStyle ? collStyle.categoryTextClass : 'text-amber-800'
              } ${postMetaLinkFocus}`}
            >
              {post.category}
            </Link>
          ) : null}
        </header>
        <PoetryPostContent
          html={html}
          title={post.title || ''}
          date={post.date || post.dateDisplay}
        />

        {relatedPosts.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
              想看更多
            </h2>
            <div className="space-y-3">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/posts/${p.slug}`}
                  className="block rounded-xl border border-amber-100/90 bg-white/80 p-4 shadow-sm hover:bg-white transition"
                >
                  <div className="text-sm text-gray-500 mb-1">
                    {p.dateDisplay || p.dateISO || p.date}
                  </div>
                  <div className="font-serif text-lg font-semibold text-gray-900">{p.title}</div>
                  {p.excerpt ? (
                    <div className="text-sm text-gray-600 mt-1 line-clamp-2 whitespace-pre-line">
                      {p.excerpt}
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-10">
          <PostFooterCTA collection={post.collection} />
        </div>
      </div>
    );
  }

  // 標準模式：category 與 series 同一列（中間留一格間距）；作者／日期在下方
  const collStyle = post.collection ? getCollectionStyle(post.collection) : null;
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdPayload }}
      />
      <header className="mb-10">
        <PostCategorySeriesLinks
          collection={post.collection}
          category={post.category}
          series={post.series}
          categoryClassName={collStyle ? collStyle.categoryTextClass : 'text-gray-600'}
        />

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
        {relatedPosts.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-xl font-serif font-semibold text-gray-900 mb-4">
              想看更多
            </h2>
            <div className="space-y-3">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/posts/${p.slug}`}
                  className="block rounded-xl border border-amber-100/90 bg-white/80 p-4 shadow-sm hover:bg-white transition"
                >
                  <div className="text-sm text-gray-500 mb-1">
                    {p.dateDisplay || p.dateISO || p.date}
                  </div>
                  <div className="font-serif text-lg font-semibold text-gray-900">{p.title}</div>
                  {p.excerpt ? (
                    <div className="text-sm text-gray-600 mt-1 line-clamp-2 whitespace-pre-line">
                      {p.excerpt}
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-8">
          <PostFooterCTA collection={post.collection} />
        </div>
      </article>
    </div>
  );
}

