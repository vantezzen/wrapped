import React from "react";
import ProjectCard from "./ProjectCard";

function Projects() {
  return (
    <div className="text-left max-w-3xl mx-auto mt-12">
      <p className="font-bold text-lg">Check out my other projects:</p>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-6 gap-8">
        <ProjectCard
          title="WonderRail"
          description="Easily plan your Interrail/Eurail trip across Europe"
          image="/projects/wonderrail.png"
          link="https://wonderrail.com"
        />
        <ProjectCard
          title="Skip Silence"
          description="Skip silent parts in video lectures and other videos"
          image="/projects/skipsilence.png"
          link="https://vantezzen.io/get/skipsilence"
        />
        <ProjectCard
          title="Melody Mayhem"
          description="Let your Spotify playlists battle it out!"
          image="/projects/melodymayhem.png"
          link="https://melody-mayhem.vantezzen.io/"
        />
        <ProjectCard
          title="neonFin"
          description="Discover Your Hidden Spending Habits"
          image="/projects/neonfin.png"
          link="https://neonfin.app"
        />
      </div>
    </div>
  );
}

export default Projects;
