import styles from "@/components/Modals/Modal.module.css";

interface Props {
  images: string[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ImgModal = ({ images, index, isOpen, onClose, onNext, onPrev }: Props) => {
  if (!isOpen || images.length === 0) return null;

  const currentImage = images[index];

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topBar}>
          <span className={styles.fileName}>{currentImage}</span>
          <button className={styles.modalClose} onClick={onClose}>
            ✕
          </button>
        </div>
        <div className={styles.imgModalBody}>
          <button className={styles.modalNavButton} onClick={onPrev}>
            &lt;
          </button>
          <img src={`img/${currentImage}`} alt={`Image ${index + 1}`} />
          <button className={styles.modalNavButton} onClick={onNext}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};
