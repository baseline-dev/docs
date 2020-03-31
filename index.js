import Baseline from './lib/generator';

Baseline()
  .templates('./templates')
  .source('./src/content')
  .destination('./build')
  .use(async (baseline) => {
    for (const file in baseline.ctx) {
      const props = baseline.ctx[file];
      props.data.test = 'YO!';
    }
    return this;
  })
  .build();