import styles from "@/components/EndpointResponses/EndpointResponses.module.css";
import { useState } from "react";

enum status {
  WorkInProgress,
  Complete,
}

interface Project {
  title: string;
  description: string;
  status: status;
  tech: string[];
  repoUrl: string;
  projectImg: string[];
}

interface Props {
  onOpenImage: (url: string) => void;
}

export const Projects = ({ onOpenImage }: Props) => {
  const data: Project[] = [
    {
      title: "Geop",
      description:
        "A geographical polling app where users can vote and view results visualized on a map, segmented by region. The app provides real-time feedback, interactive data display, a reward system, and social features like following users and viewing their activity.",
      status: status.WorkInProgress,
      tech: [
        ".NET 8",
        "Blazor Hybrid",
        "Azure SQL",
        "Identity",
        "Leaflet.js",
        "Clean Architecture",
      ],
      repoUrl: "",
      projectImg: [
        "create-poll.png",
        "poll-overview.png",
        "total-results.png",
        "regional-results.png",
      ],
    },
    {
      title: "Recipe App",
      description:
        "An application that extracts recipes from a URL using Semantic Kernel to structure the data after scraping the recipe and stores them in a database.",
      status: status.WorkInProgress,
      tech: [".NET 8", "Blazor Hybrid", "SQL Server", "Semantic Kernel"],
      repoUrl: "https://github.com/Sintorisan/Recipes",
      projectImg: ["add-recipe.png", "recipe-overview.png"],
    },
    {
      title: "sindri.dev",
      description: "My personal homepage/portfolio",
      status: status.WorkInProgress,
      tech: ["Next.js", "React", "TypeScript"],
      repoUrl: "https://github.com/Sintorisan/portfolio",
      projectImg: [],
    },
  ];

  const [isNormalized, setIsNormalized] = useState(false);
  const [projectDisplay, setProjectDisplay] = useState<Project[]>(data);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (selectedValue === "") {
      setProjectDisplay(data);
    } else {
      const selectedStatus = parseInt(selectedValue, 10) as status;
      const filtered = data.filter((proj) => proj.status === selectedStatus);
      setProjectDisplay(filtered);
    }
  };

  return (
    <div className={styles.responseWrapper}>
      <div className={styles.labelRow}>
        <span className={styles.responseLabel}>Projects Response</span>
        <select className={styles.buttonBase} onChange={handleSortChange}>
          <option>Filter by Status</option>
          <option value="">All Projects</option>
          <option value={status.WorkInProgress}>Work In Progress</option>
          <option value={status.Complete}>Complete</option>
        </select>
      </div>
      {!isNormalized ? (
        <div className={styles.responseBody}>
          {"[ "}
          {projectDisplay.map((proj, index) => (
            <ul key={index} className={styles.jsonScheme}>
              {"{ "}
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;title&quot;</span> :{" "}
                <span className={styles.stringValue}>&quot;{proj.title}&quot;</span>,
              </li>
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;description&quot;</span> :{" "}
                <span className={styles.stringValue}>&quot;{proj.description}&quot;</span>,
              </li>
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;status&quot;</span> :{" "}
                <span className={styles.stringValue}>&quot;{status[proj.status]}&quot;</span>,
              </li>
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;tech&quot;</span> :{" ["}
                {proj.tech.map((tech, index) => (
                  <span key={index} className={styles.stringValue}>
                    &quot;{tech}&quot;{index < proj.tech.length - 1 ? ", " : ""}
                  </span>
                ))}
                {"],"}
              </li>
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;repoUrl&quot;</span> :{" "}
                <span className={styles.stringValue}>
                  &quot;
                  {proj.repoUrl === "" ? (
                    "Private"
                  ) : (
                    <a className={styles.linkValue} href={proj.repoUrl}>
                      {proj.repoUrl}
                    </a>
                  )}
                  &quot;
                </span>
                ,
              </li>
              <li className={styles.jsonScheme}>
                <span className={styles.jsonKey}>&quot;projectImg&quot;</span> :{" ["}
                {proj.projectImg.map((img, index) => (
                  <span key={index} className={styles.linkValue} onClick={() => onOpenImage(img)}>
                    &quot;{img}&quot;{index < proj.projectImg.length - 1 ? ", " : ""}
                  </span>
                ))}
                {"],"}
              </li>
              {"}"}
              {index < projectDisplay.length - 1 ? ", " : ""}
            </ul>
          ))}
          {" ]"}
        </div>
      ) : (
        <div className={`${styles.responseBody} ${styles.normalized}`}>
          {projectDisplay.map((proj, index) => (
            <div key={index}>
              <p>
                <strong>Title:</strong> {proj.title}
              </p>
              <p>
                <strong>Description:</strong> {proj.description}
              </p>
              <p>
                <strong>Status:</strong> {status[proj.status]}
              </p>
              <p>
                <strong>Technologies:</strong> {proj.tech.join(", ")}
              </p>
              <p>
                <strong>Repository:</strong>{" "}
                {proj.repoUrl === "" ? (
                  "Private"
                ) : (
                  <a className={styles.normalizedLinkValue} href={proj.repoUrl}>
                    {proj.repoUrl}
                  </a>
                )}
              </p>
              <p>
                <strong>Images:</strong>{" "}
                {proj.projectImg.map((img, index) => (
                  <span key={index}>
                    <span className={styles.normalizedLinkValue} onClick={() => onOpenImage(img)}>
                      {img}
                    </span>
                    {index < proj.projectImg.length - 1 ? " - " : ""}
                  </span>
                ))}
              </p>
              {projectDisplay.length - 1 > index ? <hr style={{ margin: "1rem 0" }} /> : ""}
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
