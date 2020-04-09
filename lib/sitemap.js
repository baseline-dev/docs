import SitemapGenerator from 'sitemap-generator';

const generator = SitemapGenerator('https://docs.baseline.dev', {
  stripQuerystring: false,
  filepath: './src/static/sitemap.xml',
});

generator.start();