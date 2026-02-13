const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'h56bf53z',
  dataset: 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
});

async function debugCategories() {
  try {
    const categories = await client.fetch(`
      *[_type == "category"] | order(title asc){
        title,
        "slug": slug.current
      }
    `);
    
    console.log('Categories in Sanity:');
    categories.forEach(cat => {
      console.log(`  Title: "${cat.title}" -> Slug: "${cat.slug}"`);
    });

    console.log('\nChecking posts by category:');
    for (const cat of categories) {
      const postCount = await client.fetch(`
        count(*[_type == "post" && category->slug.current == $slug])
      `, { slug: cat.slug });
      console.log(`  ${cat.slug}: ${postCount} posts`);
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

debugCategories();
