export interface CategoryMeta {
  title: string;
  description: string;
}

/**
 * Known categories. Add a new entry here when you add a new category folder;
 * anything missing falls back to showing the raw slug as the title.
 */
export const categoryList: Record<string, CategoryMeta> = {
  'ai-book-a-day': {
    title: 'AI Book, a Page a Day',
    description:
      'Reading one page a day from an AI book and writing down what stuck, what I disagree with, and what I want to try.',
  },
};

export function categoryMeta(slug: string): CategoryMeta {
  return (
    categoryList[slug] ?? {
      title: slug,
      description: '',
    }
  );
}
