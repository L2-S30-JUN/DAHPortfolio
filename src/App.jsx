import { useState } from "react";
import Preloader from "./components/Preloader.jsx";
import Particles from "./components/Particles.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Timeline from "./components/Timeline.jsx";
import VideoWorks from "./components/VideoWorks.jsx";
import ToyProjects from "./components/ToyProjects.jsx";
import Contact from "./components/Contact.jsx";
import { education, awards } from "./data.js";

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative">
      <Preloader onDone={() => setEntered(true)} />
      <Particles />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero entered={entered} />
          <Marquee />
          <Timeline
            id="education"
            index="01"
            title="EDUCATION"
            subtitle="학력"
            items={education}
          />
          <VideoWorks />
          <ToyProjects />
          <Timeline
            id="award"
            index="04"
            title="AWARD"
            subtitle="수상"
            items={awards}
          />
          <Contact />
        </main>
      </div>
    </div>
  );
}
