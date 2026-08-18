import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, symlink, unlink, writeFile } from 'node:fs/promises'
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
  await assert.rejects(browser.read('../secret'), /超出项目目录/)
  await assert.rejects(browser.read('escape'), /符号链接目标超出项目目录/)
})
