import styles from "@/components/EndpointResponses/EndpointResponses.module.css";
import { useState } from "react";
import { intervalToDuration } from "date-fns";

export const AboutMe = () => {
  const [isNormalized, setIsNormalized] = useState(false);

  function getMyAge(): number {
    const currentDate: Date = new Date();
    const birthDate: Date = new Date(1989, 5, 15);

    const age = intervalToDuration({
      start: birthDate,
      end: currentDate,
    });

    return age.years ?? 0;
  }

  const data = {
    name: "Sindri Elfarsson",
    age: getMyAge(),
    bio: "I’m Sindri, a curious introvert with extrovert tendencies who just really enjoys building things. Whether it’s coding, sketching something weird, strumming random chords on a guitar, or crafting with wood, I find joy in the act of creating. I’m the kind of person who learns by doing, often figuring things out by comparing them to real-life situations, it just helps things click. I’m most comfortable behind the scenes, but I enjoy working in a team too, especially when there’s space to bounce ideas around and figure things out together. This portfolio is part of me stepping outside my comfort zone. I’ve never really liked sharing much online, but I figured it was time to put myself out there a bit. If you’ve made it this far, I hope you leave thinking: ‘Yeah, he seems like a nice guy.’",
    nationality: "Icelandic",
    location: "Stockholm, Sweden",
    traits: [
      "Curious",
      "Collaborative",
      "Creative Problem Solver",
      "Thinking Outside the Box",
      "Continuous Learner",
      "Adaptable",
      "Creative",
    ],
    languages: {
      english: "Fluent",
      swedish: "Fluent",
      icelandic: "Fluent",
    },
    hobbies: ["Coding", "Playing Guitar", "Football", "Gaming", "Hiking", "Woodworking"],
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
              <span className={styles.jsonKey}>&quot;bio&quot;</span> :{" "}
              <span className={styles.stringValue}>&quot;{data.bio}&quot;</span>,
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
              <span className={styles.jsonKey}>&quot;languages&quot;</span> : {"{"}
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
            <strong>Bio:</strong> {data.bio}
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
        {!isNormalized ? "Normalize" : "Json"}
      </button>
    </div>
  );
};
