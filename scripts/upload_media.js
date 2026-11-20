/**
 * Reusable Media Upload CLI for future additions.
 * Usage:
 *   node --env-file=.env.local scripts/upload_media.js <filePath> <folderPath> [tags...]
 *
 * Example:
 *   node --env-file=.env.local scripts/upload_media.js ./new-event.webp /mgmcet/events/workshops tech,event
 */

const fs = require('fs');
const path = require('path');
const ImageKit = require('imagekit');

const filePath = process.argv[2];
const targetFolder = process.argv[3];
const tagsArg = process.argv[4];

if (!filePath || !targetFolder) {
  console.log(`
Usage:
  node --env-file=.env.local scripts/upload_media.js <filePath> <targetFolder> [comma-separated-tags]

Example:
  node --env-file=.env.local scripts/upload_media.js ./public/images/events/robotics.webp /mgmcet/events/workshops robotics,2026
`);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`Error: File does not exist: ${filePath}`);
  process.exit(1);
}

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

if (!publicKey || !privateKey || !urlEndpoint) {
  console.error('Error: Missing ImageKit credentials in environment variables.');
  process.exit(1);
}

const ik = new ImageKit({ publicKey, privateKey, urlEndpoint });

const fileName = path.basename(filePath);
const tags = tagsArg ? tagsArg.split(',').map(t => t.trim()) : ['mgmcet', 'future-upload'];

async function upload() {
  console.log(`Uploading ${fileName} (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB) to ImageKit folder ${targetFolder}...`);

  const fileBuffer = fs.readFileSync(filePath);
  const result = await ik.upload({
    file: fileBuffer,
    fileName,
    folder: targetFolder,
    tags,
    useUniqueFileName: false
  });

  console.log('\n--- UPLOAD SUCCESSFUL ---');
  console.log(`File ID:   ${result.fileId}`);
  console.log(`URL:       ${result.url}`);
  console.log(`Path:      ${result.filePath}`);

  // Update media-manifest.json
  const manifestPath = 'media-manifest.json';
  let manifest = [];
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch {
      manifest = [];
    }
  }

  const manifestEntry = {
    originalPath: filePath,
    originalWebPath: filePath.startsWith('public/') ? '/' + filePath.slice(7) : filePath,
    filename: fileName,
    imagekitFolder: targetFolder,
    imagekitFileId: result.fileId,
    imagekitUrl: result.url,
    size: result.size,
    status: 'uploaded',
    uploadedAt: new Date().toISOString()
  };

  const existingIndex = manifest.findIndex(m => m.filename === fileName && m.imagekitFolder === targetFolder);
  if (existingIndex >= 0) {
    manifest[existingIndex] = manifestEntry;
  } else {
    manifest.push(manifestEntry);
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`Manifest updated at ${manifestPath}`);
}

upload().catch(err => {
  console.error('Upload failed:', err.message || err);
  process.exit(1);
});
