import { motion } from "framer-motion";
import { User, Lock, Bell, Palette, Globe, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences.</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Profile</h2>
        </div>
        <div className="flex items-center gap-5 mb-6">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
            JD
          </div>
          <div>
            <button className="h-9 px-4 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground hover:bg-accent transition-colors">
              Change Avatar
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
          </div>
        </div>
        <button
          onClick={() => toast.success("Profile updated")}
          className="mt-4 h-10 px-5 rounded-lg text-sm font-medium gradient-primary text-primary-foreground shadow-glow hover:opacity-90 transition-opacity"
        >
          Save Changes
        </button>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Security</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full h-10 px-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" />
            </div>
          </div>
          <button
            onClick={() => toast.success("Password updated")}
            className="h-10 px-5 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
          >
            Update Password
          </button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="space-y-4">
          {["Email notifications", "Push notifications", "Task reminders", "Weekly digest"].map((item) => (
            <div key={item} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{item}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-card after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
