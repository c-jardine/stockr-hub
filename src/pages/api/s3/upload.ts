import { env } from "@/env";
import { S3Client } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { type NextApiRequest, type NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

interface RequestBody extends NextApiRequest {
  body: {
    filename: string;
    contentType: string;
  };
}

export default async function handler(req: RequestBody, res: NextApiResponse) {
  try {
    const { contentType } = req.body;

    if (req.method === "POST") {
      const s3Client = new S3Client({
        region: env.AWS_REGION,
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
      });

      const { url, fields } = await createPresignedPost(s3Client, {
        Bucket: env.AWS_S3_BUCKET,
        Key: `profile-photo.${contentType.split("/")[1]}`,
        Fields: {
          contentType,
        },
        Expires: 600,
      });

      return res.status(200).json({ url, fields });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  }
}
