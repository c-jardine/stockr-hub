import { api } from "@/utils/api";
import { type PresignedPost } from "@aws-sdk/s3-presigned-post";
import { useToast } from "@chakra-ui/react";
import React from "react";

export default function useSettingsImageUpload() {
  const [isUploading, setIsUploading] = React.useState(false);

  const toast = useToast();

  const utils = api.useUtils();
  const query = api.user.updateProfilePhoto.useMutation({
    onSuccess: async () => {
      await utils.user.getProfilePhoto.invalidate();
    },
  });

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      const file = files[0];

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
          query.mutate(`${url}${fields.key}`);
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
  }

  return { handleUpload, isUploading };
}
