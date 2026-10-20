// useOnLoad.ts
import { useState, useEffect } from "react";

export const useOnLoad = (): boolean => {
  const [onLoad, setOnLoad] = useState<boolean>(false);

  useEffect(() => {
    setOnLoad(true);
  }, []);

  return onLoad;
};
