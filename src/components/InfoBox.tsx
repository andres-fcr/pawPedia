interface InfoBoxProps {
  label: string;
  value: string;
  accent?: "primary" | "accent";
}

const InfoBox = ({ label, value, accent = "primary" }: InfoBoxProps) => {
  const bgClass = accent === "accent" ? "bg-accent/5 border-accent/20" : "bg-primary/5 border-primary/20";

  return (
    <div className={`rounded-xl p-3 border-2 ${bgClass}`}>
      <span className="text-muted-foreground font-semibold uppercase tracking-wide">
        {label}
      </span>
      <p className="font-outfit font-medium text-sm text-foreground mt-1">
        {value}
      </p>
    </div>
  );
};

export default InfoBox;
