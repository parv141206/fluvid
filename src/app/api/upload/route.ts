import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const chunk = formData.get("videoChunk") as Blob;

    if (!chunk || chunk.size < 1000) {
      return NextResponse.json(
        { message: "Invalid or empty chunk." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await chunk.arrayBuffer());
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.webm`;
    const filePath = path.join(uploadDir, fileName);

    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ message: "Chunk uploaded.", fileName });
  } catch (error) {
    console.error("Error uploading chunk:", error);
    return NextResponse.json({ message: "Upload error." }, { status: 500 });
  }
}
