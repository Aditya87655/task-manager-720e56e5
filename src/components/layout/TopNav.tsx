import { Moon, Sun, Bell, Search, LogOut } from "lucide-react";
import { useTheme } from "@/lib/theme";

interface TopNavProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function TopNav({ searchQuery, onSearchChange }: TopNavProps) {
  const { isDark, toggle } = useTheme();

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-6 gap-4">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
        />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
            JD
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground leading-none">John Doe</p>
            <p className="text-xs text-muted-foreground mt-0.5">john@example.com</p>
          </div>
        </div>
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
