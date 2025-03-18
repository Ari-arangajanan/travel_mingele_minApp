export interface UploadImageRequest {
    contentType: string; // Example: "image/jpeg", "image/png", "image/gif"
    imageData: ArrayBuffer  // The binary image data
  }