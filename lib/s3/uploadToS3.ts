import { env } from "@/env";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

async function uploadToS3({
  key,
  body,
  contentType,
}: {
  key: string;
  body: string;
  contentType: string;
}) {
  const s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new PutObjectCommand({
    ACL: "public-read",
    Bucket: env.AWS_S3_BUCKET,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  const results = await s3Client.send(command);

  return results;
}

export default uploadToS3;
