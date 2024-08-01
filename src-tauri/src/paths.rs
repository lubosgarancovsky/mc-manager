use std::{env, path::{Path, PathBuf}};

const MANAGER_FOLDER_NAME: &str = ".mc-manager";
const SETTINGS_FILE_NAME: &str = "settings.json";
const MC_FOLDER_NAME: &str = ".minecraft";
const MODS_FOLDER_NAME: &str = "mods";
const MODS_FILE_NAME: &str = "mods.json";
const DISABLED_FOLDER_NAME: &str = "disabled";

pub fn path_to_local_appdata() -> String {
    env::var("LOCALAPPDATA").unwrap()
}

#[tauri::command]
pub fn path_to_appdata() -> String {
    env::var("APPDATA").unwrap()
}

// Returns path of mc-manager/settings.json
pub fn settings_path() -> PathBuf {
    Path::new(&path_to_local_appdata()).join(MANAGER_FOLDER_NAME).join(SETTINGS_FILE_NAME)
}

// Returns path of .minecraft/mods folder
pub fn mods_folder_path() -> PathBuf {
    Path::new(&path_to_appdata()).join(MC_FOLDER_NAME).join(MODS_FOLDER_NAME)
}

// Returns path of mc-manager/mods.json
pub fn mods_file_path() -> PathBuf {
    Path::new(&path_to_local_appdata()).join(MANAGER_FOLDER_NAME).join(MODS_FILE_NAME)
}

// Returns path of mc-manager/disabled folder
pub fn disabled_folder_path() -> PathBuf {
    Path::new(&path_to_local_appdata()).join(MANAGER_FOLDER_NAME).join(DISABLED_FOLDER_NAME)
}

// Returns path of mc-manager
pub fn manager_folder_path() -> PathBuf {
    Path::new(&path_to_local_appdata()).join(MANAGER_FOLDER_NAME)
}