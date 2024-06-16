import React from "react";
import ProjectCard from "./ProjectCard";

function Projects() {
  return (
    <div className="text-left max-w-3xl mx-auto mt-12">
      <p className="font-bold text-lg">Check out my other projects:</p>
      <div className="grid grid-cols-2 mt-6 gap-8">
        <ProjectCard
          title="SparkTunes"
          description="A 'Top Trumps'-style game that lets you play with your Spotify music"
          image="/projects/sparktunes.png"
          link="https://sparktunes.vantezzen.io"
        />
        <ProjectCard
          title="Roast Me, Robert"
          description="Let Robert roast your selfies with AI"
          image="/projects/robert.webp"
          link="https://roast.vantezzen.io"
        />
        <ProjectCard
          title="Wrapped for Instagram"
          description="How many stories did you post last year? Find out with Wrapped for Instagram"
          image="/projects/instagram.png"
          link="https://ig.vantezzen.io/"
        />
        <ProjectCard
          title="Wrapped for Doordash"
          description="How many burgers did you order last year? Find out with Wrapped for Doordash"
          image="/projects/doordash.png"
          link="https://doordash.vantezzen.io/"
        />
        {/* <ProjectCard
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
        /> */}
        <ProjectCard
          title="WonderRail"
          description="Easily plan your Interrail/Eurail trip across Europe"
          image="/projects/wonderrail.png"
          link="https://wonderrail.com"
        />
        {/* <ProjectCard
          title="Melody Mayhem"
          description="Let your Spotify playlists battle it out!"
          image="/projects/melodymayhem.png"
          link="https://melody-mayhem.vantezzen.io/"
        /> */}
        {/* <ProjectCard
          title="neonFin"
          description="Discover Your Hidden Spending Habits"
          image="/projects/neonfin.png"
          link="https://neonfin.app"
        /> */}
        <ProjectCard
          title="Skip Silence"
          description="Skip silent parts in video lectures and other videos"
          image="/projects/skipsilence.png"
          link="https://vantezzen.io/get/skipsilence"
        />
      </div>
    </div>
  );
}

export default Projects;
