import assert from 'node:assert/strict'
import test from 'node:test'
import { computeGraphLayout } from '../lib/client/graph.js'

test('empty input produces an empty layout', () => {
  assert.deepEqual(computeGraphLayout([]), { nodes: [], edges: [], laneCount: 0 })
})

test('linear history stays in one lane with vertical non-merge edges', () => {
  const layout = computeGraphLayout([
    { hash: 'c3', parents: ['c2'] },
    { hash: 'c2', parents: ['c1'] },
    { hash: 'c1', parents: [] },
  ])
  assert.equal(layout.laneCount, 1)
  assert.deepEqual(layout.nodes, [
    { hash: 'c3', row: 0, lane: 0 },
    { hash: 'c2', row: 1, lane: 0 },
    { hash: 'c1', row: 2, lane: 0 },
  ])
  assert.equal(layout.edges.length, 2)
  for (const edge of layout.edges) {
    assert.equal(edge.merge, false)
    assert.equal(edge.from.lane, 0)
    assert.equal(edge.to.lane, 0)
  }
  assert.deepEqual(layout.edges[0], { from: { row: 0, lane: 0 }, to: { row: 1, lane: 0 }, merge: false })
})

test('branch and merge allocate a second lane for the merged parent', () => {
  const layout = computeGraphLayout([
    { hash: 'M', parents: ['B', 'C'] },
    { hash: 'B', parents: ['R'] },
    { hash: 'C', parents: ['R'] },
    { hash: 'R', parents: [] },
  ])
  assert.equal(layout.laneCount, 2)
  assert.deepEqual(layout.nodes[0], { hash: 'M', row: 0, lane: 0 })
  const mergeEdge = layout.edges.find(edge => edge.merge)
  assert.ok(mergeEdge)
  assert.deepEqual(mergeEdge.from, { row: 0, lane: 0 })
  assert.deepEqual(mergeEdge.to, { row: 2, lane: 1 })
  const toRoot = layout.edges.filter(edge => !edge.merge && edge.to.row === 3)
  assert.equal(toRoot.length, 2)
  assert.deepEqual(toRoot.map(edge => edge.from.row).sort(), [1, 2])
})

test('a parent outside the window exits at the bottom row', () => {
  const layout = computeGraphLayout([{ hash: 'a', parents: ['missing'] }])
  assert.equal(layout.laneCount, 1)
  assert.deepEqual(layout.edges, [{ from: { row: 0, lane: 0 }, to: { row: 1, lane: 0 }, merge: false }])
})

test('octopus merge produces one merge edge per extra parent', () => {
  const layout = computeGraphLayout([
    { hash: 'O', parents: ['p1', 'p2', 'p3'] },
    { hash: 'p1', parents: [] },
    { hash: 'p2', parents: [] },
    { hash: 'p3', parents: [] },
  ])
  assert.equal(layout.laneCount, 3)
  assert.equal(layout.edges.length, 3)
  assert.equal(layout.edges.filter(edge => edge.merge).length, 2)
  assert.equal(layout.edges.filter(edge => !edge.merge).length, 1)
  assert.deepEqual(layout.edges.map(edge => edge.to.lane).sort(), [0, 1, 2])
})

test('a lane freed by a root commit is reused by a later first-seen tip', () => {
  const layout = computeGraphLayout([
    { hash: 'a', parents: ['r1'] },
    { hash: 'r1', parents: [] },
    { hash: 'b', parents: ['r2'] },
    { hash: 'r2', parents: [] },
  ])
  assert.equal(layout.laneCount, 1)
  assert.deepEqual(layout.nodes, [
    { hash: 'a', row: 0, lane: 0 },
    { hash: 'r1', row: 1, lane: 0 },
    { hash: 'b', row: 2, lane: 0 },
    { hash: 'r2', row: 3, lane: 0 },
  ])
})
