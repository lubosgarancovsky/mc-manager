export type Mod = {
  name: string;
  size: number;
  enabled: boolean;
  fileName: string;
};

export type Settings = {
  mc_folder_path: string;
  executable_path: string;
};

export type Resourcepack = {
  name: string;
  path: string;
  size: number;
};

export type Shaderpack = {
  name: string;
  path: string;
  size: number;
};

export type Resource<T> = T extends { name: string; size: number } ? T : never;
