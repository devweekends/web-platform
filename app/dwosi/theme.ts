/**
 * DWOSI keeps its own theme, separate from the rest of the site: dark unless
 * the visitor picks light with the toggle. The choice is stored per browser.
 */
export const DWOSI_THEME_KEY = "dwosi-theme"
export const DWOSI_THEME_ATTR = "data-dwosi-theme"

/** Inlined in the root <head> so a saved light choice applies before first paint */
export const dwosiThemeScript = `try{if(localStorage.getItem("${DWOSI_THEME_KEY}")==="light")document.documentElement.setAttribute("${DWOSI_THEME_ATTR}","light")}catch(e){}`
