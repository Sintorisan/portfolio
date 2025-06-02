import styles from "@/components/Section/Section.module.css";

interface Props {
  header: string;
  children: React.ReactNode;
}

export const Section = ({ header, children }: Props) => {
  return (
    <>
      <h1 className={styles.sectionTitle}>{header}</h1>
      <div className={styles.childrenItems}>{children}</div>
    </>
  );
};
