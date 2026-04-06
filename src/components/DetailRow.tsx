interface DetailRowProps {
  label: string;
  value: string;
  showBorder?: boolean;
}

const DetailRow = ({ label, value, showBorder = true }: DetailRowProps) => {
  return (
    <div className={`flex justify-between items-center py-3 ${showBorder ? "border-b border-border/50" : ""}`}>
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-outfit font-medium text-foreground text-sm text-right max-w-[60%]">
        {value}
      </span>
    </div>
  );
};

export default DetailRow;
