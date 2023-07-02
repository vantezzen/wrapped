import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

function ProjectCard({
  title,
  description,
  image,
  link,
}: {
  title: string;
  description: string;
  image: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="h-full"
      onClick={() => {
        trackEvent(
          "project_card_click_" + title.toLowerCase().replace(" ", "_")
        );
      }}
    >
      <Card className="dark duration-500 transform hover:scale-[102%] border-none h-full">
        <CardHeader>
          <Image
            src={image}
            width={200}
            height={200}
            alt={title}
            style={{
              objectFit: "cover",
              width: "100%",
              aspectRatio: "1/1",
              borderRadius: 5,
            }}
          />
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm">{description}</p>
        </CardContent>
      </Card>
    </a>
  );
}

export default ProjectCard;
