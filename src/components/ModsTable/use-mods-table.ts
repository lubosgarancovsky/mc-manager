import { invoke } from "@tauri-apps/api";
import { useState, useEffect, useMemo } from "react";
import { Mod, selectPath } from "../../utils";

function useModsTable() {
  const [mods, setMods] = useState<Mod[]>([]);
  const [search, setSearch] = useState<string>("");
  const [modToDelete, setModToDelete] = useState<Mod | null>(null);

  const loadMods = async () => {
    const mods = await invoke<Mod[]>("list_mods");
    setMods(mods.sort((a: Mod, b: Mod) => a.name.localeCompare(b.name)));
  };

  const handleChange = async (mod: Mod) => {
    await invoke("change_status", { item: mod });
    await loadMods();
  };

  const handleAddMod = async () => {
    const paths = await selectPath({
      multiple: true,
      directory: false,
      filters: [
        {
          name: "All Files",
          extensions: ["jar"],
        },
      ],
    });

    if (paths) {
      await invoke("add_mod", { pathToMod: paths });
      loadMods();
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const displayedMods = useMemo(() => {
    if (!search) return mods;

    return mods.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, mods]);

  const enabledCount = useMemo(() => {
    return mods.filter((mod) => mod.enabled).length;
  }, [mods]);

  const handleDelete = async () => {
    if (modToDelete) {
      await invoke("remove_mod", { modToRemove: modToDelete });
      setModToDelete(null);
      loadMods();
    }
  };

  const handleSwitchAllModes = async (toEnabled: boolean) => {
    await invoke(toEnabled ? "enable_all_mods" : "disable_all_mods");
    loadMods();
  };

  useEffect(() => {
    loadMods();
  }, []);

  return {
    modToDelete,
    mods: displayedMods,
    allDisabled: enabledCount === 0 && mods.length > 0,
    enabledCount,
    search,
    loadMods,
    setModToDelete,
    handleSwitchAllModes,
    handleDelete,
    handleSearch,
    handleAddMod,
    handleChange,
  };
}

export default useModsTable;
