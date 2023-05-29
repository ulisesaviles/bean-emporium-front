import styles from './styles.module.scss';

interface ButtonProps {
  label?: string;
  type?: 'primary' | 'secondary';
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
}

export const Button = ({label = 'Button', type = 'primary', onClick, disabled = false, loading = false}: ButtonProps) => {

  return(
    <div className={`${styles.button} ${type === 'secondary' ? styles.secondary : ''} ${disabled || loading ? styles.disabled : '' }`} onClick={onClick && !disabled ? onClick : () => {}}>
      <p>{`${loading ? 'Loading...' : label}`}</p>
    </div>
  )
}