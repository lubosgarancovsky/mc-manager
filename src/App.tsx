import { useEffect, useState } from "react";
import { Dashboard, IntroView } from "./views";
import { invoke } from "@tauri-apps/api";
import { NextUIProvider } from "@nextui-org/system";
import "./styles/index.css";

type View = "intro" | "dashboard";

function App() {
  const [view, setView] = useState<View | null>(null);

  const chooseView = async () => {
    const isFirstlaunch = !(await invoke("settings_exists"));
    setView(isFirstlaunch ? "intro" : "dashboard");
  };

  useEffect(() => {
    chooseView();
  }, []);

  return (
    <NextUIProvider>
      <div className="dark text-foreground bg-background w-full h-full relative">
        {view === "intro" && <IntroView onContinue={chooseView} />}
        {view === "dashboard" && <Dashboard />}
      </div>
    </NextUIProvider>
  );
}

export default App;
