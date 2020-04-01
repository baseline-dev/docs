import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'fs';
import {join, relative, dirname, basename} from 'path';
import marked from 'marked';
import matter from 'gray-matter'
import merge from 'lodash.merge';
import readdir from 'recursive-readdir';
import nunjucks from 'nunjucks';

function renameFromMdToHtml(file) {
  return `${basename(file, '.md')}.html`;
}

function Baseline(dirname = process.cwd()) {
  if (!(this instanceof Baseline)) return new Baseline(dirname);
  this.dirname = dirname;
  this.plugins = [];
  this.ctx = {};
}

Baseline.prototype.source = function (src) {
  this.source = join(this.dirname, src);
  return this;
};

Baseline.prototype.templates = function (templates) {
  this.templates = join(this.dirname, templates);
  return this;
};

Baseline.prototype.destination = function (destination) {
  this.destination = join(this.dirname, destination);
  return this;
};

Baseline.prototype.use = function (plugin) {
  this.plugins.push(plugin.bind(this));
  return this;
};

Baseline.prototype._readFiles = async function () {
  this.files = await readdir(this.source);

  const markdownFiles = this.files.filter((file) => {
    return /.md$/.test(file)
  });

  for (const file of markdownFiles) {
    const content = readFileSync(file, 'utf-8');
    const data = matter(content);
    const fileName = relative(this.source, file);
    this.ctx[fileName] = data;
  }
};

Baseline.prototype._compileFiles = async function () {
  for (const file in this.ctx) {
    const props = this.ctx[file];
    const template = join(this.templates, props.data.layout || 'layout.njk');
    const data = merge(props.data, {
      content: marked(props.content)
    });
    this.ctx[file].html = nunjucks.render(template, data);
  }
  return this;
};

Baseline.prototype._writeToDisk = async function () {
  for (const file in this.ctx) {
    const path = dirname(join(this.destination, file));
    if (!existsSync(path)) {
      mkdirSync(path, {recursive: true});
    }
    const out = join(this.destination, dirname(file), renameFromMdToHtml(file));
    writeFileSync(out, this.ctx[file].html);
  }
  return this;
};

Baseline.prototype._runPlugins = async function () {
  // Sorry for the below, there seems no other way to execute async functions serially.
  // We could add some dependency but this is just the easiest way it appears.
  // Only change if you don't exchange for some external dependency.
  await this.plugins.reduce(async (previousPromise, nextAsyncFunction) => {
    await previousPromise;
    await nextAsyncFunction(this);
  }, Promise.resolve());
};

Baseline.prototype.build = async function (src) {
  await this._readFiles();
  await this._runPlugins();
  await this._compileFiles();
  await this._writeToDisk();
  return this;
};

export {
  Baseline as default
}