import { motion } from "framer-motion";
import { DashboardStat } from "../types";

interface StatCardProps extends DashboardStat {
  index: number;
}

export function StatCard({ label, value, icon: Icon, color, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="dashboard-stat-card"
    >
      <div
        className="stat-icon"
        style={{
          backgroundColor: `${color}15`,
          color,
        }}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-label">{label}</p>
      </div>
    </motion.div>
  );
} 