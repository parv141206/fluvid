"use client";

import Help from "@/components/Help";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import Link from "next/link";
import { useRef, useState } from "react";

export default function VideoRecorder() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [backendUrl, setBackendUrl] = useState("http://localhost:3000/");
  const [isBackCamera, setIsBackCamera] = useState(false);

  const startStreamAndRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isBackCamera ? "environment" : "user",
        },
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      recorder.ondataavailable = async (e: BlobEvent) =>
        await uploadChunk(e.data);
      recorder.onstop = async () => await finalizeChunks();

      setMediaRecorder(recorder);
      setIsRecording(true);
      recorder.start(5 * 1000);
      startTimer();
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const uploadChunk = async (chunk: Blob) => {
    const formData = new FormData();
    formData.append("videoChunk", chunk);
    try {
      await fetch(`${backendUrl}/api/upload`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error("Error uploading chunk:", error);
    }
  };

  const finalizeChunks = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/finalize`, {
        method: "POST",
      });
      const result = await response.json();
      if (result.videoUrl) {
        setRecordedUrl(result.videoUrl);
      }
    } catch (error) {
      console.error("Error finalizing video:", error);
    }
  };

  const stopRecording = async () => {
    if (!mediaRecorder) return;

    setIsRecording(false);
    stopTimer();

    await new Promise((resolve) => setTimeout(resolve, 500));

    mediaRecorder.stop();
  };

  const startTimer = () => {
    setTimer(0);
    timerRef.current = setInterval(() => setTimer((prev) => prev + 1), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="container mx-auto my-5 flex flex-col gap-3 p-5 dark">
      <div className="text-5xl">Record</div>
      <Help />
      <div className="text-3xl">Options</div>
      <label htmlFor="backendUrl">Backend URL</label>
      <div className="flex gap-3">
        <Input
          className="w-fit"
          value={backendUrl}
          onChange={(e) => setBackendUrl(e.target.value)}
        />
        {backendUrl === "" ? (
          <div className="text-red-400 flex items-center justify-center">
            Backend URL is required
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-lg font-semibold">Camera</span>
        <Toggle
          pressed={isBackCamera}
          onPressedChange={() => setIsBackCamera((prev) => !prev)}
          className="bg-gray-700 data-[state=on]:bg-blue-500 px-3 py-1 text-white rounded-md"
        >
          {isBackCamera ? "Back" : "Front"}
        </Toggle>
      </div>
      <video
        ref={videoRef}
        className="border rounded-lg mt-4"
        width={400}
        height={300}
      />
      {isRecording && (
        <p className="mt-2 text-red-500">Recording... {timer}s</p>
      )}
      <div className="mt-4 space-x-2">
        {!isRecording ? (
          <button
            onClick={startStreamAndRecording}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Start
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Finish
          </button>
        )}
      </div>
      {recordedUrl && (
        <div className="mt-4">
          <p className="text-green-500">Recording finished!</p>
        </div>
      )}
    </div>
  );
}
