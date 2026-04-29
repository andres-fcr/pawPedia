
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12">
      <div className="soft-card px-6 py-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {year} PawPedia.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
