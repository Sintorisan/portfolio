import styles from "./BloggPiece.module.css";

export const BloggPiece = ({ title, date, bloggContent }: Blogg) => {
  return (
    <>
      <div className={styles.titleHeader}>
        <h1>{title}</h1>
        <p>{date}</p>
      </div>
      <div className={styles.bloggContent}>{bloggContent}</div>
    </>
  );
};
