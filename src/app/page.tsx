"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { Section } from "@/components/Section/Section";
import { EndpointItem } from "@/components/EndpointItem/EndpointItem";
import { AboutMe } from "@/components/EndpointResponses/AboutMe";
import { AboutProf } from "@/components/EndpointResponses/AboutProf";
import { CareerEdu } from "@/components/EndpointResponses/CareerEdu";
import { ImgModal } from "@/components/Modals/ImgModal";
import { BlogModal } from "@/components/Modals/BlogModal";
import { CareerExp } from "@/components/EndpointResponses/CareerExp";
import { BlogPosts } from "@/components/EndpointResponses/BlogPosts";
import { Projects } from "@/components/EndpointResponses/Projects";
import { Socials } from "@/components/EndpointResponses/Socials";
import { ContactMe } from "@/components/EndpointResponses/ContactMe";

export default function Home() {
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState("default");

  const themeNames = [
    "default",
    "solarwave",
    "mintchip",
    "neonterminal",
    "cosmicdust",
    "winterfox",
    "sunsetcreek",
    "midnightcircuit",
    "forestbrew",
    "magentadream",
    "peachsand",
  ];

  const themeEmojis: Record<string, string> = {
    solarwave: "🌞",
    mintchip: "🍦",
    neonterminal: "🖥️",
    cosmicdust: "🌌",
    winterfox: "🦊",
    sunsetcreek: "🌇",
    midnightcircuit: "🌙",
    forestbrew: "🌲",
    magentadream: "💜",
    peachsand: "🍑",
  };

  const handleRandomTheme = () => {
    let random = getRandomTheme();
    while (random == currentTheme) {
      random = getRandomTheme();
    }
    setCurrentTheme(random);
    document.documentElement.className = random;
  };

  const getRandomTheme = () => {
    return themeNames[Math.floor(Math.random() * themeNames.length)];
  };

  return (
    <main className={styles.mainWrapper}>
      <button onClick={handleRandomTheme} className={styles.themeToggleButton}>
        🎲 Theme Roulette
        <br />
        <span className={styles.themeName}>
          Theme:{" "}
          <code>
            {currentTheme} {themeEmojis[currentTheme]}
          </code>
        </span>
      </button>{" "}
      <div className={styles.contentWrapper}>
        <header className={styles.headerSection}>
          <h1 className={styles.pageTitle}>Welcome to My Developer Portfolio</h1>
          <p className={styles.introText}>
            Hey! I’m Sindri, a .NET developer who enjoys building things, solving problems, and
            learning along the way. This site is my portfolio, my little corner of the internet
            where I showcase what I’ve built and share thoughts through my blog. Take a look around,
            and if you’re curious, scroll down and check out the blog!
          </p>
        </header>

        <Section header="About">
          <EndpointItem method="GET" url="/about/me">
            <AboutMe />
          </EndpointItem>
          <EndpointItem method="GET" url="/about/professional">
            <AboutProf />
          </EndpointItem>
        </Section>

        <Section header="Career">
          <EndpointItem method="GET" url="/career/education">
            <CareerEdu onOpenImage={(imgUrl) => setSelectedImageUrl(imgUrl)} />
          </EndpointItem>
          <EndpointItem method="GET" url="/career/experience">
            <CareerExp />
          </EndpointItem>
        </Section>

        <Section header="Projects">
          <EndpointItem method="GET" url="/projects">
            <Projects onOpenImage={(imgUrl) => setSelectedImageUrl(imgUrl)} />
          </EndpointItem>
        </Section>

        <Section header="Blog">
          <EndpointItem method="GET" url="/blog/posts">
            <BlogPosts onOpenBlog={(blogPost) => setSelectedBlog(blogPost)} />
          </EndpointItem>
        </Section>

        <Section header="Social">
          <EndpointItem method="GET" url="/social">
            <Socials />
          </EndpointItem>
        </Section>

        <Section header="Contact">
          <EndpointItem method="Post" url="/contact/me">
            <ContactMe />
          </EndpointItem>
        </Section>
      </div>
      {selectedImageUrl && (
        <ImgModal title={selectedImageUrl} isOpen={true} onClose={() => setSelectedImageUrl(null)}>
          <img src={`img/${selectedImageUrl}`} alt="image" />
        </ImgModal>
      )}
      {selectedBlog && (
        <BlogModal id={selectedBlog} isOpen={true} onClose={() => setSelectedBlog(null)} />
      )}
    </main>
  );
}
