#![cfg_attr(
    all(not(debug_assertions), target_os = "linux"),
    windows_subsystem = "linux"
)]

mod read;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![read::read])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
