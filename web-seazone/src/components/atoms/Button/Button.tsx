import styles from './styles.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  className = '',
  loading = false,
  disabled = false
}: ButtonProps) {
  return (
    <button 
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {children}
    </button>
  );
}