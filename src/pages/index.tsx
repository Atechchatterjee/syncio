import { FocusEventHandler, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

const App = () => {
  const [paths, setPaths] = useState<any[]>([]);

  const getPaths = async (dirname: string) => {
    const data: any[] = await invoke("read", { dirname });
    setPaths(data);
  };

  return (
    <div className="flex flex-col p-10 justify-center">
      <input
        type="text"
        className="flex-1 self-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="path"
        onBlur={(e: any) => {
          getPaths(e.target.value);
        }}
        onKeyPress={(e: any) => {
          if (e.key === "Enter") {
            getPaths(e.target.value);
          }
        }}
      />
      <ul className="flex-1">
        {paths.map((path) => {
          return (
            <li className="p-3 mt-4 rounded-md bg-violet-800 text-white">
              {path}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
