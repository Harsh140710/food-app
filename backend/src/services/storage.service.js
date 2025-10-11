// src/services/storage.service.js
import dotenv from "dotenv";
import path from "path";
import ImageKit, { toFile } from "@imagekit/nodejs";

dotenv.config({ path: path.resolve("C:/Users/ayush/OneDrive/Desktop/food-app/backend/.env") });

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function uploadFile(fileBuffer, fileName) {
  // Convert buffer to a file for ImageKit
  const fileForUpload = await toFile(fileBuffer, fileName);

  // Upload directly
  const uploadedFile = await client.files.upload({
    file: fileForUpload,
    fileName,
  });

  return uploadedFile;
}
