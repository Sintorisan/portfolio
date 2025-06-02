import styles from "@/components/EndpointResponses/EndpointResponses.module.css";
import { useState } from "react";

export const AboutMe = () => {
  const [isNormalized, setIsNormalized] = useState(false);

  const data = {
    name: "Sindri Elfarsson",
    age: 36,
    nationality: "Icelandic",
    location: "Stockholm, Sweden",
    traits: [
      "Curious",
      "Persistent",
      "Collaborative",
      "Creative Problem Solver",
      "Continuous Learner",
      "Adaptable",
    ],
    languages: {
      english: "Fluent",
      swedish: "Fluent",
      icelandic: "Fluent",
    },
    hobbies: ["Coding", "Football", "Gaming"],
  };

  return (
    <div className={styles.responseWrapper}>
      <span className={styles.responseLabel}>About Response</span>
      {!isNormalized ? (
        <div className={styles.responseBody}>
          {"{"}
          <ul className={styles.jsonScheme}>
            <li>
              <span className={styles.jsonKey}>&quot;name&quot;</span> :{" "}
              <span className={styles.stringValue}>&quot;{data.name}&quot;</span>,
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;age&quot;</span> :{" "}
              <span className={styles.numberValue}>{data.age}</span>,
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;nationality&quot;</span> :{" "}
              <span className={styles.stringValue}>&quot;{data.nationality}&quot;</span>,
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;location&quot;</span> :{" "}
              <span className={styles.stringValue}>&quot;{data.location}&quot;</span>,
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;traits&quot;</span> : [
              {data.traits.map((trait, index) => (
                <span key={index} className={styles.stringValue}>
                  &quot;{trait}&quot;{index < data.traits.length - 1 ? ", " : ""}
                </span>
              ))}
              ],
            </li>
            <li>
              <span className={styles.jsonKey}>"languages"</span> : {"{"}
              <ul className={styles.nestedObject}>
                {Object.entries(data.languages).map(([lang, level], index, array) => (
                  <li key={lang}>
                    <span className={styles.jsonKey}>&quot;{lang}&quot;</span> :{" "}
                    <span className={styles.stringValue}>&quot;{level}&quot;</span>
                    {index < array.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
              {"},"}
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;hobbies&quot;</span> : [
              {data.hobbies.map((hobby, index) => (
                <span key={index} className={styles.stringValue}>
                  &quot;{hobby}&quot;{index < data.hobbies.length - 1 ? ", " : ""}
                </span>
              ))}
              ]
            </li>
          </ul>
          {"}"}
        </div>
      ) : (
        <div className={`${styles.responseBody} ${styles.normalized}`}>
          <p>
            <strong>Name:</strong> {data.name}
          </p>
          <p>
            <strong>Age:</strong> {data.age}
          </p>
          <p>
            <strong>Nationality:</strong> {data.nationality}
          </p>
          <p>
            <strong>Location:</strong> {data.location}
          </p>
          <p>
            <strong>Traits:</strong> {data.traits.join(", ")}
          </p>
          <div>
            <strong>Languages:</strong>
            <ul>
              {Object.entries(data.languages).map(([lang, level]) => (
                <li key={lang} className={styles.normNestedObject}>
                  <strong>&bull; {lang.charAt(0).toUpperCase() + lang.slice(1)}</strong>: {level}
                </li>
              ))}
            </ul>
          </div>
          <p>
            <strong>Hobbies:</strong> {data.hobbies.join(", ")}
          </p>
        </div>
      )}
      <button className={styles.normalizeButton} onClick={() => setIsNormalized(!isNormalized)}>
        {!isNormalized ? "Normalize" : "Return"}
      </button>
    </div>
  );
};
