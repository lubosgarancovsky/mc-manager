use serde::{Serialize, Deserialize};
use std::io::Read;
use std::path::Path;
use std::env;
use std::fs;
use std::io::Write;
use std::process::Command;

use crate::mods::Mod;
use crate::paths::{path_to_local_appdata, mods_file_path, settings_path };

const MANAGER_FOLDER_NAME: &str = ".mc-manager";
const SETTINGS_FILE_NAME: &str = "settings.json";
const MC_FOLDER_NAME: &str = ".minecraft";
pub const MODS_FOLDER_NAME: &str = "mods";
pub const MODS_FILE_NAME: &str = "mods.json";
pub const DISABLED_FOLDER_NAME: &str = "disabled";

#[derive(Serialize, Deserialize)]
pub struct Settings {
    mc_folder_path: String,
    executable_path: String
}

// Saves a vector of Mod structs to mc-manager/mods.json
pub fn save_mods(mods: &Vec<Mod>) {
    let path = mods_file_path();
   
    if !path.exists() {
        fs::File::create(&path).unwrap();
    }

    fs::write(&path, serde_json::to_string_pretty(mods).unwrap()).unwrap();
}

// Loads a vector of Mod structs from mc-manager/mods.json
pub fn load_mods() -> Vec<Mod> {
    let path_to_mods = mods_file_path();

    if !Path::exists(&path_to_mods) {
        return Vec::new();
    }

    let mut file = fs::File::open(&path_to_mods).unwrap();
    let mut json_data = String::new();
    file.read_to_string(&mut json_data).unwrap();
    serde_json::from_str(&json_data).unwrap()
}

// Loads settings.json into Settings struct
#[tauri::command]
pub fn load_settings() -> Settings {
    let mut file = fs::File::open(settings_path()).unwrap();
    let mut json_data = String::new();
    file.read_to_string(&mut json_data).unwrap();
    serde_json::from_str(&json_data).unwrap()
}

#[tauri::command]
pub fn save_settings(settings: Settings) {
    let mut file = fs::File::create(settings_path()).unwrap();
    let json_data = serde_json::to_string_pretty(&settings).unwrap();
    file.write_all(json_data.as_bytes()).unwrap();
}

#[tauri::command]
pub fn settings_exists() -> bool {
    match env::var("LOCALAPPDATA") {
        Ok(appdata_path) => Path::new(&appdata_path)
            .join(MANAGER_FOLDER_NAME)
            .join(SETTINGS_FILE_NAME)
            .exists(),
        Err(_) => false,
    }
}


#[tauri::command]
pub fn create_settings(mc_folder_path: &str) {
    let appdata = path_to_local_appdata();
    let full_path = Path::new(&appdata).join(MANAGER_FOLDER_NAME);

    fs::create_dir_all(&full_path).unwrap();
    let mut settings_file = fs::File::create(full_path.join(SETTINGS_FILE_NAME)).unwrap();

    let settings = Settings {
        mc_folder_path: mc_folder_path.to_string(),
        executable_path: "".to_string()
    };

    let json_string = serde_json::to_string_pretty(&settings).unwrap();
    settings_file.write_all(json_string.as_bytes()).unwrap();
}

#[tauri::command]
pub fn run_minecraft() {
    let settings = load_settings();
    
    if !settings.executable_path.is_empty() {
        Command::new(&settings.executable_path).spawn().unwrap();
    }
    
}