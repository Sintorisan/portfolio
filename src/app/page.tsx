"use client";

import styles from "./page.module.css";
import { Blog } from "@/types";
import { BlogPiece } from "@/components/BloggPiece/BlogPiece";
import { getBlogs } from "@/services/apiService";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);

  useEffect(() => {
    getBlogs().then(setBlogPosts).catch(console.error);
  }, []);

  return (
    <main className="p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8">Welcome to what is going to be my portfolio!</h1>

        <section className={styles.blogSection}>
          <h2 className={styles.blogTitle}>blog</h2>

          <div className="space-y-16">
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

        <section></section>
      </div>
    </main>
  );
}
