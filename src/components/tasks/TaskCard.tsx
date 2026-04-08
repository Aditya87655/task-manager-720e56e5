import { Calendar, Flag, MoreHorizontal, Trash2, Edit, User } from "lucide-react";
import { Task, Priority, Status } from "@/lib/store";
import { motion } from "framer-motion";
import { useState } from "react";

const PRIORITY_CONFIG: Record<Priority, { label: string; className: string }> = {
  urgent: { label: "Urgent", className: "bg-destructive/15 text-destructive" },
  high: { label: "High", className: "bg-warning/15 text-warning" },
  medium: { label: "Medium", className: "bg-primary/15 text-primary" },
  low: { label: "Low", className: "bg-muted text-muted-foreground" },
};

const STATUS_CONFIG: Record<Status, { label: string; className: string }> = {
  backlog: { label: "Backlog", className: "bg-muted text-muted-foreground" },
  todo: { label: "To Do", className: "bg-secondary text-secondary-foreground" },
  in_progress: { label: "In Progress", className: "bg-primary/15 text-primary" },
  done: { label: "Done", className: "bg-success/15 text-success" },
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Status) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const priority = PRIORITY_CONFIG[task.priority];
  const status = STATUS_CONFIG[task.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="group bg-card border border-border rounded-xl p-4 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer relative"
      onClick={() => onEdit(task)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 flex-1">
          {task.title}
        </h3>
        <div className="relative">
          <button
            onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
            className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-accent transition-all"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 w-36 bg-popover border border-border rounded-lg shadow-lg py-1 z-10 animate-scale-in">
              <button
                onClick={(e) => { e.stopPropagation(); onEdit(task); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors"
              >
                <Edit className="w-3.5 h-3.5" /> Edit
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(task.id); setShowMenu(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{task.description}</p>
      )}

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priority.className}`}>
            <Flag className="w-2.5 h-2.5 inline mr-0.5" />
            {priority.label}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const next: Record<Status, Status> = { backlog: "todo", todo: "in_progress", in_progress: "done", done: "backlog" };
              onStatusChange(task.id, next[task.status]);
            }}
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.className} hover:opacity-80 transition-opacity`}
          >
            {status.label}
          </button>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          {task.dueDate && (
            <span className="flex items-center gap-1 text-[10px]">
              <Calendar className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          )}
          {task.assignee && (
            <span className="flex items-center gap-1 text-[10px]">
              <User className="w-3 h-3" />
              {task.assignee.split(" ")[0]}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
