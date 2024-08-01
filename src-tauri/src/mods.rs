use std::{fs, io::Read, path::{Path, PathBuf}};
use serde::{Serialize, Deserialize};

use crate::settings::{save_mods, load_mods};
use crate::paths::{mods_folder_path, mods_file_path, disabled_folder_path};

#[derive(Serialize, Deserialize, Clone)]
pub struct Mod {
    file_name: String,
    name: String,
    enabled: bool,
    size: u64,
}

fn file_has_extension(file_path: &Path, ext: &str) -> bool {
    match file_path.extension() {
        Some(extension) => extension == ext,
        None => false,
    }
}

// loads mods.json settings file into a vector of Mod structs
fn load_mods_file() -> Vec<Mod> {
    let mods_json_path = mods_file_path();

    if !mods_json_path.exists() {
        fs::File::create(&mods_json_path).unwrap();
    }

    let mut mods_file = fs::File::open(&mods_json_path).unwrap();
    let mut json_data = String::new();

    mods_file.read_to_string(&mut json_data).unwrap();
    match serde_json::from_str(&json_data) {
        Ok(mods) => mods,
        Err(_) => Vec::new(),
    }
}

// loads all .jar files from given folder into a vector of Mod structs
fn load_mods_from_folder(folder: &PathBuf, enabled: bool) -> Result<Vec<Mod>, String> {
    let mut mods = Vec::new();

    for entry in fs::read_dir(folder).map_err(|err| err.to_string())? {
        let entry = entry.map_err(|err| err.to_string())?;
        let file_path = entry.path();

        if file_path.is_file() && file_has_extension(&file_path, "jar") {
            let file_name = file_path.file_name()
                .and_then(|name| name.to_str())
                .unwrap_or_default()
                .to_string();

            let metadata = fs::metadata(&file_path).map_err(|err| err.to_string())?;
            let file_size = metadata.len();

            mods.push(Mod {
                file_name: file_name.clone(),
                name: file_name.clone(),
                size: file_size,
                enabled
            });
        }
    }

    Ok(mods)
}

// loads all .jar files from .minecraft/mods folder into a vector of Mod structs
fn load_enabled_mods() -> Vec<Mod> {
    let mods_folder = mods_folder_path();

    if !mods_folder.exists() {
        return Vec::new();
    }

    let mods = load_mods_from_folder(&mods_folder, true);

    match mods {
        Ok(mods) => mods,
        Err(_) => Vec::new(),
    }
}

// loads all .jar files from mc-manager/disabled folder into a vector of Mod structs
fn load_disabled_mods() -> Vec<Mod> {
    let mods_folder = disabled_folder_path();

    if !mods_folder.exists() {
        fs::create_dir(mods_folder).unwrap();
        return Vec::new();
    }

    let mods = load_mods_from_folder(&mods_folder, false);

    match mods {
        Ok(mods) => mods,
        Err(_) => Vec::new(),
    }
}


// Synchronizes mods between the mods.json and the .minecraft/mods + mc-manager/disabled folders
pub fn sync_mods() {
    let enabled_mods = load_enabled_mods();
    let disabled_mods = load_disabled_mods();

    let mut result = Vec::new();

    for enabled_mod in &enabled_mods {
        result.push(enabled_mod.clone());
    }

    for disabled_mod in &disabled_mods {
        result.push(disabled_mod.clone());
    }

    // save new vector in json file
    save_mods(&result);
    
}

#[tauri::command]
pub fn list_mods() -> Vec<Mod> {
    sync_mods();
    load_mods()
}

#[tauri::command]
pub fn change_status(item: Mod) {
    let mods_path = mods_folder_path().join(&item.file_name);
    let disabled_path = disabled_folder_path().join(&item.file_name);

    if item.enabled  {
        fs::rename(mods_path, disabled_path).unwrap();
    } else {
        fs::rename(disabled_path, mods_path).unwrap();
    }
}

#[tauri::command]
pub fn add_mod(path_to_mod: Vec<&str>) {

    let mods_folder = mods_folder_path();

    for path in path_to_mod {
        let path = Path::new(path);
        let destination = mods_folder.join(path.file_name().unwrap());

        if path.exists() && !destination.exists() {
            fs::copy(path, destination).unwrap();
        }
    }
}

#[tauri::command]
pub fn remove_mod(mod_to_remove: Mod) {
    let path = match mod_to_remove.enabled {
        true => mods_folder_path().join(&mod_to_remove.file_name),
        false => disabled_folder_path().join(&mod_to_remove.file_name),
    };

    fs::remove_file(path).unwrap();
}

#[tauri::command]
pub fn disable_all_mods() {
    let mods_folder = mods_folder_path();
    let disabled_folder = disabled_folder_path();

    for entry in fs::read_dir(mods_folder).map_err(|err| err.to_string()).unwrap() {
        let entry = entry.map_err(|err| err.to_string()).unwrap();
        let file_path = entry.path();

        if file_path.is_file() && file_has_extension(&file_path, "jar") {
            let file_name = file_path.file_name()
                .and_then(|name| name.to_str())
                .unwrap_or_default()
                .to_string();

            fs::rename(file_path, disabled_folder.join(file_name)).unwrap();
        }
    }
}

#[tauri::command]
pub fn enable_all_mods() {
    let mods_folder = mods_folder_path();
    let disabled_folder = disabled_folder_path();

    for entry in fs::read_dir(disabled_folder).map_err(|err| err.to_string()).unwrap() {
        let entry = entry.map_err(|err| err.to_string()).unwrap();
        let file_path = entry.path();

        if file_path.is_file() && file_has_extension(&file_path, "jar") {
            let file_name = file_path.file_name()
                .and_then(|name| name.to_str())
                .unwrap_or_default()
                .to_string();

            fs::rename(file_path, mods_folder.join(file_name)).unwrap();
        }
    }
}
