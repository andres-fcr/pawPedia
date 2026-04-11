interface SectionHeaderProps {
  title: string;
  icon: React.ReactNode;
}

const SectionHeader = ({ title, icon }: SectionHeaderProps) => (
  <div className="flex items-center gap-2 mb-4 mt-8 first:mt-0">
    {icon}
    <h3 className="text-lg sm:text-xl font-outfit font-semibold text-foreground">{title}</h3>
  </div>
);

export default SectionHeader;