import { getFeedPosts } from '@/lib/linkedin-feed';

/** Quotes a CSV cell, and neutralises values a spreadsheet would run as a formula */
function csvCell(value: unknown) {
  let text = String(value ?? '');
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export async function GET() {
  const posts = await getFeedPosts();
  const header = ['id', 'postedAt', 'author', 'title', 'topic', 'url', 'excerpt'];
  const rows = posts.map((post) =>
    [post.id, post.postedAt, post.author, post.title, post.topic, post.url, post.excerpt].map(csvCell).join(',')
  );
  const csv = [header.join(','), ...rows].join('\n') + '\n';

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="devweekends-linkedin-posts.csv"',
    },
  });
}
