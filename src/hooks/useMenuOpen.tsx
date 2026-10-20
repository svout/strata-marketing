import React, { createContext, useContext } from "react";

type MenuOpenContextValue = {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuOpenContext = createContext<MenuOpenContextValue | undefined>(
  undefined
);

export const useMenuOpen = (): MenuOpenContextValue => {
  const context = useContext(MenuOpenContext);
  if (!context) {
    throw new Error("useMenuOpen must be used within a MenuOpenProvider");
  }
  return context;
};

export const MenuOpenProvider = ({
  value,
  children,
}: {
  value: MenuOpenContextValue;
  children: React.ReactNode;
}) => {
  return (
    <MenuOpenContext.Provider value={value}>
      {children}
    </MenuOpenContext.Provider>
  );
};

