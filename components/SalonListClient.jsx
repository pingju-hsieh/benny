'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import CollectionFilterBar from './CollectionFilterBar';

export default function SalonListClient({ posts }) {
  const [filters, setFilters] = useState({ category: '全部', series: '全部' });

  const filtered = useMemo(
    () =>
      posts.filter((p) => {
        if (filters.category !== '全部' && p.category !== filters.category) return false;
        if (filters.series !== '全部' && p.series !== filters.series) return false;
        return true;
      }),
    [posts, filters]
  );

  return (
    <>
      <CollectionFilterBar posts={posts} onFilterChange={setFilters} />

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-600">目前沒有符合條件的文章。</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => {
            const hero =
              post.thumbnail ||
              (Array.isArray(post.images) ? post.images[0] : undefined) ||
              (typeof post.images === 'string' ? post.images : undefined);

            return (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition cursor-pointer group flex flex-col"
              >
                <div className="relative w-full overflow-hidden bg-stone-50">
                  {hero ? (
                    <div className="relative w-full h-48">
                      <Image
                        src={hero}
                        alt={post.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition duration-300"
                        priority={false}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video flex items-center justify-center px-6">
                      <p className="text-stone-400 font-serif text-lg md:text-2xl text-center leading-relaxed">
                        {post.title}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {post.category ? (
                      <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                        {post.category}
                      </span>
                    ) : null}
                    {post.series ? (
                      <span className="text-xs sm:text-sm font-serif font-bold text-amber-700 tracking-wide">
                        {post.series}
                      </span>
                    ) : null}
                    {(post.dateDisplay || post.date) ? (
                      <span className="text-xs text-gray-500">
                        <Clock className="w-4 h-4 inline-block mr-1 align-[-2px]" />
                        發表於{post.dateDisplay || post.date}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="text-2xl font-serif text-gray-800 mb-2">{post.title}</h3>

                  {post.info ? <p className="text-sm text-gray-600 mb-3 flex-1">{post.info}</p> : null}

                  {post.excerpt ? (
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line line-clamp-3">
                      {post.excerpt}
                      {post.excerpt.length >= 180 ? '…' : ''}
                    </p>
                  ) : null}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

