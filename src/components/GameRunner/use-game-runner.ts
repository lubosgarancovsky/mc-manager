import { useEffect, useState } from "react";
import { selectPath, Settings } from "../../utils";
import { invoke } from "@tauri-apps/api";

function useGameRunner() {
  const [settings, setSettings] = useState<Settings | null>(null);

  const loadSettings = async () => {
    const result: Settings = await invoke("load_settings");
    setSettings(result);
  };

  const runMinecraft = async () => {
    await invoke("run_minecraft");
  };

  const getExecFileName = () => {
    if (settings && settings.executable_path) {
      return settings.executable_path.split("\\").pop();
    }

    return null;
  };

  const saveExecutable = async () => {
    const path = await selectPath({
      directory: false,
      multiple: false,
      defaultPath: settings?.mc_folder_path,
      filters: [
        {
          name: "All Files",
          extensions: ["exe"],
        },
      ],
    });

    if (!path) return;

    await invoke("save_settings", {
      settings: { ...settings, executable_path: path || "" },
    });
    await loadSettings();
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    run: runMinecraft,
    save: saveExecutable,
    fileName: getExecFileName(),
  };
}

export default useGameRunner;
