import { useState, useEffect, useRef } from "react";
import styles from "./EndpointResponses.module.css";

export const ContactMe = () => {
  const [isNormalized, setIsNormalized] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    includeResume: true,
  });

  const inputRefName = useRef<HTMLInputElement>(null);
  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefMessage = useRef<HTMLTextAreaElement>(null);
  const shadowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inputRefName.current) {
      inputRefName.current.style.width = form.name === "" ? `9ch` : `${form.name.length}ch`;
    }

    if (inputRefEmail.current) {
      inputRefEmail.current.style.width = form.email === "" ? `9ch` : `${form.email.length}ch`;
    }

    if (inputRefMessage.current && shadowRef.current) {
      const el = inputRefMessage.current;
      const shadow = shadowRef.current;

      // Update shadow content with the message (and a space to prevent collapse)
      shadow.textContent = form.message || " ";

      // Set the textarea width based on shadow width
      const shadowWidth = shadow.offsetWidth;
      const newWidth = Math.min(shadowWidth + 2, 400); // +2 for caret padding
      el.style.width = `${newWidth}px`;

      // Also auto-expand height
      requestAnimationFrame(() => {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      });
    }
  }, [form.name, form.email, form.message]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", form);
    setForm({ name: "", email: "", message: "", includeResume: true });
  };

  return (
    <div className={styles.responseWrapper}>
      <div className={styles.labelRow}>
        <span className={styles.responseLabel}>Contact Request</span>
        <button className={`${styles.buttonBase} ${styles.buttonTop}`} type="submit">
          Send Request
        </button>{" "}
      </div>
      {!isNormalized ? (
        <div className={styles.responseBody}>
          {"{"}
          <form className={styles.jsonInputGroup} onSubmit={handleSubmit} id="contactForm">
            <ul className={styles.jsonScheme}>
              <li>
                <span className={styles.jsonKey}>&quot;name&quot;</span> :{" "}
                <span className={styles.stringValue}>
                  &quot;
                  <input
                    ref={inputRefName}
                    type="text"
                    name="name"
                    placeholder="type here"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  &quot;
                </span>
                ,
              </li>
              <li>
                <span className={styles.jsonKey}>&quot;email&quot;</span> :{" "}
                <span className={styles.stringValue}>
                  &quot;
                  <input
                    ref={inputRefEmail}
                    type="text"
                    name="email"
                    placeholder="type here"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  &quot;
                </span>
                ,
              </li>
              <li className={styles.multiLineEntry}>
                <span className={styles.jsonKey}>&quot;message&quot;</span> :{" "}
                <span className={styles.stringValue}>
                  &quot;
                  <textarea
                    ref={inputRefMessage}
                    name="message"
                    placeholder="type here"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className={styles.inlineTextarea}
                    rows={1}
                  />
                  &quot;
                </span>
              </li>
              <li>
                <span className={styles.jsonKey}>&quot;includeResume&quot;</span> :{" "}
                <select
                  name="includeResume"
                  value={form.includeResume.toString()}
                  onChange={(e) => setForm({ ...form, includeResume: e.target.value === "true" })}
                  className={styles.booleanDropdown}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
                ,
              </li>
            </ul>
          </form>
          {"}"}
        </div>
      ) : (
        <div className={`${styles.responseBody} ${styles.normalized}`}>
          <form className={styles.normalizedForm} onSubmit={handleSubmit} id="contactForm">
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your message"
                rows={4}
                required
              />
            </div>
            <div className={styles.formFieldCheckbox} style={{ marginBottom: "2.5rem" }}>
              <div className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  name="includeResume"
                  checked={form.includeResume}
                  onChange={(e) => setForm({ ...form, includeResume: e.target.checked })}
                />
                <label htmlFor="includeResume">Include resume</label>
              </div>
            </div>
          </form>
        </div>
      )}
      <button className={styles.normalizeButton} onClick={() => setIsNormalized(!isNormalized)}>
        {!isNormalized ? "Normalize" : "Json"}
      </button>
      <span
        ref={shadowRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          fontFamily: "monospace",
          fontSize: "0.9rem",
          padding: 0,
          margin: 0,
        }}
      ></span>
    </div>
  );
};
