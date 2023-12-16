use std::{fs, io};

fn get_files_in_directory(path: &str) -> io::Result<Vec<String>> {
    // Get a list of all entries in the folder
    let entries = fs::read_dir(path)?;
    println!("entries: {:?}", entries);

    // Extract the filenames from the directory entries and store them in a vector
    let file_names: Vec<String> = entries
        .filter_map(|entry| {
            let path = entry.ok()?.path();
            path.file_name()?.to_str().map(|s| s.to_owned())
        })
        .collect();

    Ok(file_names)
}

#[tauri::command]
pub fn read(dirname: &str) -> Vec<String> {
    match get_files_in_directory(dirname) {
        Ok(matched_entries) => {
            println!("matched entries: {:?}", matched_entries);
            return matched_entries;
        }
        Err(_) => {
            println!("Couldnot retrieve files!!");
            return vec![];
        }
    }
}
