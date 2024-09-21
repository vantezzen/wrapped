import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import Wrapped from "@/lib/Wrapped";
import donateData from "./utils";
import { Loader2 } from "lucide-react";
import wait from "@/lib/utils/wait";

enum ModalState {
  Open,
  Loading,
  Closed,
  Thanks,
  Error,
}

function DonateModal({ Wrapped }: { Wrapped: Wrapped }) {
  const [state, setState] = React.useState<ModalState>(ModalState.Open);

  if (Wrapped.demoMode) return null;
  // if (state === ModalState.Closed) return null;

  if (state === ModalState.Thanks) {
    return (
      <Dialog
        open={true}
        onOpenChange={() => {
          setState(ModalState.Closed);
        }}
      >
        <DialogContent>
          <DialogHeader>Thank you!</DialogHeader>
          <DialogDescription>
            Your data has been successfully donated. Thank you for helping us
            with our research!
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={() => {
                setState(ModalState.Closed);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (state === ModalState.Error) {
    return (
      <Dialog
        open={true}
        onOpenChange={() => {
          setState(ModalState.Closed);
        }}
      >
        <DialogContent>
          <DialogHeader>Couldn't upload data</DialogHeader>
          <DialogDescription>
            Thank you for being open to donating your data. Unfortunately, we
            had an issue uploading it - well that's our fault.
          </DialogDescription>
          <DialogFooter>
            <Button
              onClick={() => {
                setState(ModalState.Closed);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (state === ModalState.Loading) {
    return (
      <div className="fixed top-0 right-0 m-8 rounded-full p-4 bg-white flex items-center justify-center gap-3 shadow-lg">
        <Loader2 className="animate-spin" size={16} />
        <span className="font-medium text-zinc-500 text-sm">
          Donating data, please keep the page open...
        </span>
      </div>
    );
  }

  return (
    <Dialog
      open={state === ModalState.Open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setState(ModalState.Closed);
      }}
    >
      <DialogContent>
        <DialogHeader>Data Donation for Research</DialogHeader>
        <DialogDescription>
          That was fun, wasn't it? We are currently working on a research
          project about large-scale impact of TikTok usage on the society.{" "}
          <br />
          You would help us a lot by donating your TikTok usage data. Don't
          worry - we'll make sure to anonymize it and keep it safe in servers in
          the EU!
          <br />
          <br />
          By donating your data, you agree to our{" "}
          <Link href="/legal/donate" target="_blank" className="underline">
            data donation policy
          </Link>{" "}
          - just so we are safe and you know what's happening with your data.
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={async () => {
              setState(ModalState.Loading);
              await wait(10);
              try {
                await donateData(Wrapped);
              } catch (e) {
                console.error(e);
                setState(ModalState.Error);
                return;
              }
              setState(ModalState.Thanks);
            }}
          >
            Donate Data
          </Button>
          <Button
            onClick={() => {
              setState(ModalState.Closed);
            }}
            variant="ghost"
          >
            No, thanks
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DonateModal;
