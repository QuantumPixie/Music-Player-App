import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`button ${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
