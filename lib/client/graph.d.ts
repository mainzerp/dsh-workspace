/** Minimal commit reference needed for graph layout: hash plus parent hashes. */
export interface GraphCommitRef {
    hash: string;
    parents: string[];
}
/** One placed commit node; row equals the input index, lane is the assigned column. */
export interface GraphNode {
    hash: string;
    row: number;
    lane: number;
}
/** One parent edge. `to.row === commits.length` means the parent is outside the window and the edge exits at the bottom. */
export interface GraphEdge {
    from: {
        row: number;
        lane: number;
    };
    to: {
        row: number;
        lane: number;
    };
    merge: boolean;
}
export interface GraphLayout {
    nodes: GraphNode[];
    edges: GraphEdge[];
    laneCount: number;
}
/** Must match the .hui-tree-row height (26px) in FLAT_STYLES. */
export declare const GRAPH_ROW_HEIGHT = 26;
export declare const GRAPH_LANE_WIDTH = 14;
/** Mid-saturation lane colors, usable in light and dark host themes. */
export declare const LANE_PALETTE: readonly string[];
/** Single-pass lane assignment over commits in `git log --all --topo-order` order (children before parents). */
export declare function computeGraphLayout(commits: readonly GraphCommitRef[]): GraphLayout;
//# sourceMappingURL=graph.d.ts.map