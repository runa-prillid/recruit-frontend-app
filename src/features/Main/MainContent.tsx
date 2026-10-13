import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contentApi } from "../../api/contentApi";
import { TitleSection } from "./TitleSection";
import { BodySection } from "./BodySection";
import styles from "./MainContent.module.css";

type MainContentProps = {
  selectedId: number | null;
};

export function MainContent({ selectedId }: MainContentProps) {
  const queryClient = useQueryClient();

  const { data: content, isLoading } = useQuery({
    queryKey: ["content", selectedId],
    queryFn: () => contentApi.getContent(selectedId!),
    enabled: selectedId !== null && selectedId !== 0,
  });

  const updateMutation = useMutation({
    mutationFn: ({ title, body }: { title: string; body: string }) =>
      contentApi.updateContent(selectedId!, { title, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content", selectedId] });
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });

  if (!selectedId) {
    return (
      <main className={styles.main}>
        <p className={styles.empty}>ページを選択してください</p>
      </main>
    );
  }

  if (isLoading || !content) {
    return (
      <main className={styles.main}>
        <p className={styles.empty}>読み込み中...</p>
      </main>
    );
  }

  const handleTitleSave = (title: string) => {
    updateMutation.mutate({ title, body: content.body || "" });
  };

  const handleBodySave = (body: string) => {
    updateMutation.mutate({ title: content.title || "", body });
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <TitleSection
          key={`title-${content.id}`}
          title={content.title || ""}
          onSave={handleTitleSave}
        />
        <BodySection
          key={`body-${content.id}`}
          body={content.body || ""}
          onSave={handleBodySave}
        />
      </div>
    </main>
  );
}
