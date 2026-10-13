import type { ReactNode } from "react";
import styles from "./ActionButton.module.css";

type ActionButtonProps = {
  variant: "filled" | "outlined";
  color: "primary" | "normal";
  icon?: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
};

export function ActionButton({
  variant,
  color,
  icon,
  disabled = false,
  onClick,
  children,
}: ActionButtonProps) {
  const className = [
    styles.button,
    styles[variant],
    styles[color],
  ].join(" ");

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{children}</span>
    </button>
  );
}
