import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import InfoText from "../InfoText";
import FatHeading from "../FatHeading";
import CountUp from "react-countup";
import HideForTime from "../HideForTime";
import lookup from "@/lib/utils/lookup";
import SlideContainer from "../SlideContainer";

const gbPerYear = {
  0: 1960,
  1: 1967,
  2: 1969,
  3: 1970,
  4: 1971,
  6: 1972,
  9: 1973,
  12: 1974,
  17: 1975,
  25: 1976,
  35: 1977,
  50: 1978,
  70: 1979,
  100: 1980,
  158: 1981,
  251: 1982,
  398: 1983,
  630: 1984,
  1000: 1985,
  1584: 1986,
  2511: 1987,
  3981: 1988,
  6309: 1989,
  10000: 1990,
};

function formatBytes(bytes: number) {
  if (!+bytes)
    return {
      value: 0,
      unit: "Bytes",
    };

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return {
    value: Math.round(bytes / Math.pow(k, i)),
    unit: sizes[i],
  };
}

function TotalStorage({ statistics }: WrappedSlideProps) {
  const totalMegabytes =
    (statistics.watchSessions.totalWatchTimeSec / 3600) * 160;
  const totalBytes = totalMegabytes * 1024 * 1024;
  const totalGigabytes = totalMegabytes / 1024;
  const formattedBytes = formatBytes(totalBytes);

  return (
    <WrappedContainer>
      <SlideContainer>
        <InfoText>While scrolling, TikTok downloaded around</InfoText>

        <FatHeading className="animate-in slide-in-from-bottom fade-in duration-1000">
          <CountUp end={formattedBytes.value} duration={2} />{" "}
          {formattedBytes.unit}
        </FatHeading>

        <HideForTime time={500}>
          <InfoText className="animate-in slide-in-from-bottom fade-in duration-1000 delay-500">
            That's about the total data storage worldwide in{" "}
            <span className="font-bold">
              {lookup(totalGigabytes, gbPerYear)}
            </span>
          </InfoText>
        </HideForTime>
      </SlideContainer>
    </WrappedContainer>
  );
}

export default TotalStorage;
