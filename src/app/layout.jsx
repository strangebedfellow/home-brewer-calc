import { Bricolage_Grotesque, Space_Grotesk } from "next/font/google";
import "./globals.css";

const themeInitScript = `(function(){
  var STORAGE_KEY = "hbc-theme-mode";
  var COOKIE_KEY = "hbc-theme-mode";
  var MODE_SYSTEM = "system";
  var MODE_DARK = "dark";
  var MODE_LIGHT = "light";

  function readCookie(name) {
    var match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function isMode(value) {
    return value === MODE_SYSTEM || value === MODE_DARK || value === MODE_LIGHT;
  }

  var storedMode = null;

  try {
    storedMode = localStorage.getItem(STORAGE_KEY);
  } catch (error) {}

  if (!isMode(storedMode)) {
    storedMode = readCookie(COOKIE_KEY);
  }

  if (!isMode(storedMode)) {
    storedMode = MODE_SYSTEM;
  }

  var systemTheme = MODE_DARK;
  try {
    systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? MODE_DARK : MODE_LIGHT;
  } catch (error) {}

  var resolvedTheme = storedMode === MODE_SYSTEM ? systemTheme : storedMode;
  if (!isMode(resolvedTheme) || resolvedTheme === MODE_SYSTEM) {
    resolvedTheme = MODE_DARK;
  }

  var root = document.documentElement;
  root.dataset.theme = resolvedTheme;
  root.style.colorScheme = resolvedTheme;

  try {
    localStorage.setItem(STORAGE_KEY, storedMode);
  } catch (error) {}

  document.cookie = COOKIE_KEY + "=" + encodeURIComponent(storedMode) + "; path=/; max-age=31536000; samesite=lax";

  window.__HBC_THEME__ = {
    mode: storedMode,
    resolved: resolvedTheme,
  };
})();`;

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Home Brewer Calculator",
  description: "Nowoczesny zestaw kalkulatorow dla piwowarow domowych.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${bricolage.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
