import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

function removeTrailingSlash(path: string) {
  if (path.length != 1 && path.charAt(path.length - 1) === "/")
    return path.substring(0, path.length - 1);
  else return path;
}

const App = () => {
  const [curDir, setCurDir] = useState<string>("/");
  const [subDirs, setSubDirs] = useState<string[]>([]);

  async function getSubDirs() {
    const data: any[] = await invoke("read", { dirname: curDir });
    setSubDirs(data);
  }

  function moveToNextSubDir(subDir: string) {
    setCurDir((curDir) => {
      if (curDir != "/") return `${curDir}/${subDir}`;
      else return `/${subDir}`;
    });
  }

  function moveToPrevSubDir() {
    setCurDir((curDir) => {
      let curDirTrimmed = removeTrailingSlash(curDir);
      let prevDir = curDirTrimmed.substring(0, curDirTrimmed.lastIndexOf("/"));
      if (prevDir.length == 0) return "/";
      else return prevDir;
    });
  }

  useEffect(() => {
    getSubDirs();
  }, [curDir]);

  return (
    <div className="flex flex-col p-10 justify-center">
      <input
        type="text"
        className="flex-1 self-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="path"
        value={curDir}
        onChange={(e: any) => {
          const field_value = e.target.value;
          if (field_value.length == 0) setCurDir("/");
          else setCurDir(e.target.value);
        }}
      />
      <ul className="flex-1">
        <li
          className="p-3 mt-4 rounded-md bg-violet-800 text-white cursor-pointer hover:bg-violet-700"
          onClick={() => moveToPrevSubDir()}
        >
          ..
        </li>
        {subDirs.map((path) => {
          return (
            <li
              className="p-3 mt-4 rounded-md bg-violet-800 text-white cursor-pointer hover:bg-violet-700"
              onClick={() => moveToNextSubDir(path)}
            >
              {path}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
