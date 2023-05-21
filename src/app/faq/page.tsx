import Faq from "@/components/Preparation/Faq";
import FatHeading from "@/components/Wrapped/FatHeading";
import WrappedContainer from "@/components/Wrapped/WrappedContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function FaqPage() {
  return (
    <WrappedContainer>
      <FatHeading>FAQ</FatHeading>

      <Faq />

      <Link href="/">
        <Button>Back to Wrapped for TikTok</Button>
      </Link>
    </WrappedContainer>
  );
}

export default FaqPage;
