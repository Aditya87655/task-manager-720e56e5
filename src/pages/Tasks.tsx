import { Plus, Filter, ArrowUpDown, LayoutGrid, List } from "lucide-react";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskModal } from "@/components/tasks/TaskModal";
import { useTaskContext } from "@/components/layout/AppLayout";
import { Task, Status, Priority } from "@/lib/store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const STATUS_COLUMNS: { value: Status; label: string; color: string }[] = [
  { value: "backlog", label: "Backlog", color: "bg-muted-foreground" },
  { value: "todo", label: "To Do", color: "bg-secondary-foreground" },
  { value: "in_progress", label: "In Progress", color: "bg-primary" },
  { value: "done", label: "Done", color: "bg-success" },
];

export default function Tasks() {
  const store = useTaskContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [view, setView] = useState<"board" | "list">("board");

  const handleSave = (data: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    if (editingTask) {
      store.updateTask(editingTask.id, data);
      toast.success("Task updated");
    } else {
      store.addTask(data);
      toast.success("Task created");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">{store.tasks.length} tasks total</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Filters */}
          <select
            value={store.filterStatus}
            onChange={(e) => store.setFilterStatus(e.target.value as Status | "all")}
            className="h-9 px-3 rounded-lg bg-muted/50 border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Status</option>
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <select
            value={store.filterPriority}
            onChange={(e) => store.setFilterPriority(e.target.value as Priority | "all")}
            className="h-9 px-3 rounded-lg bg-muted/50 border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={store.sortBy}
            onChange={(e) => store.setSortBy(e.target.value as "newest" | "oldest" | "priority")}
            className="h-9 px-3 rounded-lg bg-muted/50 border border-border text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="priority">Priority</option>
          </select>

          {/* View toggle */}
          <div className="flex items-center bg-muted/50 border border-border rounded-lg p-0.5">
            <button
              onClick={() => setView("board")}
              className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${view === "board" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${view === "list" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => { setEditingTask(null); setModalOpen(true); }}
            className="h-9 px-4 rounded-lg text-xs font-medium gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> New Task
          </button>
        </div>
      </motion.div>

      {/* Board View */}
      {view === "board" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {STATUS_COLUMNS.map((col) => {
            const columnTasks = store.tasks.filter((t) => t.status === col.value);
            return (
              <div key={col.value}>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                  <h3 className="text-sm font-semibold text-foreground">{col.label}</h3>
                  <span className="text-xs text-muted-foreground ml-auto">{columnTasks.length}</span>
                </div>
                <div className="space-y-3 min-h-[200px]">
                  <AnimatePresence>
                    {columnTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={(t) => { setEditingTask(t); setModalOpen(true); }}
                        onDelete={(id) => { store.deleteTask(id); toast.success("Task deleted"); }}
                        onStatusChange={(id, s) => { store.updateTask(id, { status: s }); toast.success("Status updated"); }}
                      />
                    ))}
                  </AnimatePresence>
                  {columnTasks.length === 0 && (
                    <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                      <p className="text-xs text-muted-foreground">No tasks</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-2">
          <AnimatePresence>
            {store.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={(t) => { setEditingTask(t); setModalOpen(true); }}
                onDelete={(id) => { store.deleteTask(id); toast.success("Task deleted"); }}
                onStatusChange={(id, s) => { store.updateTask(id, { status: s }); toast.success("Status updated"); }}
              />
            ))}
          </AnimatePresence>
          {store.tasks.length === 0 && (
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
              <p className="text-sm text-muted-foreground">No tasks match your filters</p>
            </div>
          )}
        </div>
      )}

      <TaskModal
        open={modalOpen}
        task={editingTask}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
