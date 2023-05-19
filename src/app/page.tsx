import FatHeading from "@/components/Wrapped/FatHeading";
import MutedText from "@/components/Wrapped/MutedText";
import Image from "next/image";
import heroImage from "./hero.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col gap-6 p-6 text-zinc-900 bg-starship-400">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col justify-center items-center gap-6 text-center">
          <FatHeading>Wrapped for TikTok</FatHeading>
          <MutedText>
            Get a personalized report about your time on TikTok 🚀
          </MutedText>

          <Link href="/app">
            <Button>
              Get Wrapped now
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </Link>
        </div>
        <div>
          <Image
            src={heroImage}
            alt="Wrapped for TikTok"
            width={1080}
            height={1920}
            style={{
              maxHeight: "80vh",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
