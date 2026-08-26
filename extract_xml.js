const fs = require('fs');

try {
  const xml = fs.readFileSync('docx_temp/word/document.xml', 'utf8');
  // Remove XML tags
  const text = xml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  fs.writeFileSync('STYLEATLAS-One-Pass-Remaining-Errors-Fix-Instructions.txt', text);
  console.log('Success');
} catch (e) {
  console.error(e);
}
