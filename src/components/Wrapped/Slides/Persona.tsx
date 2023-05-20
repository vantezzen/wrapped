import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import FatHeading from "../FatHeading";
import InfoText from "../InfoText";
import HideForTime from "../HideForTime";
import Image from "next/image";

function Persona({ persona }: WrappedSlideProps) {
  return (
    <WrappedContainer>
      <Image
        src={`/personas/${persona.name}.jpeg`}
        alt={persona.name}
        width={300}
        height={300}
        className="animate-in slide-in-from-bottom fade-in duration-1000 rounded-lg"
      />

      <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000">
        Your TikTok persona is
      </InfoText>
      <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
        the {persona.name}
      </FatHeading>

      <HideForTime time={500}>
        <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
          {persona.description}
        </InfoText>
      </HideForTime>
    </WrappedContainer>
  );
}

export default Persona;
