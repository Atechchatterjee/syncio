use home::home_dir;
use std::fs;

#[tauri::command]
pub fn read(dirname: &str) -> Vec<String> {
    let mut home_path = home_dir().unwrap().to_str().unwrap().to_owned();
    home_path.push_str(dirname);

    let paths = fs::read_dir(home_path.as_str()).unwrap();
    let mut diff_paths: Vec<String> = vec![];

    for path in paths {
        diff_paths.push(path.unwrap().file_name().to_str().unwrap().to_owned());
    }

    return diff_paths;
}
