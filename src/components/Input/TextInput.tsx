import styles from "./TextInput.module.css";

type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
};

export function TextInput({
  value,
  onChange,
  placeholder,
  maxLength,
}: TextInputProps) {
  return (
    <input
      type="text"
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  );
}
