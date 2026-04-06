interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: "primary" | "accent";
}

const StatCard = ({ icon, label, value, accent = "primary" }: StatCardProps) => {
  const bgClass = accent === "accent" ? "bg-accent/10" : "bg-primary/10";
  const iconColor = accent === "accent" ? "text-accent" : "text-primary";

  return (
    <div className="bg-card rounded-2xl p-5 border-2 border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 ${bgClass} rounded-xl`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <span className="text-xs text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-xl font-outfit font-semibold text-foreground">
        {value}
      </p>
    </div>
  );
};

export default StatCard;
