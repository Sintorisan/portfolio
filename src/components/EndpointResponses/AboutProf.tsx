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
    bio: "While my core strength lies in C# and backend development, I’m always pushing myself to explore beyond my comfort zone. I’ve been expanding into React and TypeScript lately, building this site as both a portfolio and a way to level up my frontend skills. I don’t chase perfection. I chase improvement. I believe learning happens when you build, make mistakes, and figure it out one step at a time. In teams, I enjoy working together to solve problems, share ideas, and support each other’s growth. I’m not the loudest in the room, but I’m dependable, curious, and always ready to jump in and help. I try to keep things light, bring good energy, and focus on getting the job done well with a bit of personality along the way.",
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
        {!isNormalized ? "Normalize" : "Return"}
      </button>
    </div>
  );
};
