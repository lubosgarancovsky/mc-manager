import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { selectPath } from "../../utils";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

interface IntroViewProps {
  onContinue: () => void;
}

const IntroView: React.FC<IntroViewProps> = ({ onContinue }) => {
  const [folderPath, setFolderPath] = useState<string>("");

  const handleFolderSelection = async () => {
    const path = await selectPath({
      multiple: false,
      directory: true,
      title: "Select your minecraft directory",
    });

    if (path) setFolderPath(path.toString());
  };

  const getDefaultFolderPath = async () => {
    const path: string = await invoke("path_to_appdata");
    setFolderPath(`${path}\\.minecraft`);
  };

  const saveFolderPath = async (path: string) => {
    await invoke("create_settings", { mcFolderPath: path });
  };

  const handleContinue = async () => {
    if (!folderPath) return;

    await saveFolderPath(folderPath);
    onContinue();
  };

  useEffect(() => {
    getDefaultFolderPath();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <div className="p-4 grid place-items-center h-full w-full">
        <div className="w-2/3 max-w-xl flex flex-col gap-8">
          <div className="flex flex-col gap-1.5 text-center">
            <h1>Minecraft Manager</h1>
            <p className="text-zinc-400">All tools in one place</p>
          </div>
          <div>
            <div className="flex w-full gap-3 items-center">
              <Input
                label="Choose your minecraft directory"
                value={folderPath}
                onChange={(e) => setFolderPath(e.target.value)}
              />
              <Button onPress={handleFolderSelection}>Browse</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-zinc-700 w-full flex justify-end">
        <Button color="primary" onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default IntroView;
