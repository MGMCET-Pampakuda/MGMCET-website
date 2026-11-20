const fs = require('fs');
const path = require('path');
const ImageKit = require('imagekit');

const ik = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
});

// 41 targeted files to migrate based on user specifications
const ASSETS_TO_MIGRATE = [
  // Departments (15) -> /mgmcet/images/departments
  { localPath: 'public/images/departments/btech-aiml.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/btech-cse.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/btech-cyber-security.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/btech-ece.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/btech-mechanical.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/mtech-iic.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/mtech-se-cm.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/polytechnic-ai.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/polytechnic-automobile.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/polytechnic-civil.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/polytechnic-cse.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/polytechnic-ece.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/polytechnic-eee.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/polytechnic-ev.webp', folder: '/mgmcet/images/departments' },
  { localPath: 'public/images/departments/polytechnic-mechanical.webp', folder: '/mgmcet/images/departments' },

  // Facilities (5) -> /mgmcet/images/facilities
  { localPath: 'public/images/facilities/facility-faculty.webp', folder: '/mgmcet/images/facilities' },
  { localPath: 'public/images/facilities/facility-hostel.webp', folder: '/mgmcet/images/facilities' },
  { localPath: 'public/images/facilities/facility-labs.webp', folder: '/mgmcet/images/facilities' },
  { localPath: 'public/images/facilities/facility-library.webp', folder: '/mgmcet/images/facilities' },
  { localPath: 'public/images/facilities/facility-transport.webp', folder: '/mgmcet/images/facilities' },

  // Gallery (5) -> /mgmcet/gallery/2025
  { localPath: 'public/images/gallery/arts-fest.webp', folder: '/mgmcet/gallery/2025' },
  { localPath: 'public/images/gallery/autobahn-bharatbenz.webp', folder: '/mgmcet/gallery/2025' },
  { localPath: 'public/images/gallery/campus-aerial.webp', folder: '/mgmcet/gallery/2025' },
  { localPath: 'public/images/gallery/front-entrance.webp', folder: '/mgmcet/gallery/2025' },
  { localPath: 'public/images/gallery/placement-orientation.webp', folder: '/mgmcet/gallery/2025' },

  // News (6) -> /mgmcet/events/other
  { localPath: 'public/images/news/comstream-placement.webp', folder: '/mgmcet/events/other' },
  { localPath: 'public/images/news/hackathon-achievement.webp', folder: '/mgmcet/events/other' },
  { localPath: 'public/images/news/hiring-faculty.webp', folder: '/mgmcet/events/other' },
  { localPath: 'public/images/news/placement-2025.webp', folder: '/mgmcet/events/other' },
  { localPath: 'public/images/news/placement-training.webp', folder: '/mgmcet/events/other' },
  { localPath: 'public/images/news/technical-seminar.webp', folder: '/mgmcet/events/other' },

  // Recruiters (10) -> /mgmcet/images/general
  { localPath: 'public/images/recruiters/recruiter-01.webp', folder: '/mgmcet/images/general' },
  { localPath: 'public/images/recruiters/recruiter-02.webp', folder: '/mgmcet/images/general' },
  { localPath: 'public/images/recruiters/recruiter-03.webp', folder: '/mgmcet/images/general' },
  { localPath: 'public/images/recruiters/recruiter-04.webp', folder: '/mgmcet/images/general' },
  { localPath: 'public/images/recruiters/recruiter-05.webp', folder: '/mgmcet/images/general' },
  { localPath: 'public/images/recruiters/recruiter-06.webp', folder: '/mgmcet/images/general' },
  { localPath: 'public/images/recruiters/recruiter-07.webp', folder: '/mgmcet/images/general' },
  { localPath: 'public/images/recruiters/recruiter-08.webp', folder: '/mgmcet/images/general' },
  { localPath: 'public/images/recruiters/recruiter-09.webp', folder: '/mgmcet/images/general' },
  { localPath: 'public/images/recruiters/recruiter-10.webp', folder: '/mgmcet/images/general' },
];

const SKIPPED_ASSETS = [
  // Logos kept locally per user instruction
  { localPath: 'public/images/brand/logo.png', reason: 'User requested to keep logo in codebase' },
  { localPath: 'public/images/brand/logo.svg', reason: 'User requested to keep logo in codebase' },
  { localPath: 'public/images/brand/logo-light.svg', reason: 'User requested to keep logo in codebase' },
  { localPath: 'public/images/brand/favicon.svg', reason: 'User requested to keep logo in codebase' },
  { localPath: 'public/images/brand/emblem.png', reason: 'User requested to keep logo in codebase' },
  { localPath: 'public/images/brand/og-image.png', reason: 'Brand asset kept in codebase' },
  { localPath: 'app/favicon.ico', reason: 'Root metadata icon kept in codebase' },

  // Landing page college images kept locally per user instruction
  { localPath: 'public/images/hero/campus-main.webp', reason: 'Landing page college hero image' },
  { localPath: 'public/images/hero/campus-front.webp', reason: 'Landing page college hero image' },
  { localPath: 'public/images/hero/campus-academic.webp', reason: 'Landing page college hero image' },
  { localPath: 'public/images/campus/about-campus.webp', reason: 'Landing page college about image' },
  { localPath: 'public/images/gallery/campus-life.webp', reason: 'Landing page campus life image' },

  // Leadership portraits kept locally per user instruction
  { localPath: 'public/images/leadership/chairman-dr-geevarghese-yohannan.webp', reason: 'User requested to keep leadership images in codebase' },
  { localPath: 'public/images/leadership/director-h-ahinus.webp', reason: 'User requested to keep leadership images in codebase' },
  { localPath: 'public/images/leadership/principal-dr-dhanya-g.webp', reason: 'User requested to keep leadership images in codebase' },
  { localPath: 'public/images/leadership/principal-poly-er-nk-rajan.webp', reason: 'User requested to keep leadership images in codebase' },
  { localPath: 'public/images/leadership/vice-chairman-vinod-thomas.webp', reason: 'User requested to keep leadership images in codebase' },

  // PDFs kept locally per user instruction
  { localPath: 'public/documents/aicte-approval-2024-25.pdf', reason: 'User requested to keep PDFs in codebase' },
  { localPath: 'public/documents/anti-ragging-committee.pdf', reason: 'User requested to keep PDFs in codebase' },
  { localPath: 'public/documents/mandatory-disclosure-2024.pdf', reason: 'User requested to keep PDFs in codebase' },
  { localPath: 'public/documents/nirf-report-2024.pdf', reason: 'User requested to keep PDFs in codebase' },
  { localPath: 'public/documents/sc-st-committee.pdf', reason: 'User requested to keep PDFs in codebase' },

  // Developer reference
  { localPath: 'public/reference/home.png', reason: 'Developer UI reference screenshot' },
  // Duplicate
  { localPath: 'public/images/campus/autobahn-truck.webp', reason: 'Duplicate of autobahn-bharatbenz.webp' },
];

async function main() {
  const isDryRun = process.argv.includes('--dry-run');

  console.log('====================================================');
  console.log(`IMAGEKIT MIGRATION ${isDryRun ? '(DRY RUN MODE)' : '(LIVE UPLOAD MODE)'}`);
  console.log('====================================================');

  let totalUploadBytes = 0;
  const verifiedAssets = [];

  for (const asset of ASSETS_TO_MIGRATE) {
    if (!fs.existsSync(asset.localPath)) {
      console.error(`ERROR: File does not exist: ${asset.localPath}`);
      process.exit(1);
    }
    const stat = fs.statSync(asset.localPath);
    totalUploadBytes += stat.size;
    verifiedAssets.push({
      ...asset,
      filename: path.basename(asset.localPath),
      size: stat.size,
    });
  }

  console.log(`Total files to upload: ${verifiedAssets.length}`);
  console.log(`Estimated upload size: ${(totalUploadBytes / (1024 * 1024)).toFixed(2)} MB (${totalUploadBytes.toLocaleString()} bytes)`);
  console.log(`Files skipped (kept locally / duplicates): ${SKIPPED_ASSETS.length}`);

  if (isDryRun) {
    console.log('\n--- UPLOAD PLAN BY DESTINATION FOLDER ---');
    const byFolder = {};
    for (const a of verifiedAssets) {
      byFolder[a.folder] = byFolder[a.folder] || [];
      byFolder[a.folder].push(a);
    }
    for (const [folder, files] of Object.entries(byFolder)) {
      console.log(`\nFolder: ${folder} (${files.length} files)`);
      for (const f of files) {
        console.log(`  -> ${f.filename} (${(f.size / 1024).toFixed(1)} KB) from ${f.localPath}`);
      }
    }

    console.log('\n--- SKIPPED ASSETS SUMMARY ---');
    for (const s of SKIPPED_ASSETS) {
      console.log(`  [SKIP] ${s.localPath} — ${s.reason}`);
    }

    console.log('\n[DRY RUN COMPLETE] No files were uploaded.');
    return;
  }

  // LIVE UPLOAD
  console.log('\nStarting live upload to ImageKit...');
  let manifest = [];
  const manifestPath = 'media-manifest.json';
  if (fs.existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    } catch {
      manifest = [];
    }
  }

  const manifestMap = new Map(manifest.map(m => [m.originalPath, m]));
  let uploadedCount = 0;
  let skippedExisting = 0;

  for (let i = 0; i < verifiedAssets.length; i++) {
    const asset = verifiedAssets[i];
    const originalWebPath = '/' + asset.localPath.replace(/^public\//, '');
    
    // Check if already in manifest
    if (manifestMap.has(asset.localPath) && manifestMap.get(asset.localPath).status === 'uploaded') {
      console.log(`[${i + 1}/${verifiedAssets.length}] Already uploaded: ${asset.filename}`);
      skippedExisting++;
      continue;
    }

    console.log(`[${i + 1}/${verifiedAssets.length}] Uploading ${asset.filename} to ${asset.folder}...`);

    try {
      const fileBuffer = fs.readFileSync(asset.localPath);
      const res = await ik.upload({
        file: fileBuffer,
        fileName: asset.filename,
        folder: asset.folder,
        useUniqueFileName: false,
        tags: ['mgmcet', 'migrated']
      });

      const entry = {
        originalPath: asset.localPath,
        originalWebPath,
        filename: asset.filename,
        imagekitFolder: asset.folder,
        imagekitFileId: res.fileId,
        imagekitUrl: res.url,
        size: asset.size,
        status: 'uploaded',
        uploadedAt: new Date().toISOString()
      };

      manifestMap.set(asset.localPath, entry);
      fs.writeFileSync(manifestPath, JSON.stringify(Array.from(manifestMap.values()), null, 2));
      uploadedCount++;
      console.log(`    SUCCESS: ${res.url}`);
    } catch (err) {
      console.error(`    FAILED to upload ${asset.filename}:`, err.message || err);
      const entry = {
        originalPath: asset.localPath,
        originalWebPath,
        filename: asset.filename,
        imagekitFolder: asset.folder,
        status: 'failed',
        error: err.message || String(err),
        attemptedAt: new Date().toISOString()
      };
      manifestMap.set(asset.localPath, entry);
      fs.writeFileSync(manifestPath, JSON.stringify(Array.from(manifestMap.values()), null, 2));
    }
  }

  console.log('\n====================================================');
  console.log(`UPLOAD FINISHED: ${uploadedCount} uploaded, ${skippedExisting} previously existing.`);
  console.log(`Manifest saved to ${manifestPath}`);
  console.log('====================================================');
}

main().catch(err => {
  console.error('Fatal migration error:', err);
  process.exit(1);
});
