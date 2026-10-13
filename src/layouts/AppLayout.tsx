import type { ReactNode } from "react";
import styles from "./AppLayout.module.css";

type AppLayoutProps = {
  sidebar: ReactNode;
  main: ReactNode;
  footer: ReactNode;
};

export function AppLayout({ sidebar, main, footer }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.body}>
        {sidebar}
        {main}
      </div>
      {footer}
    </div>
  );
}
