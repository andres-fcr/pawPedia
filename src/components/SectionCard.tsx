interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const SectionCard = ({ title, icon, children, className = "" }: SectionCardProps) => {
  return (
    <div className={`bg-card rounded-2xl p-6 border-2 border-border shadow-sm ${className}`}>
      <h2 className="text-xl font-outfit font-semibold mb-4 text-foreground flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
};

export default SectionCard;
