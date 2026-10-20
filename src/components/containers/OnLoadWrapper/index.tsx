// OnLoadWrapper.tsx
import { useOnLoad } from "@/hooks/useOnLoad";
import React from "react";

interface OnLoadWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const OnLoad: React.FC<OnLoadWrapperProps> = ({
  children,
  fallback = null,
}) => {
  const onLoad = useOnLoad();

  return <>{onLoad ? children : fallback}</>;
};
