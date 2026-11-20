import { getImageKitClient } from "./imagekit";

export const ALLOWED_MIME_TYPES = {
  images: [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
    "image/avif",
    "image/x-icon",
  ],
  videos: ["video/mp4", "video/webm", "video/quicktime", "video/x-matroska"],
  documents: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ],
};

export const MAX_FILE_SIZE = {
  image: 25 * 1024 * 1024, // 25 MB
  video: 100 * 1024 * 1024, // 100 MB
  document: 150 * 1024 * 1024, // 150 MB
};

export interface UploadOptions {
  file: Buffer | string; // Buffer or Base64 string
  fileName: string;
  folder: string;
  tags?: string[];
  useUniqueFileName?: boolean;
  mimeType?: string;
  fileSizeBytes?: number;
}

export interface UploadResult {
  fileId: string;
  name: string;
  url: string;
  filePath: string;
  fileType: string;
  height?: number;
  width?: number;
  size: number;
}

/**
 * Validates file size against allowed categories.
 */
export function validateFileSize(sizeBytes: number, category: "image" | "video" | "document"): void {
  const limit = MAX_FILE_SIZE[category];
  if (sizeBytes > limit) {
    throw new Error(
      `File size (${(sizeBytes / (1024 * 1024)).toFixed(2)} MB) exceeds allowed limit of ${(limit / (1024 * 1024)).toFixed(0)} MB for ${category}.`
    );
  }
}

/**
 * Uploads a file to ImageKit using the official SDK.
 * Server-side only.
 */
export async function uploadToImageKit(options: UploadOptions): Promise<UploadResult> {
  const { file, fileName, folder, tags, useUniqueFileName = false, fileSizeBytes, mimeType } = options;

  if (!file) {
    throw new Error("No file content provided for upload.");
  }
  if (!fileName) {
    throw new Error("File name is required for ImageKit upload.");
  }
  if (!folder) {
    throw new Error("Target folder path is required for ImageKit upload.");
  }

  // Type check if mimeType provided
  if (mimeType) {
    const isImage = ALLOWED_MIME_TYPES.images.includes(mimeType);
    const isVideo = ALLOWED_MIME_TYPES.videos.includes(mimeType);
    const isDoc = ALLOWED_MIME_TYPES.documents.includes(mimeType);

    if (!isImage && !isVideo && !isDoc) {
      throw new Error(`Unsupported MIME type: ${mimeType}`);
    }

    if (fileSizeBytes) {
      const category = isImage ? "image" : isVideo ? "video" : "document";
      validateFileSize(fileSizeBytes, category);
    }
  }

  const client = getImageKitClient();

  const response = await client.upload({
    file,
    fileName,
    folder,
    tags: tags || ["mgmcet"],
    useUniqueFileName,
  });

  return {
    fileId: response.fileId,
    name: response.name,
    url: response.url,
    filePath: response.filePath,
    fileType: response.fileType,
    height: response.height,
    width: response.width,
    size: response.size,
  };
}
