"use client";
import AppFlow from "@/components/AppFlow";
import { Particles } from "@/components/magicui/particles";
import TextPressure from "@/components/TextPressure";
import ShinyText from "@/components/ShinyText";
import React, { useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import gsap from "gsap";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    gsap.fromTo(
      ".blur",
      { filter: "blur(10px)", y: 20 },
      {
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        ease: "power1",
      },
    );
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      <div className="flex items-center justify-center container px-7 mx-auto">
        <div className="flex flex-col items-center justify-center gap-7">
          <TextPressure
            className="title blur md:mx-0 mx-5"
            text="Fluvid"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={60}
          />
          <ShinyText
            text="Record large videos with ease!"
            disabled={false}
            speed={3}
            className="mx-7 md:text-5xl text-3xl text-center blur"
          />
          <Link className="blur" href={"/record"}>
            <button className="rounded-3xl border-gray-400 border w-fit transition-all hover:-translate-y-1 px-3 py-1 bg-white/5 text-3xl">
              <ShinyText
                text="Get Started"
                disabled={false}
                speed={3}
                className=""
              />
            </button>
          </Link>
        </div>
        {/* <div className="md:w-[40%] flex items-center justify-center">
           <ReactFlowProvider>
            <AppFlow />
          </ReactFlowProvider>         </div>*/}
      </div>
    </div>
  );
}
