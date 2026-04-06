import { useLocation, useNavigate } from "react-router";
import { Menu, Cat, Dog, Beef, Moon, Sun, Mountain } from "lucide-react";
import { type UrlSections } from "@/lib/api";
import { useTheme } from "@/hooks/UseTheme";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const MobileMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const section = location.pathname.split("/")[1] as UrlSections;

  const handleSectionChange = (value: UrlSections) => {
    navigate(`/${value}`);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const menuItems = [
    { value: "cats" as UrlSections, label: "Gatos", icon: <Cat className="w-5 h-5" /> },
    { value: "dogs" as UrlSections, label: "Perros", icon: <Dog className="w-5 h-5" /> },
    { value: "vacunos" as UrlSections, label: "Vacunos", icon: <Beef className="w-5 h-5" /> },
    { value: "caballos" as UrlSections, label: "Caballos", icon: <Mountain className="w-5 h-5" /> },
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-primary hover:bg-primary/10 transition-colors duration-300"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={12} className="w-56 p-2 rounded-2xl border-2 border-border">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleSectionChange(item.value)}
              className={`w-full flex items-center gap-3 px-4 py-2 my-2 rounded-lg text-left transition-colors duration-200 ${
                section === item.value
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              {item.icon}
              <span className="font-outfit font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="border-t border-border mt-2 pt-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-foreground hover:bg-secondary transition-colors duration-200"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            <span className="font-outfit font-medium">
              {theme === "dark" ? "Modo claro" : "Modo oscuro"}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MobileMenu;
