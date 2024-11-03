import { forwardRef } from "react";
import "./Button.css";

type ButtonProps = Omit<JSX.IntrinsicElements["button"], "className"> & {
  className?: string;
  variant?: "primary" | "secondary";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { variant = "primary", children, className = "", ...rest } = props;

  return (
    <button ref={ref} className={`button ${variant} ${className}`} {...rest}>
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
