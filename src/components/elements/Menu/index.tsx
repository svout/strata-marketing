import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { config } from "./_menu.config";
import { clsx } from "clsx";
import { MenuLinkInterface } from "@/types/MenuLink.interface";
import { useRouter } from "next/router";
import { Icons } from "@/components/icons";
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";
import { Elements } from "@/components";

const themeIcons = {
  light: <Icons.Sun />,
  dark: <Icons.Moon />,
};

const MenuLink = ({
  href,
  label,
  active,
  onClick,
}: MenuLinkInterface & { active: boolean }) => {
  return (
    <Link
      href={href}
      className={clsx(styles.link, active && styles.active)}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

const Menu = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const isActive = (href: string) => router.pathname === href;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
      return;
    }
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = prefersDark ? "dark" : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const handleToggleTheme = (option: string) => {
    const options = ["Lightmode", "Darkmode"];
    const index = options.indexOf(option);
    setTheme(index === 0 ? "light" : "dark");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    closeMenu();
  }, [router.pathname]);

  return (
    <section className={styles.section}>
      <div className={styles.content} ref={menuRef}>
        <div className={styles.contentWrapper}>
          <Link href="/" className={styles.logo}>
            {isMobile ? (
              isMenuOpen ? (
                <Elements.ToggleButton
                  options={["Lightmode", "Darkmode"]}
                  selectedOption={theme === "light" ? "Lightmode" : "Darkmode"}
                  onToggle={handleToggleTheme}
                  icons={[themeIcons.light, themeIcons.dark]}
                />
              ) : (
                <Image
                  src={theme === "dark" ? "/logoWhite.webp" : "/logo.webp"}
                  alt=""
                  width={90}
                  height={30}
                />
              )
            ) : (
              <Image
                src={theme === "dark" ? "/logoWhite.webp" : "/logo.webp"}
                alt=""
                width={110}
                height={40}
              />
            )}
          </Link>

          {isMobile ? (
            <div className={styles.mobMenuWrapper}>
              <div className={styles.mobileButtons}>
                <button
                  className={styles.burgerButton}
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <Icons.Close
                      style={{ transform: "rotate(90deg)" }}
                      width={30}
                      height={30}
                    />
                  ) : (
                    <Icons.BurgerTwo />
                  )}
                </button>
              </div>

              <div
                className={clsx(
                  styles.mobileMenu,
                  isMenuOpen && styles.mobileMenuOpen
                )}
              >
                <div className={styles.mobileMenuContent}>
                  <div className={styles.mobileMenuLinks}>
                    {config.links.map((link) => (
                      <MenuLink
                        {...link}
                        active={isActive(link.href)}
                        key={link.href}
                        onClick={closeMenu}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.menu}>
                {config.links.map((link) => (
                  <MenuLink
                    {...link}
                    active={isActive(link.href)}
                    key={link.href}
                  />
                ))}
              </div>

              <div className={styles.buttons}>
                <Elements.ToggleButton
                  options={["Lightmode", "Darkmode"]}
                  selectedOption={theme === "light" ? "Lightmode" : "Darkmode"}
                  onToggle={handleToggleTheme}
                  icons={[themeIcons.light, themeIcons.dark]}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {isMobile && isMenuOpen && theme === "light" && (
        <div className={styles.backdrop} onClick={closeMenu} />
      )}
    </section>
  );
};

export default Menu;
