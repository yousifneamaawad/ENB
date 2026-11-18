import rss from '@astrojs/rss';
import { SITE } from '../data/site';
import { getAllPosts, postPath } from '../utils/posts';

export async function GET(context) {
  const posts = await getAllPosts();
  const site = context.site ?? SITE.url;

  return rss({
    title: SITE.title,
    description: SITE.description,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: post.data.date,
      link: new URL(postPath(post), site).toString(),
      categories: post.data.tags.length > 0 ? post.data.tags : undefined,
      customData: `<category>${post.data.category}</category>`,
    })),
  });
}
