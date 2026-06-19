const fs = require('fs');
const path = require('path');

const staticDir = path.join('out', '_next', 'static');
if (!fs.existsSync(staticDir)) {
  console.log('No out/_next/static directory found');
  process.exit(0);
}

const entries = fs.readdirSync(staticDir, { withFileTypes: true });
let fixed = 0;

for (const entry of entries) {
  if (!entry.isDirectory() || entry.name === 'chunks' || entry.name === 'media') continue;
  
  const manifestPath = path.join(staticDir, entry.name, '_buildManifest.js');
  if (!fs.existsSync(manifestPath)) continue;
  
  let content = fs.readFileSync(manifestPath, 'utf8');
  if (!content.includes('"/"')) {
    content = content.replace('sortedPages:[', 'sortedPages:["/",');
    fs.writeFileSync(manifestPath, content);
    console.log('Fixed manifest:', manifestPath);
    fixed++;
  }
}

if (fixed === 0) {
  console.log('All manifests already have "/" or no manifests found');
}
