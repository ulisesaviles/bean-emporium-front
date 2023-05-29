import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface InputProps {
  label?: string;
  defaultValue?: string;
  onChange?: any;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export const useInput = ({label, defaultValue = '', onChange, placeholder, type = 'text'}: InputProps): [string, JSX.Element] => {
  const [currentValue, setValue]: [string, any] = useState(defaultValue);

  useEffect(() => {

  }, [currentValue]);

  const handleChange = (ev: any) => {
    setValue(ev.target.value);
    if (onChange) {
      onChange(ev.target.value);
    }
  }

  const inputValue = <div className={styles.wrapper}>
                      {label && <p>{label}</p>}
                      <input
                      className={styles.input}
                      defaultValue={defaultValue}
                      placeholder={placeholder}
                      type={type}
                      onChange={handleChange}/>
                    </div>;
  return [currentValue, inputValue];
}