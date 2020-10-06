import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import html from '@rollup/plugin-html';
import copy from 'rollup-plugin-copy';

const css = `
<style type="text/css">
  html, body, .container {
    width: 100%;
    height: 100%;
    margin: 0;
    background: black;
  }
  .container > div {
    width: 100%;
    height: 100%;
  }
  #editor {
    width: 100%;
    height: 97vh;
  }
  #status {
    color: white;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
    height: 2vh;
  }
  #status input {
    outline: none;
    border: none;
    background: transparent;
  }
</style>`;

const makeHtmlAttributes = (attributes) => {
  if (!attributes) return '';
  const keys = Object.keys(attributes);
  return keys.reduce((result, key) => (result += ` ${key}="${attributes[key]}"`), '');
};

const template = ({ attributes, files, meta, publicPath, title }) => {
  const scripts = (files.js || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
    })
    .join('\n');

  const links = (files.css || [])
    .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
    })
    .join('\n');

  const metas = meta
    .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
    })
    .join('\n');

  return `
<!doctype html>
<html>
<head>
    ${metas}
    <title>${title}</title>
    ${css}
    ${links}
</head>
<body>
  <div class="container">
    <div id="editor"></div>
    <div id="status"></div>
  </div>
  ${scripts}
</body>
</html>`;
}

export default {
  input: 'index.js',
  output: {
    dir: 'build',
    format: 'esm'
  },
  preserveEntrySignatures: false,
  plugins: [
    resolve({ modulesOnly: true }),
    postcss({ extract: true }),
    html({ template, title: 'vimtutor' }),
    copy({ targets: [{ src: 'vimtutor.txt', dest: 'build/' }]}),
  ]
}
