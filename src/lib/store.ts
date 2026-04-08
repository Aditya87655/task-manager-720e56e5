import { useState, useCallback } from "react";

export type Priority = "low" | "medium" | "high" | "urgent";
export type Status = "backlog" | "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  assignee?: string;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const SAMPLE_TASKS: Task[] = [
  {
    id: "1",
    title: "Design new landing page",
    description: "Create a modern landing page with hero section, features, and pricing",
    status: "in_progress",
    priority: "high",
    createdAt: "2026-04-01T10:00:00Z",
    updatedAt: "2026-04-07T14:30:00Z",
    dueDate: "2026-04-15T00:00:00Z",
    assignee: "John Doe",
    tags: ["design", "frontend"],
  },
  {
    id: "2",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: "todo",
    priority: "medium",
    createdAt: "2026-04-02T09:00:00Z",
    updatedAt: "2026-04-02T09:00:00Z",
    dueDate: "2026-04-20T00:00:00Z",
    tags: ["devops"],
  },
  {
    id: "3",
    title: "User authentication flow",
    description: "Implement login, register, and password reset functionality",
    status: "done",
    priority: "urgent",
    createdAt: "2026-03-28T08:00:00Z",
    updatedAt: "2026-04-05T16:00:00Z",
    assignee: "Jane Smith",
    tags: ["backend", "security"],
  },
  {
    id: "4",
    title: "API rate limiting",
    description: "Add rate limiting middleware to prevent abuse",
    status: "backlog",
    priority: "low",
    createdAt: "2026-04-03T11:00:00Z",
    updatedAt: "2026-04-03T11:00:00Z",
    tags: ["backend"],
  },
  {
    id: "5",
    title: "Mobile responsive fixes",
    description: "Fix layout issues on mobile devices for dashboard and task views",
    status: "todo",
    priority: "high",
    createdAt: "2026-04-04T13:00:00Z",
    updatedAt: "2026-04-06T10:00:00Z",
    dueDate: "2026-04-12T00:00:00Z",
    assignee: "John Doe",
    tags: ["frontend", "bug"],
  },
  {
    id: "6",
    title: "Database optimization",
    description: "Optimize slow queries and add proper indexing",
    status: "in_progress",
    priority: "medium",
    createdAt: "2026-04-05T09:30:00Z",
    updatedAt: "2026-04-07T11:00:00Z",
    tags: ["backend", "performance"],
  },
  {
    id: "7",
    title: "Write unit tests for auth module",
    description: "Achieve 90% code coverage for authentication module",
    status: "backlog",
    priority: "medium",
    createdAt: "2026-04-06T14:00:00Z",
    updatedAt: "2026-04-06T14:00:00Z",
    tags: ["testing"],
  },
  {
    id: "8",
    title: "Integrate analytics dashboard",
    description: "Add charts and metrics for user engagement tracking",
    status: "todo",
    priority: "low",
    createdAt: "2026-04-07T08:00:00Z",
    updatedAt: "2026-04-07T08:00:00Z",
    dueDate: "2026-04-25T00:00:00Z",
    tags: ["frontend", "analytics"],
  },
];

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>(SAMPLE_TASKS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "priority">("newest");

  const addTask = useCallback((task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const filteredTasks = tasks
    .filter((t) => {
      if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase()) && !t.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (filterStatus !== "all" && t.status !== filterStatus) return false;
      if (filterPriority !== "all" && t.priority !== filterPriority) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.status === "done").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    todo: tasks.filter((t) => t.status === "todo").length,
    backlog: tasks.filter((t) => t.status === "backlog").length,
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    stats,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
  };
}
