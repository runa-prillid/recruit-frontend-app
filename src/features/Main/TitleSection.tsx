import { useState } from "react";
import { ActionButton } from "../../components/Button/ActionButton";
import { TextInput } from "../../components/Input/TextInput";
import { Icon } from "../../components/Icon/Icon";
import { validateTitle } from "../../utils/validation";
import styles from "./TitleSection.module.css";

type TitleSectionProps = {
  title: string;
  onSave: (title: string) => void;
};

export function TitleSection({ title, onSave }: TitleSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(title);

  const handleEdit = () => {
    setDraft(title);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(title);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (validateTitle(draft)) return;
    onSave(draft);
    setIsEditing(false);
  };

  const error = validateTitle(draft);

  if (isEditing) {
    return (
      <div className={styles.section}>
        <TextInput
          value={draft}
          onChange={setDraft}
          maxLength={50}
          placeholder="タイトルを入力"
        />
        {error && (
          <p className={styles.error}>{error}</p>
        )}
        <div className={styles.actions}>
          <ActionButton
            variant="filled"
            color="normal"
            icon={<Icon name="cancel" size={24} />}
            onClick={handleCancel}
          >
            Cancel
          </ActionButton>
          <ActionButton
            variant="filled"
            color="primary"
            icon={<Icon name="save" size={24} />}
            onClick={handleSave}
            disabled={!!error}
          >
            Save
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.display}>
        <h1 className={styles.title}>{title}</h1>
        <ActionButton
          variant="filled"
          color="primary"
          icon={<Icon name="edit" size={24} />}
          onClick={handleEdit}
        >
          Edit
        </ActionButton>
      </div>
    </div>
  );
}
