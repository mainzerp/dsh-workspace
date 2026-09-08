/** Outer width of the collapsed drawer rail; must match .hui-rail geometry in BASE_STYLES. */
export const DRAWER_COLLAPSED_WIDTH = 44;
/** Expanded width when nothing is selected and no width was dragged. */
export const DRAWER_DEFAULT_WIDTH = 400;
/** Lower drag bound; replaces the hardcoded 320 in startResize. */
export const DRAWER_MIN_WIDTH = 320;
/** Right-edge gutter kept free while dragging; replaces the hardcoded 32 in startResize. */
export const DRAWER_WIDTH_GUTTER = 32;
/** localStorage keys; the prefix avoids collisions with host keys. */
export const DRAWER_COLLAPSED_KEY = 'dsh-workspace:drawer-collapsed';
export const DRAWER_WIDTH_KEY = 'dsh-workspace:drawer-width';
/** Clamps a dragged width exactly as the previous inline expression did. */
export function clampDrawerWidth(value, viewportWidth) {
    if (!Number.isFinite(value))
        return DRAWER_DEFAULT_WIDTH;
    return Math.min(Math.max(value, DRAWER_MIN_WIDTH), viewportWidth - DRAWER_WIDTH_GUTTER);
}
/** Single source of truth for the drawer width; null means "let CSS clamp(600px,46vw,780px) apply". */
export function resolveDrawerWidth(collapsed, drawerWidth, selected) {
    if (collapsed)
        return DRAWER_COLLAPSED_WIDTH;
    return drawerWidth ?? (selected === null ? DRAWER_DEFAULT_WIDTH : null);
}
/** Parses a stored width; null for missing, non-numeric, or non-positive values. */
export function parseDrawerWidth(raw) {
    if (raw === null)
        return null;
    const value = Number(raw);
    return Number.isFinite(value) && value > 0 ? value : null;
}
/** Parses a stored collapse flag; anything other than '1' means expanded. */
export function parseDrawerCollapsed(raw) {
    return raw === '1';
}
/** Reads and clamps the stored width; returns null when storage is unavailable or empty. */
export function readDrawerWidth(viewportWidth) {
    try {
        if (typeof window === 'undefined')
            return null;
        const stored = parseDrawerWidth(window.localStorage.getItem(DRAWER_WIDTH_KEY));
        return stored === null ? null : clampDrawerWidth(stored, viewportWidth);
    }
    catch {
        return null;
    }
}
/** Reads the stored collapse flag; false when storage is unavailable or empty. */
export function readDrawerCollapsed() {
    try {
        if (typeof window === 'undefined')
            return false;
        return parseDrawerCollapsed(window.localStorage.getItem(DRAWER_COLLAPSED_KEY));
    }
    catch {
        return false;
    }
}
/** Persists the width; silently no-ops when storage is unavailable. */
export function writeDrawerWidth(width) {
    try {
        if (typeof window === 'undefined')
            return;
        window.localStorage.setItem(DRAWER_WIDTH_KEY, String(width));
    }
    catch { /* storage unavailable */ }
}
/** Persists the collapse flag; silently no-ops when storage is unavailable. */
export function writeDrawerCollapsed(collapsed) {
    try {
        if (typeof window === 'undefined')
            return;
        window.localStorage.setItem(DRAWER_COLLAPSED_KEY, collapsed ? '1' : '0');
    }
    catch { /* storage unavailable */ }
}
//# sourceMappingURL=drawer.js.map