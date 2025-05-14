import Header from "./components/Header";
import ThemeProvider from "./providers/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider>
        <main>
          <Header />
        </main>
      </ThemeProvider>
    </>
  );
}

export default App;
