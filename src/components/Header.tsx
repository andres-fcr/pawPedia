import { ThemeToggle } from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="relative mb-8">
      <div className="absolute inset-0 soft-card -z-10" />
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 lg:gap-x-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full transition-all duration-300 group-hover:from-primary/50 group-hover:to-accent/50" />
            <div className="relative flex items-center justify-center bg-gradient-to-br from-primary to-accent border-2 border-primary/20 rounded-full size-12 lg:size-16 overflow-hidden">
              <img src="/images/logo.webp" alt="logotipo" className="h-3/4 w-auto" />
            </div>
          </div>
          <h1 className="text-2xl font-outfit font-bold tracking-tight lg:text-3xl">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Paw
            </span>
            <span className="text-foreground">Pedia</span>
          </h1>
        </div>
        <MobileMenu />
        <div className="hidden md:flex">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
