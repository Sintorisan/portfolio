import styles from "@/components/EndpointResponses/EndpointResponses.module.css";
import { useState } from "react";

interface Experience {
  title: string;
  company: string;
  start: string;
  end: string;
  projects: {
    title: string;
    technologies: string[];
    description: string;
    myRole: string;
  }[];
}

export const CareerExp = () => {
  const [isNormalized, setIsNormalized] = useState(false);

  const data: Experience[] = [
    {
      title: ".NET Developer Intern",
      company: "Web Express TM",
      start: "2024-09-16",
      end: "2025-05-21",
      projects: [
        {
          title: "AI Tool for the Pharmaceutical Industry",
          technologies: [".NET 8", "Azure AI Services", "Azure Cognitive Search", "Blob Storage"],
          description:
            "A SaaS platform that validates pharmaceutical content using AI models and Azure services.",
          myRole:
            "Contributed to the system design and implemented integration with Azure's AI services.",
        },
        {
          title: "Reporting App for Field Technicians",
          technologies: [".NET 8", "MAUI Blazor Hybrid", "iText"],
          description:
            "A cross-platform app for submitting and managing field reports with auto-generated PDFs uploaded to OneDrive.",
          myRole: "Developed the MAUI mobile app and implemented PDF generation using iText.",
        },
        {
          title: "Xamarin to MAUI Migration",
          technologies: [".NET MAUI"],
          description:
            "Modernized a Xamarin.Forms app used by SMA patients, upgrading it to .NET MAUI.",
          myRole: "Led the migration and UI overhaul, improving maintainability and structure.",
        },
        {
          title: "Legacy System Migration (.NET 4.6 to .NET 8)",
          technologies: [".NET 8", "ASP.NET Core MVC"],
          description: "Upgraded a legacy business system to .NET 8.",
          myRole:
            "Ported views and controllers to .NET 8, refactored components, and introduced asynchronous logic for improved performance.",
        },
      ],
    },
  ];

  return (
    <div className={styles.responseWrapper}>
      <span className={styles.responseLabel}>Experience Response</span>
      {!isNormalized ? (
        <div className={styles.responseBody}>
          {"["}
          {data.map((exp, index) => (
            <ul key={index} className={styles.jsonScheme}>
              {"{"}
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;title&quot;</span> :{" "}
                <span className={styles.stringValue}>&quot;{exp.title}&quot;</span>,
              </li>
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;company&quot;</span> :{" "}
                <span className={styles.stringValue}>&quot;{exp.company}&quot;</span>,
              </li>
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;start&quot;</span> :{" "}
                <span className={styles.stringValue}>&quot;{exp.start}&quot;</span>,
              </li>
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;end&quot;</span> :{" "}
                <span className={styles.stringValue}>&quot;{exp.end}&quot;</span>,
              </li>
              <span className={`${styles.jsonScheme} ${styles.jsonKey}`}>&quot;projects&quot;</span>{" "}
              : {"["}
              <ul className={styles.jsonScheme}>
                {exp.projects.map((project, index) => (
                  <li key={index}>
                    <ul className={styles.jsonScheme}>
                      {"{"}
                      <li className={styles.jsonScheme}>
                        <span className={styles.jsonKey}>&quot;title&quot;</span> :{" "}
                        <span className={styles.stringValue}>&quot;{project.title}&quot;</span>,
                      </li>
                      <li className={styles.jsonScheme}>
                        <span className={styles.jsonKey}>&quot;description&quot;</span> :{" "}
                        <span className={styles.stringValue}>
                          &quot;{project.description}&quot;
                        </span>
                        ,
                      </li>
                      <li className={styles.jsonScheme}>
                        <span className={styles.jsonKey}>&quot;technologies&quot;</span> :{" ["}
                        {project.technologies.map((tech, i) => (
                          <span key={i} className={styles.stringValue}>
                            &quot;{tech}&quot;{i < project.technologies.length - 1 ? ", " : ""}
                          </span>
                        ))}
                        {"],"}
                      </li>
                      <li className={styles.jsonScheme}>
                        <span className={styles.jsonKey}>&quot;myRole&quot;</span> :{" "}
                        <span className={styles.stringValue}>&quot;{project.myRole}&quot;</span>
                      </li>
                      {"}"}
                      {index < exp.projects.length - 1 ? "," : ""}
                    </ul>
                  </li>
                ))}
              </ul>
              {"]"}
            </ul>
          ))}
          {"]"}
        </div>
      ) : (
        <div className={`${styles.responseBody} ${styles.normalized}`}>
          {data.map((exp, index) => (
            <div key={index}>
              <p>
                <strong>Title:</strong> {exp.title}
              </p>
              <p>
                <strong>Company:</strong> {exp.company}
              </p>
              <p>
                <strong>Start:</strong> {exp.start}
              </p>
              <p>
                <strong>End:</strong> {exp.end}
              </p>
              <p>
                <strong>Projects:</strong>
              </p>
              <ul className={styles.jsonScheme}>
                {exp.projects.map((proj, i) => (
                  <li key={i} style={{ marginBottom: "1rem" }}>
                    <p>
                      <strong>• {proj.title}</strong>
                    </p>
                    <p className={styles.jsonScheme}>
                      <strong>Description:</strong> {proj.description}
                    </p>
                    <p className={styles.jsonScheme}>
                      <strong>Technologies:</strong> {proj.technologies.join(", ")}
                    </p>
                    <p className={styles.jsonScheme}>
                      <strong>My Role:</strong> {proj.myRole}
                    </p>
                  </li>
                ))}
              </ul>
              {data.length - 1 > index ? <hr style={{ margin: "1rem 0" }} /> : ""}
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
