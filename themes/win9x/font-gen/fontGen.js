const webfont = require('webfont');
const fs = require('fs');
const path = require('path');

const svgs = [
  // "explorer-view.svg",
  // "search-view.svg",
  // "debug-view.svg",
  // "git-view.svg",
  // "extensions-view.svg",
  // "smiley.svg",
  // "folding-expanded.svg",
  // "folding-collapsed.svg",
  // "expando-expanded.svg",
  // "expando-collapsed.svg",
  "minimize.svg",
  "maximize.svg",
  "restore.svg",
  "question.svg",
  "close.svg",
  // "debug-view.svg",
  // "git-view.svg",
  // "extensions-view.svg",
  // "smiley.svg",
].map(name => path.join(__dirname, '..', 'icons2', name));

async function generateFont() {

  try {
    const result = await webfont.webfont({
      files: svgs,
      formats: ['woff'],
      // startUnicode: 0xE000,
      startUnicode: 0x1F5D5,
      verbose: true,
      fontHeight: 1100,     // kanvas virtual 1000 unit
      // fontHeight: 2048,     // kanvas virtual 1000 unit
      // normalize: true,      // otomatis atur ukuran & posisi glyph
      // center: true,         // pusatkan glyph di kanvas [citation:8]
      center: false,
      descent: 0,          // ruang bawah (opsional, biarkan default)
      fixedWidth: true,
      sort: false
    });
    const dest = path.join(__dirname, '..', 'fonts', 'titlebar-ui.woff')
    // const dest = path.join(__dirname, '..', 'theme', 'titlebar.woff')
    fs.writeFileSync(dest, result.woff, 'binary');
    console.log(`Font created at ${dest}`);
  } catch (e) {
    console.error('Font creation failed.', e);
  }
}

generateFont();


