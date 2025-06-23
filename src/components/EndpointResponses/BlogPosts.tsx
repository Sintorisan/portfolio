import styles from "./EndpointResponses.module.css";

import { getBlogInfos } from "@/app/api/blog/blogRouteMock";
import { BlogInfo } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  onOpenBlog: (id: string) => void;
}

export const BlogPosts = ({ onOpenBlog }: Props) => {
  const [blogInfos, setBlogInfo] = useState<BlogInfo[]>();
  const [isNormalized, setIsNormalized] = useState(false);

  useEffect(() => {
    getBlogInfos()
      .then((blogs) => {
        const sorted = blogs.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setBlogInfo(sorted);
      })
      .catch(console.error);
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (!blogInfos) return;

    if (selectedValue === "") {
      setBlogInfo([...blogInfos]);
    } else {
      const sorted = [...blogInfos].sort((a, b) => {
        const aTime = new Date(a.date).getTime();
        const bTime = new Date(b.date).getTime();
        return selectedValue === "newest" ? bTime - aTime : aTime - bTime;
      });

      setBlogInfo(sorted);
    }
  };

  return (
    <div className={styles.responseWrapper}>
      <div className={styles.labelRow}>
        <span className={styles.responseLabel}>Blog Response</span>
        <select className={styles.buttonBase} onChange={handleSortChange} defaultValue="">
          <option value="" disabled>
            Sort by Date
          </option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {!isNormalized ? (
        <div className={styles.responseBody}>
          {"[ "}
          {blogInfos?.map((blog, index) => (
            <ul key={index} className={styles.jsonScheme}>
              {"{ "}
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;id&quot;</span> :{" "}
                <span className={styles.linkValue} onClick={() => onOpenBlog(blog.id)}>
                  &quot;{blog.id}&quot;
                </span>
                ,
              </li>
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;title&quot;</span> :{" "}
                <span className={styles.stringValue}>&quot;{blog.title}&quot;</span>,
              </li>
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;date&quot;</span> :{" "}
                <span className={styles.stringValue}>&quot;{blog.date}&quot;</span>,
              </li>
              {"}"}
              {index < blogInfos.length - 1 ? ", " : ""}
            </ul>
          ))}
          {" ]"}
        </div>
      ) : (
        <div className={`${styles.responseBody} ${styles.normalized}`}>
          {blogInfos?.map((blog, index) => (
            <div key={index}>
              <p>
                <strong>Id:</strong>{" "}
                <span className={styles.normalizedLinkValue} onClick={() => onOpenBlog(blog.id)}>
                  {blog.id}
                </span>
              </p>
              <p>
                <strong>Title:</strong> {blog.title}
              </p>
              <p>
                <strong>Date:</strong> {blog.date}
              </p>
              {blogInfos.length - 1 > index ? <hr style={{ margin: "1rem 0" }} /> : ""}
            </div>
          ))}
        </div>
      )}
      <button className={styles.normalizeButton} onClick={() => setIsNormalized(!isNormalized)}>
        {!isNormalized ? "Normalize" : "Json"}
      </button>
    </div>
  );
};
