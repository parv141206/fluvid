import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");

async function getChunksWithRetry(retries = 5, delay = 500) {
  for (let i = 0; i < retries; i++) {
    let videoChunks = await fs.readdir(uploadDir);
    let filteredChunks = videoChunks
      .filter((file) => file.endsWith(".webm"))
      .sort((a, b) => a.localeCompare(b));

    if (filteredChunks.length > 0) return filteredChunks;
    await new Promise((res) => setTimeout(res, delay));
  }
  return [];
}

export async function POST(req: NextRequest) {
  try {
    await new Promise((res) => setTimeout(res, 1000));

    const dateFolder = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const timeFolder = new Date()
      .toTimeString()
      .split(" ")[0]
      .replace(/:/g, "-"); // HH-MM-SS

    const timePath = path.join(uploadDir, dateFolder, timeFolder);
    await fs.mkdir(timePath, { recursive: true });

    const filteredChunks = await getChunksWithRetry();
    if (filteredChunks.length === 0) throw new Error("No video chunks found.");

    const finalVideoPath = path.join(timePath, "final_video.webm");
    const writeStream = await fs.open(finalVideoPath, "w");

    for (const chunk of filteredChunks) {
      const chunkPath = path.join(uploadDir, chunk);
      try {
        const chunkData = await fs.readFile(chunkPath);
        await writeStream.write(chunkData);
        await fs.unlink(chunkPath);
      } catch (err) {
        console.error(`Error processing chunk ${chunk}:`, err);
      }
    }

    await writeStream.close();

    const remainingChunks = await fs.readdir(uploadDir);
    for (const chunk of remainingChunks) {
      if (chunk.endsWith(".webm")) {
        await fs.unlink(path.join(uploadDir, chunk));
      }
    }

    return NextResponse.json({
      videoUrl: `/uploads/${dateFolder}/${timeFolder}/final_video.webm`,
    });
  } catch (error) {
    console.error("Finalization error:", error);
    return NextResponse.json(
      { message: "Finalization error." },
      { status: 500 },
    );
  }
}
