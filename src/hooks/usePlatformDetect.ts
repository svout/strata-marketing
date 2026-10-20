import { useEffect, useState } from "react";

export type PlatformType = "android" | "ios" | "other";

export function usePlatformDetect(): PlatformType {
  const [platform, setPlatform] = useState<PlatformType>("other");

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const ua: string =
      navigator.userAgent ||
      (navigator as Navigator & { vendor?: string }).vendor ||
      "";

    const uaLower = ua.toLowerCase();

    if (/android/i.test(uaLower)) {
      setPlatform("android");
    } else if (
      /iPad|iPhone|iPod/.test(ua) &&
      !(window as Window & { MSStream?: unknown }).MSStream
    ) {
      setPlatform("ios");
    } else {
      setPlatform("other");
    }
  }, []);

  return platform;
}
