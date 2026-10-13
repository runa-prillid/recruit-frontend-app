import styles from "./Textarea.module.css";

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
};

export function Textarea({
  value,
  onChange,
  placeholder,
  maxLength,
}: TextareaProps) {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
}
