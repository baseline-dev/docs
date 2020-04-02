const purgecss = require('@fullhuman/postcss-purgecss')({
  content: [
    './templates/**/*.njk',
    './templates/**/*.html',
    './src/**/*.md'
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
};