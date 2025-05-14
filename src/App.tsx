import { ThemeToggle } from "./components/ThemeToggle";
import ThemeProvider from "./providers/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider>
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
