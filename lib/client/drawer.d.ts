/**
 * Width the collapsed panel would occupy if it were rendered; the collapsed panel is
 * `display:none` and the shell reserves nothing, so this value only feeds the (hidden)
 * inline width. Keep it in sync with the aside's box model.
 */
export declare const DRAWER_COLLAPSED_WIDTH = 44;
/** Expanded width when nothing is selected and no width was dragged. */
export declare const DRAWER_DEFAULT_WIDTH = 400;
/** Lower drag bound; replaces the hardcoded 320 in startResize. */
export declare const DRAWER_MIN_WIDTH = 320;
/** Right-edge gutter kept free while dragging; replaces the hardcoded 32 in startResize. */
export declare const DRAWER_WIDTH_GUTTER = 32;
/** localStorage keys; the prefix avoids collisions with host keys. */
export declare const DRAWER_COLLAPSED_KEY = "dsh-workspace:drawer-collapsed";
export declare const DRAWER_WIDTH_KEY = "dsh-workspace:drawer-width";
/** Clamps a dragged width exactly as the previous inline expression did. */
export declare function clampDrawerWidth(value: number, viewportWidth: number): number;
/** Single source of truth for the drawer width; null means "let CSS clamp(600px,46vw,780px) apply". */
export declare function resolveDrawerWidth(collapsed: boolean, drawerWidth: number | null, selected: string | null): number | null;
/** Parses a stored width; null for missing, non-numeric, or non-positive values. */
export declare function parseDrawerWidth(raw: string | null): number | null;
/** Parses a stored collapse flag; anything other than '1' means expanded. */
export declare function parseDrawerCollapsed(raw: string | null): boolean;
/** Current collapse flag for `useSyncExternalStore`; the returned primitive is identity-stable. */
export declare function getDrawerCollapsedSnapshot(): boolean;
/** Subscribes to collapse-flag changes; returns the unsubscribe function. */
export declare function subscribeDrawerCollapsed(subscriber: () => void): () => void;
/** Reads and clamps the stored width; returns null when storage is unavailable or empty. */
export declare function readDrawerWidth(viewportWidth: number): number | null;
/** Reads the stored collapse flag; false when storage is unavailable or empty. */
export declare function readDrawerCollapsed(): boolean;
/** Persists the width; silently no-ops when storage is unavailable. */
export declare function writeDrawerWidth(width: number): void;
/** Persists the collapse flag and notifies subscribers; no-ops without storage. */
export declare function writeDrawerCollapsed(collapsed: boolean): void;
//# sourceMappingURL=drawer.d.ts.map