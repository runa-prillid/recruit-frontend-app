import { Icon } from "../../components/Icon/Icon";
import styles from "./SidebarItem.module.css";

type SidebarItemProps = {
  title: string;
  isActive: boolean;
  isEditing: boolean;
  onClick: () => void;
  onDelete: () => void;
};

export function SidebarItem({
  title,
  isActive,
  isEditing,
  onClick,
  onDelete,
}: SidebarItemProps) {
  return (
    <li
      className={`${styles.item} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <span className={styles.title}>{title || "無題"}</span>
      {isEditing && (
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Icon name="delete" size={24} />
        </button>
      )}
    </li>
  );
}
