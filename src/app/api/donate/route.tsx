import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const runtime = "edge";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.S3_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  const body = await request.json();

  const randomId = Math.random().toString(36).substring(7);

  const data = {
    ...body,
    id: randomId,
    user: {
      country: request.headers.get("X-Vercel-IP-Country"),
      region: request.headers.get("X-Vercel-IP-Country-Region"),
      uploadTime: new Date().toISOString(),
    },
  };

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: `${Date.now()}_${randomId}.json`,
      Body: JSON.stringify(data),
    })
  );

  return new Response("OK");
}
