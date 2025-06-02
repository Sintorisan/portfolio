import styles from "@/components/EndpointItem/EndpointItem.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

interface Props {
  method: string;
  url: string;
  children: React.ReactNode;
}

export const EndpointItem = ({ method, url, children }: Props) => {
  const [isVisable, setIsVisable] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionHeader} onClick={() => setIsVisable(!isVisable)}>
        <h3 className={`${styles.methodDisplay} ${styles[method.toLowerCase()]}`}>{method}</h3>
        <p className={styles.urlDisplay}>{url}</p>
        {mounted &&
          (!isVisable ? (
            <FontAwesomeIcon
              style={{ marginRight: "1rem", fontSize: "1.3rem" }}
              icon={faChevronDown}
            />
          ) : (
            <FontAwesomeIcon
              style={{ marginRight: "1rem", fontSize: "1.3rem" }}
              icon={faChevronUp}
            />
          ))}
      </div>
      <div className={isVisable ? styles.accordionBody : styles.hiddenBody}>{children}</div>
    </div>
  );
};
