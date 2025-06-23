import styles from "@/components/Modals/Modal.module.css";
import { Blog } from "@/types";
import { useEffect, useState } from "react";
import { getBlogById } from "@/app/api/blog/route";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export const BlogModal = ({ isOpen, onClose, id }: Props) => {
  const [blogPost, setBlogPost] = useState<Blog | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      getBlogById(id).then(setBlogPost).catch(console.error);
    }
  }, [id, isOpen]);

  if (!isOpen || !blogPost) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <span className={styles.fileName}>{blogPost.title}</span>
          <button className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={`${styles.modalBody} ${styles.blogBody}`}>
          <article className={styles.blogContent}>
            <h2 className={styles.blogTitle}>{blogPost.title}</h2>
            <p className={styles.blogMeta}>{blogPost.date}</p>
            {blogPost.blogContent.split("\n").map((paragraph, i) => (
              <p key={i} className={styles.blogParagraph}>
                {paragraph}
              </p>
            ))}
          </article>
        </div>
      </div>
    </div>
  );
};
