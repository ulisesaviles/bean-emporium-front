// React imports
import { useState } from "react";

// Icons
import { IoArrowDown } from "react-icons/io5";

// Styles
import styles from "./styles.module.scss";

// Props type
type Props = {
  options: (string | number)[];
  value: string | number;
  onChange: (newValue: string | number) => void;
};

// Main react component
const DropDown = ({ onChange, options, value }: Props) => {
  // Constants
  const [isOpened, setIsOpened] = useState(false);

  // JSX
  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsOpened(true)}
      onMouseLeave={() => setIsOpened(false)}
    >
      <div className={styles.currentValue}>
        {value}{" "}
        <IoArrowDown
          className={`${styles.arrow} ${isOpened ? styles.rotate : ""}`}
        />
      </div>
      {isOpened ? (
        <div className={styles.options}>
          {options.map((option, i) => (
            <div key={i}>
              {option !== value ? (
                <div
                  className={styles.option}
                  onClick={() => {
                    onChange(option);
                    setIsOpened(false);
                  }}
                >
                  {option}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DropDown;
