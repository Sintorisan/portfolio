import styles from "./EndpointResponses.module.css";

import { useState } from "react";

export const Socials = () => {
  const [isNormalized, setIsNormalized] = useState(false);

  const data = {
    gitHubUrl: "https://github.com/Sintorisan/",
    linkedInUrl: "https://www.linkedin.com/in/sindri-elfarsson",
    websiteUrl: "https://www.sindri.dev",
  };

  return (
    <div className={styles.responseWrapper}>
      <span className={styles.responseLabel}>Social Response</span>
      {!isNormalized ? (
        <div className={styles.responseBody}>
          {"{"}
          <ul className={styles.jsonScheme}>
            <li>
              <span className={styles.jsonKey}>&quot;gitHub&quot;</span> :{" "}
              <a href={data.gitHubUrl} className={styles.linkValue}>
                &quot;{data.gitHubUrl}&quot;
              </a>
              ,
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;linkedIn&quot;</span> :{" "}
              <a href={data.linkedInUrl} className={styles.linkValue}>
                &quot;{data.linkedInUrl}&quot;
              </a>
              ,
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;website&quot;</span> :{" "}
              <a href={data.websiteUrl} className={styles.linkValue}>
                &quot;{data.websiteUrl}&quot;
              </a>
              ,
            </li>
          </ul>
          {"}"}
        </div>
      ) : (
        <div className={`${styles.responseBody} ${styles.normalized}`}>
          <a href={data.gitHubUrl} target="_blank" className={styles.socialLink}>
            🐱 GitHub
          </a>
          <a href={data.linkedInUrl} target="_blank" className={styles.socialLink}>
            💼 LinkedIn
          </a>
          <a href={data.websiteUrl} target="_blank" className={styles.socialLink}>
            🌐 Website
          </a>
        </div>
      )}
      <button className={styles.normalizeButton} onClick={() => setIsNormalized(!isNormalized)}>
        {!isNormalized ? "Normalize" : "Json"}
      </button>
    </div>
  );
};
