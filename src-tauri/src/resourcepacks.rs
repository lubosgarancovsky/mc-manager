use std::fs;

use serde::{Serialize, Deserialize};
use crate::paths::resourcepacks_folder_path;
use crate::shared::copy_into_folder;

#[derive(Serialize, Deserialize)]
pub struct ResourcePack {
    name: String,
    path: String,
    size: u64,
}

#[tauri::command]
pub fn get_resourcepacks() -> Result<Vec<ResourcePack>, String> {
    let path = resourcepacks_folder_path();
    let mut resourcepacks = Vec::new();

    for entry in fs::read_dir(path).map_err(|err| err.to_string())? {
        let entry = entry.map_err(|err| err.to_string())?;
        let file_path = entry.path();

        if file_path.is_file() {
            let file_name = file_path.file_name()
            .and_then(|name| name.to_str())
            .unwrap_or_default()
            .to_string();

            let metadata = fs::metadata(&file_path).map_err(|err| err.to_string())?;
            let file_size = metadata.len();
    
            resourcepacks.push(ResourcePack {
                name: file_name.clone(),
                path: file_path.to_str().unwrap().to_string(),
                size: file_size
            });
        }
    }

    Ok(resourcepacks)
}

#[tauri::command]
pub fn remove_resourcepack(data: ResourcePack) {
    let _ = fs::remove_file(data.path);
}

#[tauri::command]
pub fn add_resourcepack(paths: Vec<&str>) {
    let resourcepack_path = resourcepacks_folder_path();
    copy_into_folder(paths, resourcepack_path);
}