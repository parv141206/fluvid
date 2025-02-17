import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import React, { ReactNode } from "react";

const Step = ({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) => (
  <div className="flex items-start">
    <p className="mr-3 flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
      {number}
    </p>
    <p>{children}</p>
  </div>
);

const CodeBlock = ({ children }: { children: ReactNode }) => (
  <code className="px-2 py-1 bg-gray-900 rounded-md text-sm">{children}</code>
);

const HelpSection = ({
  title,
  description,
  steps,
}: {
  title: string;
  description: string;
  steps: any;
}) => (
  <div className="p-6 rounded-lg shadow-lg">
    <p className="text-lg font-semibold">{title}</p>
    <p className="mt-3">{description}</p>
    <p className="mt-4 font-medium">Steps to set up:</p>
    <div className="mt-3 space-y-3">{steps}</div>
  </div>
);

export default function Help() {
  return (
    <div>
      <Dialog>
        <div className="text-xl bg-gray-950 border border-gray-900 p-3 rounded-md">
          <span className="inline">
            Before filling up the options, if this is your first time, kindly
            read
          </span>
          <Link href="/" className="mx-1 underline inline">
            documentations
          </Link>
          <span className="inline">or the</span>
          <DialogTrigger className="mx-1 px-2 py-1 bg-green-400 text-black rounded-sm">
            Help
          </DialogTrigger>

          <span className="inline">tab.</span>
        </div>

        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle>How to run the app</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-scroll max-h-[50vh] space-y-1">
            <HelpSection
              title="Running the frontend and backend locally (Recommended)"
              description="This method allows you to run both the frontend and backend on your local machine and expose it via port forwarding to a public URL."
              steps={
                <>
                  <Step number="1">Clone this repository to your PC.</Step>
                  <Step number="2">
                    In the root directory of the project (just outside src){" "}
                    <br />
                    create a dir named "uploads"
                    <br />
                    Your videos are saved here!
                  </Step>
                  <Step number="3">
                    Build it for production using{" "}
                    <CodeBlock>npm run build</CodeBlock>.
                  </Step>
                  <Step number="4">
                    Run the production server using{" "}
                    <CodeBlock>npm run start</CodeBlock>.
                  </Step>
                  <Step number="5">
                    Now install ngrok. <br />
                    In a new terminal run <CodeBlock>
                      ngrok http 3000
                    </CodeBlock>{" "}
                    <br />
                    It exposes the app to the internet and provides a public
                    URL.
                  </Step>
                  <Step number="6">
                    Copy the public URL. <br />
                    Use it to access the frontend. <br />
                    Paste the same URL for the 'Backend URL'. <br />
                    You should be good to go!
                  </Step>
                </>
              }
            />
            <p className="text-lg">CURRENTLY ONLY TESTED FOR LINUX</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
