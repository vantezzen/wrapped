import Container from "@/components/Image/Container";
import Footer from "@/components/Image/Footer";
import TableRow from "@/components/Image/TableRow";
import Waves from "@/components/Image/Waves";
import { ShareImageDataSchema } from "@/lib/types";
import formatTimeLength from "@/lib/utils/formatTimeLength";
import { ImageResponse } from "next/server";

export const runtime = "edge";

const interBlack = fetch(
  new URL("./Inter/Inter-Black.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(request: Request) {
  const interBlackData = await interBlack;

  const { searchParams } = new URL(request.url);
  const reqData = ShareImageDataSchema.safeParse(
    JSON.parse(searchParams.get("data") ?? "{}")
  );

  if (!reqData.success) {
    return new Response("Invalid request", { status: 400 });
  }

  const { data } = reqData;

  const { amount: totalWatchTimeAmount, unit: totalWatchTimeUnit } =
    formatTimeLength(data.totalWatchTime);

  const { amount: averageSessionLengthAmount, unit: averageSessionLengthUnit } =
    formatTimeLength(data.averageSessionLength);

  return new ImageResponse(
    (
      <Container>
        <Waves />
        <h1
          style={{
            fontFamily: "Inter",
            fontWeight: 900,
            fontSize: "72px",
          }}
        >
          {data.name}'s
        </h1>
        <h1
          style={{
            fontFamily: "Inter",
            fontWeight: 900,
            fontSize: "72px",
          }}
        >
          Wrapped for TikTok
        </h1>

        <table
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "120px",
          }}
        >
          <TableRow title="Persona" value={data.persona} />
          <TableRow
            title="Total videos watched"
            value={data.totalVideosWatched.toLocaleString()}
          />
          <TableRow
            title="Total watch time"
            value={`${totalWatchTimeAmount} ${totalWatchTimeUnit}`}
          />
          <TableRow
            title="Watch sessions"
            value={data.totalWatchSessions.toLocaleString()}
          />
          <TableRow
            title="Average session length"
            value={`${Math.abs(
              averageSessionLengthAmount
            )} ${averageSessionLengthUnit}`}
          />
          <TableRow
            title="Total comments"
            value={data.totalComments.toLocaleString()}
          />
          <TableRow
            title="Total likes"
            value={data.totalLikes.toLocaleString()}
          />

          <TableRow title="Most used emoji" value={`${data.mostUsedEmoji}`} />
        </table>

        <Footer />
      </Container>
    ),
    {
      width: 1080,
      height: 1920,
      fonts: [
        {
          name: "Inter",
          data: interBlackData,
          weight: 900,
          style: "normal",
        },
      ],
    }
  );
}
