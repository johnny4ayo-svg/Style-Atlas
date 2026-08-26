const fs = require('fs');

try {
  const xml = fs.readFileSync('docx_temp_hp/word/document.xml', 'utf8');
  // Simple regex to extract text content from <w:t> tags
  // The structure is usually <w:t>some text</w:t> or <w:t xml:space="preserve">some text</w:t>
  const tags = xml.match(/<w:t(?:[^>]*)>([^<]*)<\/w:t>/g) || [];
  
  // Also we want to add newlines for paragraphs <w:p>
  // A better regex approach for basic text extraction:
  let text = xml.replace(/<w:p[^>]*>/g, '\n') // new paragraph
                .replace(/<w:t(?:[^>]*)>/g, '###TEXT_START###')
                .replace(/<\/w:t>/g, '###TEXT_END###');
                
  let out = '';
  let inText = false;
  let currentStr = '';
  
  for(let i=0; i<text.length; i++) {
     if (text.substring(i, i+16) === '###TEXT_START###') {
         inText = true;
         i += 15;
         continue;
     }
     if (text.substring(i, i+14) === '###TEXT_END###') {
         inText = false;
         out += currentStr;
         currentStr = '';
         i += 13;
         continue;
     }
     if (inText) {
         currentStr += text[i];
     }
     if (!inText && text[i] === '\n') {
         out += '\n';
     }
  }
  
  // Clean up excessive newlines
  out = out.replace(/\n{3,}/g, '\n\n').trim();

  fs.writeFileSync('StyleAtlas_Homepage_Implementation_Instructions.txt', out);
  console.log('Success');
} catch (e) {
  console.error(e);
}
