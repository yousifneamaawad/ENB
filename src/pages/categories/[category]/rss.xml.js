import rss from '@astrojs/rss';
import { SITE } from '../../../data/site';
import { categoryMeta } from '../../../data/categories';
import { getAllPosts, postPath, postsByCategory } from '../../../utils/posts';

export async function getStaticPaths() {
  const posts = await getAllPosts();
  return [...new Set(posts.map((post) => post.data.category))].map(
    (category) => ({ params: { category } }),
  );
}

export async function GET(context) {
  const { category } = context.params;
  const meta = categoryMeta(category);
  const posts = postsByCategory(await getAllPosts(), category);
  const site = context.site ?? SITE.url;

  return rss({
    title: `${meta.title} · ${SITE.title}`,
    description: meta.description || SITE.description,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: post.data.date,
      link: new URL(postPath(post), site).toString(),
      categories: post.data.tags.length > 0 ? post.data.tags : undefined,
    })),
  });
}
