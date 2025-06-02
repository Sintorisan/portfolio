"use client";

import styles from "./page.module.css";
import { Blog } from "@/types";
import { BlogPiece } from "@/components/BloggPiece/BlogPiece";
import { getBlogs } from "@/services/apiService";
import { useEffect, useState } from "react";
import { Section } from "@/components/Section/Section";
import { EndpointItem } from "@/components/EndpointItem/EndpointItem";
import { AboutMe } from "@/components/EndpointResponses/AboutMe";
import { AboutProf } from "@/components/EndpointResponses/AboutProf";
import { CareerEdu } from "@/components/EndpointResponses/CareerEdu";
import { ImgModal } from "@/components/Modals/ImgModal";
import { CareerExp } from "@/components/EndpointResponses/CareerExp";
import { BlogPosts } from "@/components/EndpointResponses/BlogPosts";
import { Projects } from "@/components/EndpointResponses/Projects";
import { Socials } from "@/components/EndpointResponses/Socials";
import { ContactMe } from "@/components/EndpointResponses/ContactMe";

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    getBlogs().then(setBlogPosts).catch(console.error);
  }, []);

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.contentWrapper}>
        <header className={styles.headerSection}>
          <h1 className={styles.pageTitle}>Welcome to My Developer Portfolio</h1>
          <p className={styles.introText}>
            Hey! I’m Sindri, a junior .NET developer who likes building things and learning by
            doing. This site is my portfolio, my own little corner of the internet, and a place
            where I’m teaching myself Next.js and TypeScript as I build. It’s still a work in
            progress, so don’t be surprised if a few endpoints don’t show what they’re supposed to
            just yet. For now, the blog posts are hanging out at the bottom of the page, so feel
            free to scroll down and give them a read!
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
            <Projects />
          </EndpointItem>
        </Section>

        <Section header="Blog">
          <EndpointItem method="GET" url="/blog/posts">
            <BlogPosts />
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

        <section className={styles.blogSection}>
          <h2 className={styles.blogTitle}>blog</h2>
          <div className={styles.blogList}>
            {blogPosts.map((blogPost, index) => (
              <BlogPiece
                key={index}
                title={blogPost.title}
                date={blogPost.date}
                blogContent={blogPost.blogContent}
              />
            ))}
          </div>
        </section>
      </div>

      {selectedImageUrl && (
        <ImgModal title={selectedImageUrl} isOpen={true} onClose={() => setSelectedImageUrl(null)}>
          <img src={`img/${selectedImageUrl}`} />
        </ImgModal>
      )}
    </main>
  );
}
