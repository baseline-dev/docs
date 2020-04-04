import Baseline from './lib/generator';
import slug from 'slug';
import {relative, sep, join, basename, dirname, parse} from 'path';
import {readFileSync} from 'fs';

const CONFIG = {
  production: {
    docsUrl: 'https://docs.baseline.dev'
  },
  development: {
    docsUrl: 'http://localhost:5001'
  }
};

function editInGitHub(baseline) {
  for (const file in baseline.ctx) {
    const props = baseline.ctx[file];
    props.data.repoUrl = `https://github.com/baseline-dev/docs/blob/master/src/content/${file}`;
  }
}

function config(baseline) {
  for (const file in baseline.ctx) {
    const props = baseline.ctx[file];
    props.data.config = CONFIG[process.env.NODE_ENV === 'production' ? 'production' : 'development'];
  }
}

function capitalizeWord(word) {
  if (typeof word !== 'string') return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function slugToTitle(slug) {
  return slug.split('-').map(capitalizeWord).join(' ');
}

function getBasePath(path) {
  const parts = path.split(sep);
  return parts.length === 2 ? `/${parts.shift()}` : '';
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

function renameFromMdToHtml(file) {
  return `${basename(file, '.md')}.html`;
}

function getSubPages(path, ctx) {
  const pages = [];
  for (const file in ctx) {
    const regexp = new RegExp(`^${path}\/(?!index\.md)`);
    const isMatch = regexp.test(`/${file}`)
    const isNotRootPage = path.length;
    if (isNotRootPage && isMatch) {
      pages.push({
        title: parse(file).name.split('-').map(capitalizeWord).join(' '),
        link: `/${join(dirname(file), renameFromMdToHtml(file))}`
      });
    }
  }
  return pages;
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
      link: props.link || `${link}/index.html`,
      subPages: getSubPages(getBasePath(path), baseline.ctx)
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
  .use(config)
  .use(editInGitHub)
  .build();