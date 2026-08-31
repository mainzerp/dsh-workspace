import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdir, mkdtemp, readFile, symlink, unlink, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { promisify } from 'node:util'
import { ProjectBrowser } from '../lib/project-browser.js'

const exec = promisify(execFile)
test('previews files and Git changes without escaping the root', async () => {
  const root = await mkdtemp(join(tmpdir(), 'dsh-workspace-'))
  await writeFile(join(root, 'tracked.txt'), 'before\n')
  await exec('git', ['init', '-q'], { cwd: root })
  await exec('git', ['add', 'tracked.txt'], { cwd: root })
  await exec('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'initial'], { cwd: root })
  await writeFile(join(root, 'tracked.txt'), 'after\n')
  await writeFile(join(root, 'new.txt'), 'new\n')
  await writeFile(join(root, 'pixel.png'), Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00]))
  const browser = await ProjectBrowser.create(root, 100, 10_000)
  const snapshot = await browser.snapshot()
  assert.equal(snapshot.rootPath, root)
  assert.deepEqual(snapshot.changes.map(change => change.path).sort(), ['new.txt', 'pixel.png', 'tracked.txt'])
  assert.equal((await browser.read('new.txt')).content, 'new\n')
  assert.match((await browser.read('pixel.png')).dataUrl, /^data:image\/png;base64,/)
  assert.match((await browser.diff('tracked.txt')).diff, /-before\n\+after/)
  assert.match((await browser.diff('new.txt')).diff, /\+new/)
  await unlink(join(root, 'tracked.txt'))
  assert.match((await browser.diff('tracked.txt')).diff, /-before/)
  const outside = await mkdtemp(join(tmpdir(), 'dsh-workspace-outside-'))
  await writeFile(join(outside, 'secret'), 'secret')
  await symlink(join(outside, 'secret'), join(root, 'escape'))
  await assert.rejects(browser.read('../secret'), /escapes the project root/)
  await assert.rejects(browser.read('escape'), /Symlink target escapes the project root/)
})

test('writes text files, rejects escapes, binary content, oversized and directory targets', async () => {
  const root = await mkdtemp(join(tmpdir(), 'dsh-workspace-write-'))
  await writeFile(join(root, 'a.txt'), 'before\n')
  await mkdir(join(root, 'subdir'))
  const browser = await ProjectBrowser.create(root, 100, 10_000)
  const saved = await browser.write('a.txt', 'after\n')
  assert.equal(saved.path, 'a.txt')
  assert.equal(saved.bytes, Buffer.byteLength('after\n', 'utf8'))
  assert.equal((await browser.read('a.txt')).content, 'after\n')
  await assert.rejects(browser.write('../secret', 'x'), /escapes the project root/)
  const outside = await mkdtemp(join(tmpdir(), 'dsh-workspace-write-outside-'))
  await writeFile(join(outside, 'secret'), 'secret')
  await symlink(join(outside, 'secret'), join(root, 'link'))
  await assert.rejects(browser.write('link', 'x'), /Symlink target escapes the project root/)
  await assert.rejects(browser.write('a.txt', 'a\0b'), error => error.code === 'BINARY_CONTENT')
  await assert.rejects(browser.write('subdir', 'x'), error => error.code === 'IS_DIRECTORY')
  const small = await ProjectBrowser.create(root, 100, 1_024)
  await assert.rejects(small.write('a.txt', 'x'.repeat(2_000)), error => error.code === 'FILE_TOO_LARGE')
})

test('uploads files with exclusive create, opt-in overwrite and binary round-trip', async () => {
  const root = await mkdtemp(join(tmpdir(), 'dsh-workspace-upload-'))
  const browser = await ProjectBrowser.create(root, 100, 10_000)
  const created = await browser.upload('a.txt', Buffer.from('one\n'), false)
  assert.equal(created.path, 'a.txt')
  assert.equal(created.bytes, 4)
  await assert.rejects(browser.upload('a.txt', Buffer.from('two\n'), false), error => error.code === 'FILE_EXISTS')
  const replaced = await browser.upload('a.txt', Buffer.from('two\n'), true)
  assert.equal(replaced.bytes, 4)
  assert.equal(await readFile(join(root, 'a.txt'), 'utf8'), 'two\n')
  const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x00, 0xff, 0x00, 0xfe])
  await browser.upload('blob.bin', png, false)
  assert.deepEqual(await readFile(join(root, 'blob.bin')), png)
  await assert.rejects(browser.upload('../evil.txt', Buffer.from('x'), false), /Invalid upload file name|escapes the project root|Invalid file path/)
  await assert.rejects(browser.upload('a/b.txt', Buffer.from('x'), false))
  const small = await ProjectBrowser.create(root, 100, 1_024)
  await assert.rejects(small.upload('big.bin', Buffer.alloc(2_000), false), error => error.code === 'FILE_TOO_LARGE')
})

test('logs returns parents and typed refs across all branches', async () => {
  const root = await mkdtemp(join(tmpdir(), 'dsh-workspace-log-'))
  const env = { ...process.env, GIT_AUTHOR_DATE: '2024-01-01T00:00:00Z', GIT_COMMITTER_DATE: '2024-01-01T00:00:00Z' }
  const git = async args => (await exec('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', ...args], { cwd: root, env })).stdout.trim()
  const commit = async (file, message) => {
    await writeFile(join(root, file), `${message}\n`)
    await git(['add', file])
    await git(['commit', '-qm', message])
    return await git(['rev-parse', 'HEAD'])
  }
  await git(['init', '-q'])
  await git(['checkout', '-qb', 'main'])
  const mainRoot = await commit('a.txt', 'main root')
  await git(['checkout', '-qb', 'feature'])
  const featureTip = await commit('b.txt', 'feature work')
  await git(['checkout', '-q', 'main'])
  const mainSecond = await commit('c.txt', 'main second')
  await git(['merge', '-q', '--no-ff', 'feature', '-m', 'merge feature'])
  const mergeTip = await git(['rev-parse', 'HEAD'])
  await git(['tag', 'v1.0.0'])
  await git(['checkout', '-qb', 'other', mainRoot])
  const otherTip = await commit('d.txt', 'other work')
  await git(['checkout', '-q', 'main'])
  const browser = await ProjectBrowser.create(root, 100, 10_000)
  const { entries } = await browser.logs(undefined, 50)
  assert.equal(entries.length, 5)
  for (const entry of entries) {
    assert.ok(Array.isArray(entry.parents))
    assert.ok(Array.isArray(entry.refs))
  }
  const byHash = new Map(entries.map((entry, index) => [entry.hash, { entry, index }]))
  const rootRecord = byHash.get(mainRoot)
  const mergeRecord = byHash.get(mergeTip)
  const featureRecord = byHash.get(featureTip)
  const otherRecord = byHash.get(otherTip)
  assert.ok(rootRecord && mergeRecord && featureRecord)
  assert.ok(otherRecord, 'commit unique to the unmerged branch must be present (--all)')
  assert.equal(rootRecord.entry.parents.length, 0)
  assert.equal(mergeRecord.entry.parents.length, 2)
  assert.deepEqual(new Set(mergeRecord.entry.parents), new Set([mainSecond, featureTip]))
  assert.ok(mergeRecord.entry.refs.some(ref => ref.kind === 'branch' && ref.name === 'main'))
  assert.ok(mergeRecord.entry.refs.some(ref => ref.kind === 'head'))
  assert.ok(mergeRecord.entry.refs.some(ref => ref.kind === 'tag' && ref.name === 'v1.0.0'))
  assert.ok(featureRecord.entry.refs.some(ref => ref.kind === 'branch' && ref.name === 'feature'))
  assert.ok(otherRecord.entry.refs.some(ref => ref.kind === 'branch' && ref.name === 'other'))
  for (const { entry, index } of byHash.values()) {
    for (const parent of entry.parents) {
      const parentRecord = byHash.get(parent)
      assert.ok(parentRecord === undefined || parentRecord.index > index, 'topo order: children before parents')
    }
  }
})
