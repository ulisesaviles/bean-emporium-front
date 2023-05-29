import { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface InputProps {
  label?: string;
  defaultValue?: string;
  onChange?: any;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export const useInput = ({label = 'Label', defaultValue = '', onChange, placeholder, type = 'text'}: InputProps): [string, JSX.Element] => {
  const [currentValue, setValue]: [string, any] = useState(defaultValue);

  useEffect(() => {

  }, [currentValue]);

  const inputValue = <div>
                      <p>{label}</p>
                      <input defaultValue={defaultValue} placeholder={placeholder} type={type}/>
                    </div>;
  return [currentValue, inputValue];
}