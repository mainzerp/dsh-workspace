/** Minimal commit reference needed for graph layout: hash plus parent hashes. */
export interface GraphCommitRef { hash: string; parents: string[] }

/** One placed commit node; row equals the input index, lane is the assigned column. */
export interface GraphNode { hash: string; row: number; lane: number }

/** One parent edge. `to.row === commits.length` means the parent is outside the window and the edge exits at the bottom. */
export interface GraphEdge {
  from: { row: number; lane: number }
  to: { row: number; lane: number }
  merge: boolean
}

export interface GraphLayout { nodes: GraphNode[]; edges: GraphEdge[]; laneCount: number }

/** Must match the .hui-tree-row height (26px) in FLAT_STYLES. */
export const GRAPH_ROW_HEIGHT = 26
export const GRAPH_LANE_WIDTH = 14

/** Mid-saturation lane colors, usable in light and dark host themes. */
export const LANE_PALETTE: readonly string[] = ['#4d6bfe', '#16895a', '#b7791f', '#d94a4a', '#8b5cf6', '#0e9aa7', '#e36209', '#d63384']

/** Single-pass lane assignment over commits in `git log --all --topo-order` order (children before parents). */
export function computeGraphLayout(commits: readonly GraphCommitRef[]): GraphLayout {
  const rowByHash = new Map(commits.map((commit, index) => [commit.hash, index]))
  const lanes: (string | null)[] = []
  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []
  let laneCount = 0
  const allocateLane = (): number => {
    const free = lanes.indexOf(null)
    if (free !== -1) return free
    lanes.push(null)
    return lanes.length - 1
  }
  for (let row = 0; row < commits.length; row += 1) {
    const commit = commits[row]
    if (commit === undefined) continue
    let lane = lanes.indexOf(commit.hash)
    if (lane === -1) lane = allocateLane()
    nodes.push({ hash: commit.hash, row, lane })
    if (commit.parents.length === 0) {
      lanes[lane] = null
      laneCount = Math.max(laneCount, lanes.length)
      continue
    }
    for (let parentIndex = 0; parentIndex < commit.parents.length; parentIndex += 1) {
      const parent = commit.parents[parentIndex]
      if (parent === undefined) continue
      const toRow = rowByHash.get(parent) ?? commits.length
      if (parentIndex === 0) {
        edges.push({ from: { row, lane }, to: { row: toRow, lane }, merge: false })
        lanes[lane] = parent
        continue
      }
      let targetLane = lanes.indexOf(parent)
      if (targetLane === -1 || targetLane === lane) {
        targetLane = allocateLane()
        lanes[targetLane] = parent
      }
      edges.push({ from: { row, lane }, to: { row: toRow, lane: targetLane }, merge: true })
    }
    laneCount = Math.max(laneCount, lanes.length)
  }
  return { nodes, edges, laneCount }
}
