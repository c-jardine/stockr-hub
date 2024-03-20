import { type PresignedPost } from "@aws-sdk/s3-presigned-post";
import { useToast } from "@chakra-ui/react";
import React from "react";

export default function useSettingsImageUpload() {
  const [isUploading, setIsUploading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  const toast = useToast();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      setFile(files[0] ?? null);
    }
  }

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      toast({
        title: "No photo selected",
        description: "Please select a photo to upload it.",
        status: "error",
      });
      return;
    }

    setIsUploading(true);

    const response = await fetch("/api/s3/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });

    if (response.ok) {
      const { url, fields } = (await response.json()) as PresignedPost;

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        toast({
          title: "Upload complete",
          description: "Your profile photo has been changed.",
          status: "success",
        });
      } else {
        console.error("S3 Upload Error:", uploadResponse);
        toast({
          title: "Upload failed",
          description: "Your profile photo couldn't be uploaded.",
          status: "error",
        });
      }
    } else {
      toast({
        title: "Upload failed",
        description: "Failed to get pre-signed URL.",
        status: "error",
      });
    }

    setIsUploading(false);
  }

  return { handleFileChange, handleUpload, file, isUploading };
}
