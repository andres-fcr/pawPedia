import { ThemeToggle } from "./components/ThemeToggle";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
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
