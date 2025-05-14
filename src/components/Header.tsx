import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-slate-200 dark:border-slate-700 dark:bg-slate-900">
      <Logo />
      
      <ThemeToggle />
    </header>
  );
};

export default Header;
