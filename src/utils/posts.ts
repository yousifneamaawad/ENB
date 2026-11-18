import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { categoryMeta, type CategoryMeta } from '../data/categories';

export type Post = CollectionEntry<'writing'>;

/** All published posts, newest first. */
export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export interface CategorySummary extends CategoryMeta {
  slug: string;
  count: number;
  latest: Post;
}

/** Category summaries derived from the posts that actually exist. */
export function summarizeCategories(posts: Post[]): CategorySummary[] {
  const grouped = new Map<string, Post[]>();

  for (const post of posts) {
    const list = grouped.get(post.data.category) ?? [];
    list.push(post);
    grouped.set(post.data.category, list);
  }

  return [...grouped.entries()]
    .map(([slug, list]) => ({
      slug,
      count: list.length,
      latest: list[0],
      ...categoryMeta(slug),
    }))
    .sort((a, b) => b.latest.data.date.valueOf() - a.latest.data.date.valueOf());
}

/** Posts in one category, newest first. Assumes `posts` is already sorted. */
export function postsByCategory(posts: Post[], slug: string): Post[] {
  return posts.filter((post) => post.data.category === slug);
}

/** Newer/older neighbours within the same category. */
export function adjacentPosts(posts: Post[], current: Post) {
  const index = posts.findIndex((post) => post.id === current.id);
  return {
    newer: index > 0 ? posts[index - 1] : undefined,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
  };
}

/** Stable, timezone-independent date rendering. */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function postPath(post: Post): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}writing/${post.id}/`;
}
