import styles from './styles.module.scss';

interface ButtonProps {
  label?: string;
  type?: 'primary' | 'secondary';
  onClick?: any;
  disabled?: boolean;
}

export const Button = ({label = 'Button', type = 'primary', onClick, disabled = false}: ButtonProps) => {

  return(
    <div className={`${styles.button} ${disabled ? styles.disabled : '' }`} onClick={onClick && !disabled ? onClick : () => {}}>
      <p>{label}</p>
    </div>
  )
}