import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface InputProps {
  label?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  required?: boolean;
}

export const useInput = ({
  label,
  defaultValue = "",
  onChange,
  placeholder,
  type = "text",
  disabled,
  required,
}: InputProps): [string, JSX.Element] => {
  const [currentValue, setValue]: [string, any] = useState(defaultValue);

  useEffect(() => {}, [currentValue]);

  const handleChange = (ev: any) => {
    setValue(ev.target.value);
    if (onChange) {
      onChange(ev.target.value);
    }
  };

  const inputValue = (
    <div className={styles.wrapper}>
      {label && <p>{`${label} ${required ? "*" : ""}`}</p>}
      <input
        className={`${styles.input} ${disabled ? styles.disabled : ""}`}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
  return [currentValue, inputValue];
};
