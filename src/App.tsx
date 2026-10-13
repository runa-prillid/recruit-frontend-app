import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./layouts/AppLayout";
import { Sidebar } from "./features/Sidebar/Sidebar";
import { MainContent } from "./features/Main/MainContent";
import { Footer } from "./features/Footer/Footer";

const queryClient = new QueryClient();

function AppContent() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <AppLayout
      sidebar={<Sidebar selectedId={selectedId} onSelect={setSelectedId} />}
      main={<MainContent selectedId={selectedId} />}
      footer={<Footer />}
    />
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
