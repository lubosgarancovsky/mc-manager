import { invoke } from "@tauri-apps/api";
import { useEffect, useMemo, useState } from "react";
import { selectPath } from "../utils";
import { useSearch } from "./use-search";

export interface UseResourceOptions {
  getDataFn: string;
  addDataFn: string;
  removeDataFn: string;
  extensions: string[];
}

export function useResource<T extends { name: string; size: number }>(
  options: UseResourceOptions
) {
  const [data, setData] = useState<T[]>([]);
  const [dataToDelete, setDataToDelete] = useState<T | null>(null);

  const { search, handleSearch } = useSearch();

  const { getDataFn, addDataFn, removeDataFn, extensions } = options;

  const loadData = async () => {
    const data = await invoke<T[]>(getDataFn);
    setData(data.sort((a: T, b: T) => a.name.localeCompare(b.name)));
  };

  const addData = async () => {
    const paths = await selectPath({
      multiple: true,
      directory: false,
      filters: [
        {
          name: "All Files",
          extensions,
        },
      ],
    });

    if (paths) {
      await invoke(addDataFn, { paths });
      loadData();
    }
  };

  const removeData = async () => {
    if (dataToDelete) {
      await invoke(removeDataFn, { data: dataToDelete });
      setDataToDelete(null);
      loadData();
    }
  };

  const displayedData = useMemo(() => {
    if (!search) return data;

    return data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, data]);

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    displayedData,
    dataToDelete,
    search,
    handleSearch,
    setDataToDelete,
    loadData,
    addData,
    removeData,
  };
}
