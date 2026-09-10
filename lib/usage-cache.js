/**
 * Split the durable snapshots into cache hits and the ones needing a fresh
 * inspection.
 *
 * A hit requires the same log revision *and* the same day window: the stored
 * fold only covers `[startTime, now]`, so a new day (or a rewritten log)
 * invalidates it. Every session without a hit is inspected once and folded
 * immediately, which keeps a poll proportional to what actually changed
 * instead of to the whole corpus.
 * @param snapshots current durable session snapshots.
 * @param cache folds retained from earlier polls, keyed by session id.
 * @param startTime current day-window start.
 * @returns the retained hits plus the snapshots to inspect.
 */
export function selectStaleSnapshots(snapshots, cache, startTime) {
    const hits = new Map();
    const stale = [];
    for (const snapshot of snapshots) {
        const cached = cache.get(snapshot.header.id);
        if (cached !== undefined && cached.revision === snapshot.revision && cached.startTime === startTime)
            hits.set(snapshot.header.id, cached);
        else
            stale.push(snapshot);
    }
    return { hits, stale };
}
//# sourceMappingURL=usage-cache.js.map