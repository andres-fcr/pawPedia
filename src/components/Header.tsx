import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex mb-4 gap-x-4 md:justify-center items-center lg:gap-x-6 lg:mb-8">
      <ThemeToggle />
      <div className="flex items-center justify-center bg-amber-50/80 overflow-visible border-2 border-amber-400 rounded-full size-14 lg:size-20">
        <img src="/images/logo.webp" alt="logo" className="h-full w-auto" />
      </div>
      <h1 className="text-2xl font-bold text-center lg:text-3xl">
        Paw
        <span className="text-amber-500">Pedia</span>
      </h1>
    </header>
  );
};

export default Header;
