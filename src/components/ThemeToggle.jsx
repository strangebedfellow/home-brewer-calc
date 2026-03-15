"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "hbc-theme-mode";
const COOKIE_KEY = "hbc-theme-mode";

const MODE_SYSTEM = "system";
const MODE_DARK = "dark";
const MODE_LIGHT = "light";

const RESOLVED_DARK = "dark";
const RESOLVED_LIGHT = "light";

const isMode = (value) => value === MODE_SYSTEM || value === MODE_DARK || value === MODE_LIGHT;
const isResolvedTheme = (value) => value === RESOLVED_DARK || value === RESOLVED_LIGHT;

const getSystemTheme = () => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return MODE_DARK;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? MODE_DARK : MODE_LIGHT;
};

const resolveTheme = (mode) => {
  if (mode === MODE_SYSTEM) {
    return getSystemTheme();
  }

  return mode;
};

const persistMode = (mode) => {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (error) {}

  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(mode)}; path=/; max-age=31536000; samesite=lax`;
};

const applyMode = (mode) => {
  const resolved = resolveTheme(mode);
  const root = document.documentElement;
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;

  window.__HBC_THEME__ = {
    mode,
    resolved,
  };

  return resolved;
};

export default function ThemeToggle({ initialMode = MODE_SYSTEM }) {
  const safeInitialMode = isMode(initialMode) ? initialMode : MODE_SYSTEM;
  const [mode, setMode] = useState(safeInitialMode);
  const [resolvedTheme, setResolvedTheme] = useState(resolveTheme(safeInitialMode));

  useEffect(() => {
    const fromBootstrap = window.__HBC_THEME__;

    if (isMode(fromBootstrap?.mode) && fromBootstrap.mode !== mode) {
      setMode(fromBootstrap.mode);
      setResolvedTheme(resolveTheme(fromBootstrap.mode));
      return;
    }

    if (isResolvedTheme(fromBootstrap?.resolved)) {
      setResolvedTheme(fromBootstrap.resolved);
    }
  }, [mode]);

  useEffect(() => {
    if (mode !== MODE_SYSTEM) {
      setResolvedTheme(mode);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = () => {
      setResolvedTheme(applyMode(MODE_SYSTEM));
    };

    setResolvedTheme(applyMode(MODE_SYSTEM));
    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [mode]);

  const onModeChange = (nextMode) => {
    setMode(nextMode);
    const nextResolved = applyMode(nextMode);
    setResolvedTheme(nextResolved);
    persistMode(nextMode);
  };

  const subtitle = useMemo(() => {
    if (mode === MODE_SYSTEM) {
      return `Auto (system): ${resolvedTheme}`;
    }

    return `Manual: ${resolvedTheme}`;
  }, [mode, resolvedTheme]);

  return (
    <div className="theme-toggle rounded-2xl border border-(--border) bg-(--surface-2) p-2 shadow-sm">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onModeChange(MODE_DARK)}
          className={mode === MODE_DARK ? "theme-chip theme-chip-active" : "theme-chip"}
        >
          Dark
        </button>
        <button
          type="button"
          onClick={() => onModeChange(MODE_LIGHT)}
          className={mode === MODE_LIGHT ? "theme-chip theme-chip-active" : "theme-chip"}
        >
          Light
        </button>
        <button
          type="button"
          onClick={() => onModeChange(MODE_SYSTEM)}
          className={mode === MODE_SYSTEM ? "theme-chip theme-chip-active" : "theme-chip"}
        >
          Auto
        </button>
      </div>
      <p className="mt-1 text-xs text-(--text-muted)">{subtitle}</p>
    </div>
  );
}
