import styles from "@/components/EndpointResponses/EndpointResponses.module.css";
import { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";

export const AboutProf = () => {
  const [experience, setExperience] = useState<string>();
  const [isNormalized, setIsNormalized] = useState(false);

  useEffect(() => setExperience(getExperience()), []);

  function getExperience(): string {
    const currenDate: Date = new Date();
    const startDate: Date = new Date(2024, 9, 16);
    const totalExperience = intervalToDuration({
      start: startDate,
      end: currenDate,
    });

    return `${totalExperience.years != null ? `${totalExperience.years} years, ` : "0 years, "}${
      totalExperience.months
    } months and ${totalExperience.days} days`;
  }

  const data = {
    title: "Junior .NET Developer",
    bio: "I’m a developer who enjoys figuring things out by building. My background is mainly in .NET and C#, but I like exploring other tools when a project calls for it, this site, for example, is built with React and TypeScript. I don’t like to overcomplicate things, I try to keep my code clean, maintainable, and focused on getting the job done. I like the puzzle-solving side of development, whether it’s setting up the backend workflow or wrestling with CSS until things look right. I work best when there’s a clear goal and some room to experiment along the way.",
    mainTechStack: ["C#", ".NET", "React", "Blazor", "SQL"],
    skills: [
      "C#",
      "ASP.NET Core",
      "Entity Framework Core",
      "RESTful API",
      "Blazor",
      "HTML",
      "CSS",
      "SQL Server",
      "SQL",
      "React",
      "TypeScript",
      "Azure",
      "Git / GitHub",
      "Clean Code",
    ],
    currentlyLearning: ["Next.js"],
    experienceYears: experience,
    openToWork: true,
  };

  return (
    <div className={styles.responseWrapper}>
      <span className={styles.responseLabel}>Professional Response</span>
      {!isNormalized ? (
        <div className={styles.responseBody}>
          {"{"}
          <ul className={styles.jsonScheme}>
            <li>
              <span className={styles.jsonKey}>&quot;title&quot;</span> :{" "}
              <span className={styles.stringValue}>&quot;{data.title}&quot;</span>,
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;bio&quot;</span> :{" "}
              <span className={styles.stringValue}>&quot;{data.bio}&quot;</span>,
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;experience&quot;</span> :{" "}
              <span className={styles.stringValue}>&quot;{data.experienceYears}&quot;</span>,
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;mainTechStack&quot;</span> :{" ["}
              {data.mainTechStack.map((tech, index) => (
                <span key={index} className={styles.stringValue}>
                  &quot;{tech}&quot;{data.mainTechStack.length - 1 > index ? ", " : ""}
                </span>
              ))}
              {"],"}
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;skills&quot;</span> :{" ["}
              {data.skills.map((skill, index) => (
                <span key={index} className={styles.stringValue}>
                  &quot;{skill}&quot;{data.skills.length - 1 > index ? ", " : ""}
                </span>
              ))}
              {"],"}
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;currentlyLearning&quot;</span> :{" ["}
              {data.currentlyLearning.map((current, index) => (
                <span key={index} className={styles.stringValue}>
                  &quot;{current}&quot;{data.currentlyLearning.length - 1 > index ? ", " : ""}
                </span>
              ))}
              {"],"}
            </li>
            <li>
              <span className={styles.jsonKey}>&quot;openToWork&quot;</span> :{" "}
              <span className={styles.boolValue}>{String(data.openToWork)}</span>
            </li>
          </ul>
          {"}"}
        </div>
      ) : (
        <div className={`${styles.responseBody} ${styles.normalized}`}>
          <p>
            <strong>Title:</strong> {data.title}
          </p>
          <p>
            <strong>Bio:</strong> {data.bio}
          </p>
          <p>
            <strong>Tech Stack:</strong> {data.mainTechStack.join(", ")}
          </p>
          <p>
            <strong>Skills:</strong> {data.skills.join(", ")}
          </p>
          <p>
            <strong>Currently Learning:</strong> {data.currentlyLearning.join(", ")}
          </p>
          <p>
            <strong>Experience:</strong> {data.experienceYears}
          </p>
          <p>
            <strong>Open For Work:</strong> {data.openToWork ? "Yes" : "No"}
          </p>
        </div>
      )}
      <button className={styles.normalizeButton} onClick={() => setIsNormalized(!isNormalized)}>
        {!isNormalized ? "Normalize" : "Json"}
      </button>
    </div>
  );
};
