import { CheckSquare, ListTodo, Clock, Archive, TrendingUp, Plus } from "lucide-react";
import { StatCard } from "@/components/tasks/StatCard";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskModal } from "@/components/tasks/TaskModal";
import { useTaskContext } from "@/components/layout/AppLayout";
import { Task } from "@/lib/store";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Dashboard() {
  const store = useTaskContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const recentTasks = store.allTasks.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning, John</h1>
          <p className="text-sm text-muted-foreground mt-1">Here's what's happening with your tasks today.</p>
        </div>
        <button
          onClick={() => { setEditingTask(null); setModalOpen(true); }}
          className="h-10 px-5 rounded-lg text-sm font-medium gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Task
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tasks" value={store.stats.total} icon={ListTodo} delay={0} />
        <StatCard title="Completed" value={store.stats.done} icon={CheckSquare} accent="bg-success/10 text-success" delay={0.05} />
        <StatCard title="In Progress" value={store.stats.inProgress} icon={Clock} accent="bg-warning/10 text-warning" delay={0.1} />
        <StatCard title="Backlog" value={store.stats.backlog} icon={Archive} delay={0.15} />
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Tasks</h2>
          <a href="/tasks" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">View all →</a>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {recentTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(t) => { setEditingTask(t); setModalOpen(true); }}
              onDelete={(id) => { store.deleteTask(id); toast.success("Task deleted"); }}
              onStatusChange={(id, s) => { store.updateTask(id, { status: s }); toast.success("Status updated"); }}
            />
          ))}
        </div>
      </div>

      <TaskModal
        open={modalOpen}
        task={editingTask}
        onClose={() => setModalOpen(false)}
        onSave={(data) => {
          if (editingTask) {
            store.updateTask(editingTask.id, data);
            toast.success("Task updated");
          } else {
            store.addTask(data);
            toast.success("Task created");
          }
        }}
      />
    </div>
  );
}
