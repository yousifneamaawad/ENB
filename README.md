# Personal website

A static personal site built with [Astro](https://astro.build). Posts are
Markdown files in Git; the site builds to plain HTML/CSS with no trackers,
cookies, or analytics.

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the built site locally
```

## Write a post

1. Copy `templates/general.md` (or `templates/ai-book-a-day.md`) into
   `src/content/writing/<category>/`.
2. Fill in the frontmatter and write. Keep `draft: true` until it should be
   publicly visible.
3. Commit and push — hosting rebuilds automatically.

### Frontmatter

| Field        | Required | Notes                                            |
| ------------ | -------- | ------------------------------------------------ |
| `title`      | yes      |                                                  |
| `date`       | yes      | `YYYY-MM-DD`                                     |
| `category`   | yes      | Slug of the category folder                      |
| `book`       | no       | Used by the AI book category                     |
| `page`       | no       | Page number/range                                |
| `tags`       | no       | Array of strings                                 |
| `description`| no       | Shown on lists/RSS                               |
| `draft`      | no       | `true` hides the post                            |

## Add a category

1. Create a folder under `src/content/writing/` with your first post.
2. Add a title/description to `categoryList` in `src/data/categories.ts`.

Category pages, feeds, and archive entries are generated automatically from the
posts themselves.

## Deploy (Cloudflare Pages)

1. Push this repo to GitHub/GitLab.
2. In Cloudflare Pages, create a project from the repo with:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Set your free `*.pages.dev` subdomain, or add a custom domain.
4. Update the domain in:
   - `astro.config.mjs` (`site`)
   - `src/data/site.ts` (`url`, if used for links)
   - `public/robots.txt` (sitemap URL)

## Feeds

- Global: `/rss.xml`
- Per category: `/categories/<slug>/rss.xml`

## Notes

- The current `site` value is a placeholder; change it before sharing links.
- Node 20+ is recommended for builds.
