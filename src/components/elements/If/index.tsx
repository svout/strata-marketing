import { ReactNode } from "react";

interface IfProps {
  condition: boolean;
  children: ReactNode;
  fallback?: ReactNode;
}

export const If = ({ condition, children, fallback = null }: IfProps) => {
  return <>{condition ? children : fallback}</>;
};
