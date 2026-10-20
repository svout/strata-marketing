import { ReactElement } from "react";

export interface SectionInterface {
  el: ReactElement;
  bg?: string;
  s?: boolean;
  bt?: string;
  ah?: boolean;
  usePaddings?: boolean;
}
