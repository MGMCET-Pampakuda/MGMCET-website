const ImageKit = require('imagekit');

const ik = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
});

const FOLDERS_TO_CREATE = [
  // Root
  { folderName: 'mgmcet', parentFolderPath: '/' },

  // images/
  { folderName: 'images', parentFolderPath: '/mgmcet' },
  { folderName: 'campus', parentFolderPath: '/mgmcet/images' },
  { folderName: 'infrastructure', parentFolderPath: '/mgmcet/images' },
  { folderName: 'facilities', parentFolderPath: '/mgmcet/images' },
  { folderName: 'departments', parentFolderPath: '/mgmcet/images' },
  { folderName: 'faculty', parentFolderPath: '/mgmcet/images' },
  { folderName: 'general', parentFolderPath: '/mgmcet/images' },

  // events/
  { folderName: 'events', parentFolderPath: '/mgmcet' },
  { folderName: 'futurum', parentFolderPath: '/mgmcet/events' },
  { folderName: 'ascend', parentFolderPath: '/mgmcet/events' },
  { folderName: 'hackathons', parentFolderPath: '/mgmcet/events' },
  { folderName: 'iedc', parentFolderPath: '/mgmcet/events' },
  { folderName: 'workshops', parentFolderPath: '/mgmcet/events' },
  { folderName: 'other', parentFolderPath: '/mgmcet/events' },

  // gallery/
  { folderName: 'gallery', parentFolderPath: '/mgmcet' },
  { folderName: '2025', parentFolderPath: '/mgmcet/gallery' },
  { folderName: '2026', parentFolderPath: '/mgmcet/gallery' },
  { folderName: '2027', parentFolderPath: '/mgmcet/gallery' },

  // videos/
  { folderName: 'videos', parentFolderPath: '/mgmcet' },
  { folderName: 'campus', parentFolderPath: '/mgmcet/videos' },
  { folderName: 'events', parentFolderPath: '/mgmcet/videos' },
  { folderName: 'promotional', parentFolderPath: '/mgmcet/videos' },
  { folderName: 'general', parentFolderPath: '/mgmcet/videos' },

  // documents/
  { folderName: 'documents', parentFolderPath: '/mgmcet' },
  { folderName: 'brochures', parentFolderPath: '/mgmcet/documents' },
  { folderName: 'notices', parentFolderPath: '/mgmcet/documents' },
  { folderName: 'reports', parentFolderPath: '/mgmcet/documents' },
  { folderName: 'academic', parentFolderPath: '/mgmcet/documents' },
  { folderName: 'general', parentFolderPath: '/mgmcet/documents' },
];

async function run() {
  console.log(`Starting folder creation in ImageKit (${FOLDERS_TO_CREATE.length} folders)...`);
  
  for (const item of FOLDERS_TO_CREATE) {
    const fullPath = `${item.parentFolderPath === '/' ? '' : item.parentFolderPath}/${item.folderName}`;
    try {
      await ik.createFolder({
        folderName: item.folderName,
        parentFolderPath: item.parentFolderPath
      });
      console.log(`[CREATED] ${fullPath}`);
    } catch (err) {
      const msg = err.message || JSON.stringify(err);
      if (msg.includes('already exists') || msg.includes('Duplicate') || (err.help && err.help.includes('already exists'))) {
        console.log(`[EXISTS]  ${fullPath}`);
      } else {
        console.warn(`[NOTICE]  ${fullPath}: ${msg}`);
      }
    }
  }

  console.log('Folder creation process finished.');
}

run().catch(console.error);
