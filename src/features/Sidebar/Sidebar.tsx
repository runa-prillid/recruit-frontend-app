import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contentApi } from "../../api/contentApi";
import { Icon } from "../../components/Icon/Icon";
import { ActionButton } from "../../components/Button/ActionButton";
import { SidebarItem } from "./SidebarItem";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export function Sidebar({ selectedId, onSelect }: SidebarProps) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: contents = [] } = useQuery({
    queryKey: ["contents"],
    queryFn: contentApi.getContents,
  });

  const createMutation = useMutation({
    mutationFn: () =>
      contentApi.createContent({ title: "新しいページ", body: "ここに本文を入力してください" }),
    onSuccess: (newContent) => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      onSelect(newContent.id);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: contentApi.deleteContent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
    if (selectedId === id) {
      const remaining = contents.filter((c) => c.id !== id);
      onSelect(remaining.length > 0 ? remaining[0].id : 0);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <Icon name="logo" size={32} />
        <span className={styles.serviceName}>ServiceName</span>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.list}>
          {contents.map((content) => (
            <SidebarItem
              key={content.id}
              title={content.title || ""}
              isActive={content.id === selectedId}
              isEditing={isEditing}
              onClick={() => onSelect(content.id)}
              onDelete={() => handleDelete(content.id)}
            />
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        {isEditing ? (
          <>
            <ActionButton
              variant="outlined"
              color="primary"
              icon={<Icon name="plus" size={24} />}
              onClick={() => createMutation.mutate()}
              disabled={createMutation.isPending}
            >
              New page
            </ActionButton>
            <ActionButton
              variant="outlined"
              color="primary"
              icon={<Icon name="done" size={24} />}
              onClick={() => setIsEditing(false)}
            >
              Done
            </ActionButton>
          </>
        ) : (
          <ActionButton
            variant="filled"
            color="primary"
            icon={<Icon name="edit" size={24} />}
            onClick={() => setIsEditing(true)}
          >
            Edit
          </ActionButton>
        )}
      </div>
    </aside>
  );
}
