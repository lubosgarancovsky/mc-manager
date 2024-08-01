
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod settings;
mod paths;
mod mods;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            mods::list_mods, 
            mods::change_status,
            mods::remove_mod,
            mods::add_mod,
            mods::enable_all_mods,
            mods::disable_all_mods,
            settings::settings_exists, 
            settings::create_settings,
            settings::load_settings,
            settings::save_settings,
            settings::run_minecraft,
            paths::path_to_appdata,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
