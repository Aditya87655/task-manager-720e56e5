import { motion } from "framer-motion";
import { useTaskContext } from "@/components/layout/AppLayout";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";

const COLORS = ["hsl(238 76% 62%)", "hsl(142 71% 45%)", "hsl(38 92% 50%)", "hsl(220 10% 46%)"];

export default function Analytics() {
  const { allTasks, stats } = useTaskContext();

  const statusData = [
    { name: "Backlog", value: stats.backlog },
    { name: "To Do", value: stats.todo },
    { name: "In Progress", value: stats.inProgress },
    { name: "Done", value: stats.done },
  ];

  const priorityData = [
    { name: "Urgent", value: allTasks.filter((t) => t.priority === "urgent").length },
    { name: "High", value: allTasks.filter((t) => t.priority === "high").length },
    { name: "Medium", value: allTasks.filter((t) => t.priority === "medium").length },
    { name: "Low", value: allTasks.filter((t) => t.priority === "low").length },
  ];

  const weeklyData = [
    { day: "Mon", created: 3, completed: 1 },
    { day: "Tue", created: 2, completed: 2 },
    { day: "Wed", created: 4, completed: 3 },
    { day: "Thu", created: 1, completed: 2 },
    { day: "Fri", created: 3, completed: 4 },
    { day: "Sat", created: 0, completed: 1 },
    { day: "Sun", created: 1, completed: 0 },
  ];

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your productivity and task completion.</p>
      </motion.div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Completion Rate", value: `${completionRate}%` },
          { label: "Total Tasks", value: stats.total },
          { label: "Active", value: stats.inProgress + stats.todo },
          { label: "Completed", value: stats.done },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card border border-border rounded-xl p-5"
          >
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Task Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={4} strokeWidth={0}>
                {statusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: "0.75rem" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {statusData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                <span className="text-xs text-muted-foreground">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Activity */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: "0.75rem" }} />
              <Area type="monotone" dataKey="created" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="completed" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Priority Breakdown */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card border border-border rounded-xl p-6 lg:col-span-2">
          <h3 className="text-sm font-semibold text-foreground mb-4">Priority Breakdown</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "0.75rem", fontSize: "0.75rem" }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {priorityData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
