/**
 * Client-Side ImageKit Media Uploader for Admin Panel.
 * Supports direct browser uploads of high-resolution photos and videos to ImageKit.
 */

export interface ClientUploadResult {
  fileId: string;
  url: string;
  name: string;
  fileType: "image" | "video";
  thumbnailUrl?: string;
}

export async function uploadMediaToImageKit(
  file: File,
  options?: {
    folder?: string;
    tags?: string[];
    onProgress?: (progressPercent: number) => void;
  }
): Promise<ClientUploadResult> {
  const privateKey = process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "";
  if (!privateKey) {
    throw new Error(
      "ImageKit upload is not configured. Please set NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY in your environment variables."
    );
  }

  const isVideo = file.type.startsWith("video/") || /\.(mp4|webm|mov|mkv)$/i.test(file.name);
  const isImage = file.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name);

  if (!isImage && !isVideo) {
    throw new Error("Unsupported media format. Please upload an image (JPG, PNG, WebP) or video (MP4, WebM, MOV).");
  }

  // Size limit: 25MB for images, 100MB for videos
  const maxBytes = isVideo ? 100 * 1024 * 1024 : 25 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(
      `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds maximum allowed limit of ${
        isVideo ? "100" : "25"
      } MB.`
    );
  }

  const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const folder = options?.folder || "/mgmcet/gallery";
  const tags = (options?.tags || ["gallery", "mgmcet"]).join(",");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", cleanFileName);
  formData.append("folder", folder);
  formData.append("tags", tags);
  formData.append("useUniqueFileName", "true");

  const authHeader = "Basic " + btoa(`${privateKey}:`);

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: authHeader,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message ||
        `ImageKit upload failed with status ${response.status} (${response.statusText})`
    );
  }

  const result = await response.json();

  const fileType: "image" | "video" =
    result.fileType === "video" || isVideo ? "video" : "image";

  return {
    fileId: result.fileId,
    url: result.url,
    name: result.name,
    fileType,
    thumbnailUrl: result.thumbnailUrl || (fileType === "image" ? result.url : undefined),
  };
}
