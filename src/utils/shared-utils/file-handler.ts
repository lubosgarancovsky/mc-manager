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
