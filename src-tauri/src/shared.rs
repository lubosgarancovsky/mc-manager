use std::{fs, path::{Path, PathBuf}};

pub fn copy_into_folder(paths: Vec<&str>, destination_folder: PathBuf) {
    for path in paths {
        let path = Path::new(path);
        let destination = destination_folder.join(path.file_name().unwrap());

        if path.exists() && !destination.exists() {
            fs::copy(path, destination).unwrap();
        }
    }
}