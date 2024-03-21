import {
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const uploadFile = async (file: File): Promise<string> => {
  // Get the upload URL from the server
  const uploadUrlResult = await fetch(
    "/api/uploadthing?actionType=upload&slug=imageUploader",
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        files: [
          {
            name: file.name,
            size: file.size,
            type: file.type,
          },
        ],
      }),
    }
  );

  // If the server fails to return an upload URL, throw an error
  if (!uploadUrlResult.ok) {
    throw new Error("Failed to get upload URL");
  }

  const uploadUrlJson = (await uploadUrlResult.json())[0];
  const fileUrl = uploadUrlJson.fileUrl;

  // Prepare the form data with the fields received from the server and the file
  const formData = new FormData();

  // append the fields to the form data received from the server
  const fields = Object.keys(uploadUrlJson.fields);
  fields.forEach((field) => {
    formData.append(field, uploadUrlJson.fields[field]);
  });

  // append the file to the form data
  formData.append("file", file);

  const uploadUrl = uploadUrlJson.url;

  // Upload the file to the server
  const uploadResult = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  // If the server fails to return a successful response, throw an error
  if (!uploadResult.ok) {
    throw new Error("Failed to upload file");
  }

  const pollingUrl = uploadUrlJson.pollingUrl;

  // Poll the server until the file is done uploading
  while (true) {
    let pollingResult = await fetch(pollingUrl, {
      headers: {
        authorization: uploadUrlJson.pollingJwt,
      },
    });
    let pollingJson = await pollingResult.json();
    if (!pollingResult.ok || pollingJson.status === "error") {
      throw new Error("Failed to upload file");
    }

    // If the file is done uploading, break the loop
    if (pollingJson.status === "done") {
      break;
    }
  }

  return fileUrl as string;
};
