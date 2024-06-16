"use client";
import React from "react";
import { Button } from "../ui/button";
import { File } from "lucide-react";
import WrappedContainer from "../Wrapped/WrappedContainer";
import Serif from "../Serif";
import InfoText from "../Wrapped/InfoText";

function FileUpload({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <WrappedContainer>
      <div className="p-12 rounded-xl bg-brand-dark overflow-hidden max-w-xl mx-auto">
        <Serif>
          <h1 className="text-4xl md:text-5xl font-bold">
            Select your TikTok data to get started
          </h1>
        </Serif>

        <InfoText className="mt-6">
          Wrapped for TikTok needs your TikTok data to generate your statistics.
        </InfoText>
        <InfoText className="mt-3">
          Your data will not be uploaded to any server, all statistics are
          generated locally in your browser.
        </InfoText>
        <InfoText className="mt-3">
          Your exported data does not include login credentials! For more info
          on how to verify this, look at the FAQ section on the home page.
        </InfoText>

        <label htmlFor="file-upload">
          <Button
            onClick={() => {
              inputRef.current?.click();
            }}
            className="mt-6 w-full"
          >
            <File size={16} className="mr-2" />
            Select file
          </Button>
        </label>
        <input
          type="file"
          accept=".zip,.json"
          id="file-upload"
          className="hidden"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files) {
              onFileSelect(e.target.files[0]);
            }
          }}
        />
      </div>
    </WrappedContainer>
  );
}

export default FileUpload;
