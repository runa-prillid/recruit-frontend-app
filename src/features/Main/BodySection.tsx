import { useState } from "react";
import { ActionButton } from "../../components/Button/ActionButton";
import { Textarea } from "../../components/Textarea/Textarea";
import { Icon } from "../../components/Icon/Icon";
import { validateBody } from "../../utils/validation";
import styles from "./BodySection.module.css";

type BodySectionProps = {
  body: string;
  onSave: (body: string) => void;
};

export function BodySection({ body, onSave }: BodySectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(body);

  const handleEdit = () => {
    setDraft(body);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(body);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (validateBody(draft)) return;
    onSave(draft);
    setIsEditing(false);
  };

  const error = validateBody(draft);

  if (isEditing) {
    return (
      <div className={styles.section}>
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
        <Textarea
          value={draft}
          onChange={setDraft}
          maxLength={2000}
          placeholder="本文を入力（10文字以上）"
        />
        {error && (
          <p className={styles.error}>{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <div className={styles.display}>
        <div className={styles.body}>{body}</div>
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
