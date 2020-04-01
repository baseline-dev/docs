import Baseline from './lib/generator';
import slug from 'slug';

Baseline()
  .templates('./templates')
  .source('./src/content')
  .destination('./build')
  .use(async (baseline) => {
    for (const file in baseline.ctx) {
      const props = baseline.ctx[file];
      if (!props.data.pageHeaders) {
        props.data.pageHeaders = []
      };

      const matches = props.content.matchAll(/^## (.*)$/gm);
      for (const match of matches) {
        props.data.pageHeaders.push({
          title: match[1],
          slug: slug(match[1], {lower: true})
        });
      }
    }
    return this;
  })
  .build();