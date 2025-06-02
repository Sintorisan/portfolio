import styles from "@/components/EndpointResponses/EndpointResponses.module.css";
import { useState } from "react";

interface Education {
  school: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  graduated: boolean;
  diplomaImg: string;
}

interface Props {
  onOpenImage: (url: string) => void;
}

export const CareerEdu = ({ onOpenImage }: Props) => {
  const [isNormalized, setIsNormalized] = useState(false);

  const data: Education[] = [
    {
      school: "IT-Högskolan Stockholm",
      degree: "Diploma",
      field: ".NET Development",
      start: "2023-08-21",
      end: "2025-05-23",
      graduated: true,
      diplomaImg: "it-hogskolan-diploma.jpg",
    },
    {
      school: "AI Sweden",
      degree: "Certification",
      field: "AI – Organisation, Värde och Införande",
      start: "2023-11-01",
      end: "2024-02-01",
      graduated: true,
      diplomaImg: "aisweden- diploma.jpg",
    },
  ];

  return (
    <>
      <div className={styles.responseWrapper}>
        <span className={styles.responseLabel}>Education Response</span>
        {!isNormalized ? (
          <div className={styles.responseBody}>
            {"["}
            {data.map((edu, index) => (
              <ul className={styles.jsonScheme} key={index}>
                {"{"}
                <li className={styles.jsonScheme}>
                  <span className={styles.jsonKey}>&quot;school&quot;</span> :{" "}
                  <span className={styles.stringValue}>&quot;{edu.school}&quot;</span>,
                </li>
                <li className={styles.jsonScheme}>
                  <span className={styles.jsonKey}>&quot;degree&quot;</span> :{" "}
                  <span className={styles.stringValue}>&quot;{edu.degree}&quot;</span>,
                </li>
                <li className={styles.jsonScheme}>
                  <span className={styles.jsonKey}>&quot;field&quot;</span> :{" "}
                  <span className={styles.stringValue}>&quot;{edu.field}&quot;</span>,
                </li>
                <li className={styles.jsonScheme}>
                  <span className={styles.jsonKey}>&quot;start&quot;</span> :{" "}
                  <span className={styles.stringValue}>&quot;{edu.start}&quot;</span>,
                </li>
                <li className={styles.jsonScheme}>
                  <span className={styles.jsonKey}>&quot;end&quot;</span> :{" "}
                  <span className={styles.stringValue}>&quot;{edu.end}&quot;</span>,
                </li>
                <li className={styles.jsonScheme}>
                  <span className={styles.jsonKey}>&quot;graduated&quot;</span> :{" "}
                  <span className={styles.boolValue}>{String(edu.graduated)}</span>,
                </li>
                <li className={styles.jsonScheme}>
                  <span className={styles.jsonKey}>&quot;diplomaImg&quot;</span> :{" "}
                  <span className={styles.linkValue} onClick={() => onOpenImage(edu.diplomaImg)}>
                    &quot;{edu.diplomaImg}&quot;
                  </span>
                </li>
                {data.length - 1 > index ? "}, " : "}"}
              </ul>
            ))}
            {"]"}
          </div>
        ) : (
          <div className={`${styles.responseBody} ${styles.normalized}`}>
            {data.map((edu, index) => (
              <>
                <p>
                  <strong>School:</strong> {edu.school}
                </p>
                <p>
                  <strong>Degree:</strong> {edu.degree}
                </p>
                <p>
                  <strong>Field:</strong> {edu.field}
                </p>
                <p>
                  <strong>Start Date:</strong> {edu.start}
                </p>
                <p>
                  <strong>End Date:</strong> {edu.end}
                </p>
                <p>
                  <strong>Graduated:</strong> {edu.graduated ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Diploma:</strong>{" "}
                  <span className={styles.linkValue} onClick={() => onOpenImage(edu.diplomaImg)}>
                    {edu.diplomaImg}
                  </span>
                </p>
                {data.length - 1 > index ? <hr style={{ margin: "1rem 0" }} /> : ""}
              </>
            ))}
          </div>
        )}
        <button className={styles.normalizeButton} onClick={() => setIsNormalized(!isNormalized)}>
          {!isNormalized ? "Normalize" : "Return"}
        </button>
      </div>
    </>
  );
};
