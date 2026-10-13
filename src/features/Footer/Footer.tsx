import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Copyright &copy; 2021 Sample</span>
      <span>運営会社</span>
    </footer>
  );
}
