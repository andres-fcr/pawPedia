const Logo = () => {
  return (
    <section className="flex items-center gap-4">
      <div className="grid bg-amber-100 place-items-center overflow-visible border-2 border-amber-400 rounded-full size-9 lg:size-12">
        <img src="src/assets/images/logo.webp" alt="paw pedia logo" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-amber-500 italic">
          Paw<span >Pedia</span>
        </h1>
      </div>
    </section>
  );
};

export default Logo;
