const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(fs.readFileSync('media-manifest.json', 'utf8'));

// Map of original web paths to ImageKit URLs
const replacementMap = new Map();
for (const entry of manifest) {
  if (entry.status === 'uploaded' && entry.imagekitUrl) {
    replacementMap.set(entry.originalWebPath, entry.imagekitUrl);
  }
}

console.log(`Loaded ${replacementMap.size} replacement mappings from media-manifest.json`);

// Directories to update: content/ and components/
const TARGET_DIRS = ['content', 'components', 'app'];
let totalReplacements = 0;
let modifiedFiles = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') || entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let fileReplaced = 0;

      for (const [oldPath, newUrl] of replacementMap.entries()) {
        if (content.includes(oldPath)) {
          // Replace all occurrences of oldPath
          const count = content.split(oldPath).length - 1;
          content = content.replaceAll(oldPath, newUrl);
          fileReplaced += count;
        }
      }

      if (fileReplaced > 0) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath} (${fileReplaced} replacements)`);
        totalReplacements += fileReplaced;
        modifiedFiles++;
      }
    }
  }
}

for (const dir of TARGET_DIRS) {
  if (fs.existsSync(dir)) {
    walk(dir);
  }
}

console.log(`\nReplacement complete! ${totalReplacements} references replaced across ${modifiedFiles} files.`);
