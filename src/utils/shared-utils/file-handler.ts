import { invoke } from "@tauri-apps/api";
import { OpenDialogOptions } from "@tauri-apps/api/dialog";
import { open } from "@tauri-apps/api/dialog";

export const selectPath = async (options?: OpenDialogOptions) => {
  try {
    const selectedPath = await open(options);
    return selectedPath;
  } catch (err) {
    console.error(err);
  }
};

export const openFolder = async (fn: string) => {
  const path = await invoke<string>(fn);
  await selectPath({
    multiple: false,
    recursive: false,
    defaultPath: path,
  });
};
