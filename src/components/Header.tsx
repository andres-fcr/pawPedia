import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="relative mb-8">
      <div className="absolute inset-0 glass rounded-2xl -z-10" />
      <div className="flex items-center justify-between px-6 py-4 md:justify-center md:gap-x-6">
        <div className="flex items-center gap-3 lg:gap-x-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/40 transition-all duration-300" />
            <div className="relative flex items-center justify-center bg-gradient-to-br from-primary to-amber-500 border-2 border-primary/20 rounded-full size-12 lg:size-16 overflow-hidden">
              <img src="/images/logo.webp" alt="logo" className="h-3/4 w-auto" />
            </div>
          </div>
          <h1 className="text-2xl font-outfit font-bold tracking-tight lg:text-3xl">
            <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
              Paw
            </span>
            <span className="text-foreground">Pedia</span>
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
