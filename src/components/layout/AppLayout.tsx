import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { TopNav } from "./TopNav";
import { useTaskStore } from "@/lib/store";
import React from "react";

export const TaskContext = React.createContext<ReturnType<typeof useTaskStore> | null>(null);

export function useTaskContext() {
  const ctx = React.useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext must be used within AppLayout");
  return ctx;
}

export function AppLayout() {
  const store = useTaskStore();

  return (
    <TaskContext.Provider value={store}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopNav searchQuery={store.searchQuery} onSearchChange={store.setSearchQuery} />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </TaskContext.Provider>
  );
}
