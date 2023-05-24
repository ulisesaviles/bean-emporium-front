import styles from './styles.module.scss';

interface ButtonProps {
  label?: string;
  type?: 'primary' | 'secondary';
  onClick?: any;
}

export const Button = ({label = 'Button', type = 'primary', onClick}: ButtonProps) => {

  return(
    <div className={styles.button} onClick={onClick ? onClick : () => {}}>
      <p>{label}</p>
    </div>
  )
}