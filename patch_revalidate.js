const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/app/directory/page.tsx',
  'src/app/marketplace/page.tsx',
  'src/app/events/page.tsx',
  'src/app/jobs/page.tsx',
  'src/app/journal/page.tsx'
];

for (const relPath of filesToUpdate) {
  const filePath = path.join(__dirname, relPath);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove existing revalidate exports
  content = content.replace(/export const revalidate\s*=\s*\d+;/g, '');
  
  // Add export const revalidate = 300; after imports
  const lines = content.split('\n');
  const lastImportIndex = lines.findLastIndex(line => line.startsWith('import '));
  
  lines.splice(lastImportIndex + 1, 0, '\nexport const revalidate = 300;');
  content = lines.join('\n');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated revalidate for ${relPath}`);
}
