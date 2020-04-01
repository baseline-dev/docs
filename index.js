import Baseline from './lib/generator';
import slug from 'slug';
import {relative, sep, join} from 'path';
import {readFileSync} from "fs";

const CONFIG = {
  production: {
    docsUrl: 'https://docs.baseline.dev'
  },
  development: {
    docsUrl: 'https://localhost'
  }
};

const config = CONFIG[process.env.NODE_ENV === 'production' ? 'production' : 'development'];

function capitalizeWord(word) {
  if (typeof word !== 'string') return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function slugToTitle(slug) {
  return slug.split('-').map(capitalizeWord).join(' ');
}

function getBasePath(path) {
  const parts = path.split(sep);
  return parts.length === 2 ? `/${parts.shift()}` : '/';
}

function parseSidebarFile(file) {
  const props = {};
  const chunks = file.split('\n');
  while (chunks.length) {
    let line = chunks.shift().split('=');

    if (line.length === 2) {
      props[line[0]] = line[1];
    }
  }
  return props;
}

async function pageHeaders(baseline) {
  for (const file in baseline.ctx) {
    const props = baseline.ctx[file];

    if (!props.data.pageHeaders) {
      props.data.pageHeaders = []
    }

    const matches = props.content.matchAll(/^## (.*)$/gm);
    for (const match of matches) {
      props.data.pageHeaders.push({
        title: match[1],
        slug: slug(match[1], {lower: true})
      });
    }
  }
  return this;
}

async function sideBar(baseline) {
  const sidebar = [];

  const sidebarFiles = this.files.filter((file) => {
    return /.sidebar$/.test(file)
  });

  for (const file of sidebarFiles) {
    const content = readFileSync(file, 'utf-8');
    const props = parseSidebarFile(content);
    const path = relative(this.source, file);
    const link = getBasePath(path);

    sidebar.push({
      title: props.title,
      index: props.index,
      icon: readFileSync(join(this.dirname, 'src', 'static', 'img', props.icon), 'utf8'),
      link
    });
  }

  sidebar.sort((a, b) => {
    return a.index - b.index;
  });

  for (const file in baseline.ctx) {
    const props = baseline.ctx[file];
    props.data.sidebar = sidebar;
    props.data.activePath = getBasePath(file);
  }

  return this;
}

Baseline()
  .templates('./templates')
  .source('./src/content')
  .destination('./build')
  .use(pageHeaders)
  .use(sideBar)
  .use(function(baseline) {
    for (const file in baseline.ctx) {
      const props = baseline.ctx[file];
      props.data.config = config;
    }
  })
  .build();