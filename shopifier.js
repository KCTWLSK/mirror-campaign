const path = require('path');
const fs = require('fs');
const { html, js, css } = require('js-beautify');

const processFilesInDir = (dirPath, beautifier, processor, shouldProcess = () => true) => {
  const filenames = fs.readdirSync(dirPath);
  filenames.forEach((filename) => {
    if (shouldProcess(filename)) {
      const filePath = `${dirPath}/${filename}`;
      const data = fs.readFileSync(
        filePath,
        {
          encoding: 'utf8',
          flag: 'r',
        },
      );
  
      fs.writeFileSync(
        filePath,
        processor(data, filename)
        // beautifier(
        //   processor(data, filename),
        //   {
        //     indent_size: 2,
        //     space_in_empty_paren: true
        //   },
        // ),
      );
    }
  });
};

// *.html
processFilesInDir(
  path.join(__dirname, 'out'),
  html,
  (data) => {
    const start = data.indexOf('<div id="__next">');
    const end = data.indexOf('</body>');
    data = data.slice(start, end);
    data = data.replace('"assetPrefix":"/pages/mirrorcrew"', '"assetPrefix":"/pages"');
    data = data.replaceAll(/\/pages\/mirrorcrew\/_next\/static\/media\/(AK|ALTON|ANSONLO|EDAN|FRANKIE|IAN|JER|JEREMY|KEUNGTO|LOKMAN|STANLEY|TIGER|question_mark)\.[^/.]+\.png/g, "{{ 'mirror-$1.png' | asset_url }}");
    data = data.replaceAll(/\/pages\/mirrorcrew\/_next\/static\/media\/([^/.]+)\.[^/.]+\.(png|jpg|gif|svg)/g, "{{ '$1.$2' | asset_url }}");

    return data;
  },
  (filename) => ['en.html', 'zh-HK.html'].includes(filename),
);

// *.js
processFilesInDir(
  path.join(__dirname, 'out/_next/static/chunks'),
  js,
  (data) => {
    data = data.replaceAll(/\/pages\/mirrorcrew\/_next\/static\/media\/(AK|ALTON|ANSONLO|EDAN|FRANKIE|IAN|JER|JEREMY|KEUNGTO|LOKMAN|STANLEY|TIGER|question_mark)\.[^/.]+\.png/g, "{{ 'mirror-$1.png' | asset_url }}");
    data = data.replaceAll(/\/pages\/mirrorcrew\/_next\/static\/media\/([^/.]+)\.[^/.]+\.(png|jpg|gif|svg)/g, "{{ '$1.$2' | asset_url }}");

    return data;
  },
  (filename) => filename.indexOf('main-') === 0,
);

processFilesInDir(
  path.join(__dirname, 'out/_next/static/chunks/pages'),
  js,
  (data, filename) => {
    data = data.replaceAll(/\/pages\/mirrorcrew\/_next\/static\/media\/(AK|ALTON|ANSONLO|EDAN|FRANKIE|IAN|JER|JEREMY|KEUNGTO|LOKMAN|STANLEY|TIGER|question_mark)\.[^/.]+\.png/g, "{{ 'mirror-$1.png' | asset_url }}");
    data = data.replaceAll(/\/pages\/mirrorcrew\/_next\/static\/media\/([^/.]+)\.[^/.]+\.(png|jpg|gif|svg)/g, "{{ '$1.$2' | asset_url }}");

    if (filename.indexOf('index-') === 0) {
      console.log(data.match(/\"\/\".concat\(localeValue, \"\#\"\).concat\(constants \/\* SECTION_HERO \*\/ .wK\)/g));
      console.log(data.match(/\"\/\".concat\(lang, \"\#\"\).concat\(constants \/\* SECTION_HERO \*\/ .wK\)/g));
      data = data.replaceAll(/\"\/\".concat\(localeValue, \"\#\"\).concat\(constants \/\* SECTION_HERO \*\/ .wK\)/g, "`\/pages\/mirrorcrew\${e === 'en' ? '-en' : ''}#hero`");
      data = data.replaceAll(/\"\/\".concat\(lang, \"\#\"\).concat\(constants \/\* SECTION_HERO \*\/ .wK\)/g, "`/mirrorcrew${window.location.pathname === '/mirrorcrew-en' ? '-en' : ''}#hero`");
    }

    return data;
  },
  (filename) => filename.indexOf('_app-') === 0 || filename.indexOf('index-') === 0,
);

const buildId = fs.readdirSync(path.join(__dirname, 'out/_next')).filter((names) => names !== 'static')[0];
processFilesInDir(
  path.join(__dirname, `out/_next/static/${buildId}`),
  js,
  (data) => {
    data = data.replace(/static\/css\/[^/.]+\.css/g, "{{ 'mirror-styles-p2.css' | asset_url }}");
    data = data.replace(/static\/chunks\/([0-9]+)-[^/.]+\.js/g, "{{ 'mirror-$1.js' | asset_url }}");
    data = data.replace(/static\/chunks\/pages\/index-[^/.]+\.js/g, "{{ 'mirror-index-p2.js' | asset_url }}");
    data = data.replace(/static\/chunks\/pages\/_error-[^/.]+\.js/g, "{{ 'mirror-_error.js' | asset_url }}");

    return data;
  },
  (filename) => filename === '_buildManifest.js',
);

// *.css
processFilesInDir(
  path.join(__dirname, 'out/_next/static/css'),
  css,
  (data) => {
    if (data.indexOf('@font-face') === 0) {
      data = data.replace("Inter-VariableFont_slnt,wght", "Inter-VariableFont_slnt-wght");
      data = data.replaceAll(/\/fonts\/([^/.]+).woff2/g, "{{ '$1.woff2' | asset_url }}");
    }

    return data;
  },
);