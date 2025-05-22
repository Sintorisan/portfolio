import styles from "./BlogPiece.module.css";
import { Blog } from "@/types";

export const BlogPiece = ({ title, date, blogContent }: Blog) => {
  return (
    <>
      <div className={styles.titleHeader}>
        <h1>{title}</h1>
        <p>{date}</p>
      </div>
      <div className={styles.blogContent}>{blogContent}</div>
    </>
  );
};
