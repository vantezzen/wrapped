import React from "react";
import ProjectCard from "./ProjectCard";

function Projects() {
  return (
    <div className="text-left max-w-3xl mx-auto mt-12">
      <p className="font-bold text-lg">Check out my other projects:</p>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-6 gap-8">
        <ProjectCard
          title="Wrapped for Doordash"
          description="How many burgers did you order last year? Find out with Wrapped for Doordash"
          image="/projects/doordash.png"
          link="https://doordash.vantezzen.io/"
        />
        <ProjectCard
          title="Wrapped for Apple Health"
          description="How many naps did you take last year? Find out with Wrapped for Apple Health"
          image="/projects/health.png"
          link="https://health.vantezzen.io"
        />
        <ProjectCard
          title="Purrsona"
          description="Feline Groovy? Let AI create a Spotify playlist for your pet"
          image="/projects/purrsona.png"
          link="https://purrsona.vantezzen.io"
        />
        <ProjectCard
          title="WonderRail"
          description="Easily plan your Interrail/Eurail trip across Europe"
          image="/projects/wonderrail.png"
          link="https://wonderrail.com"
        />
      </div>
    </div>
  );
}

export default Projects;
