import SitemapGenerator from 'sitemap-generator';

const generator = SitemapGenerator('http://localhost:5001', {
  stripQuerystring: false,
  filepath: './src/static/sitemap.xml',
});

generator.start();