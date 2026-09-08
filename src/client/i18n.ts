/**
 * UI string table for the dsh-workspace client.
 *
 * `en` is the reference dictionary and the fallback default. To add a
 * language, copy `en`, translate every entry, and register the result in
 * `DICTIONARIES` — TypeScript enforces completeness via `Strings`.
 */

const en = {
  justNow: 'just now',
  minutesAgo: (minutes: number) => `${minutes}m ago`,
  hoursAgo: (hours: number) => `${hours}h ago`,
  daysAgo: (days: number) => `${days}d ago`,
  noTerminalSessionId: 'No terminal session id returned',
  terminalOpenFailed: (reason: string) => `Failed to open terminal: ${reason}`,
  terminal: 'Terminal',
  clearOutput: 'Clear output',
  loading: 'Loading…',
  previewTruncated: '\n\n…preview truncated',
  noTextualDiffForChange: 'No textual diff to display for this change',
  noTextualDiffForCommit: 'No textual diff to display for this commit',
  readFailed: (reason: string) => `Failed to read: ${reason}`,
  projectPreview: 'Project preview',
  loadingCurrentProject: 'Loading current project…',
  dismiss: 'Dismiss',
  projectViews: 'Project views',
  explorer: 'Explorer',
  sourceControl: 'Source Control',
  refresh: 'Refresh',
  referenceThisFile: 'Reference this file in the input',
  referenceFile: (name: string) => `Reference ${name} in the input`,
  listTruncated: 'Too many files — the list is truncated',
  collapseChanges: 'Collapse changes',
  expandChanges: 'Expand changes',
  notGitRepository: 'The current directory is not a Git repository',
  noPendingChanges: 'No pending changes',
  collapseHistory: 'Collapse history',
  expandHistory: 'Expand history',
  loadingHistory: 'Loading history…',
  noCommits: 'No commits yet',
  historyGraph: 'Commit graph',
  refBranch: (name: string) => `Branch ${name}`,
  refRemote: (name: string) => `Remote branch ${name}`,
  refTag: (name: string) => `Tag ${name}`,
  refHead: 'HEAD — currently checked out',
  closeFile: 'Close file',
  closeFileName: (name: string) => `Close ${name}`,
  imagePreview: 'Image preview',
  binaryNoPreview: 'This binary file cannot be previewed',
  editorEdit: 'Edit',
  editorSave: 'Save',
  editorCancel: 'Cancel',
  editorSaving: 'Saving…',
  editorDiscardChanges: 'Discard unsaved changes?',
  editorDisabledTruncated: 'File is too large to edit (preview truncated)',
  editorDisabledBinary: 'Binary files cannot be edited',
  editorSaveFailed: (reason: string) => `Failed to save: ${reason}`,
  editorSaved: 'Saved',
  upload: 'Upload file to project root',
  uploadOverwriteConfirm: (name: string) => `${name} already exists. Overwrite it?`,
  uploadFailed: (reason: string) => `Upload failed: ${reason}`,
  uploadDone: (name: string) => `Uploaded ${name}`,
  changesCount: (count: number) => `${count} changes`,
  notGitProject: 'Not a Git project',
  project: 'Project',
  balanceStatus: 'Balance status',
  notAvailable: 'N/A',
  balance: 'Balance',
  offPeak: 'Off-peak',
  peak: 'Peak',
  offPeakBillingPeriod: 'Off-peak billing period',
  peakBillingPeriod: 'Peak billing period',
  collapseDrawer: 'Collapse project panel',
  expandDrawer: 'Expand project panel',
}

/** Shape of a complete translation. */
export type Strings = typeof en

const de: Strings = {
  justNow: 'gerade eben',
  minutesAgo: (minutes: number) => `vor ${minutes} Min.`,
  hoursAgo: (hours: number) => `vor ${hours} Std.`,
  daysAgo: (days: number) => `vor ${days} Tagen`,
  noTerminalSessionId: 'Keine Terminal-Sitzungskennung erhalten',
  terminalOpenFailed: (reason: string) => `Terminal konnte nicht geöffnet werden: ${reason}`,
  terminal: 'Terminal',
  clearOutput: 'Ausgabe löschen',
  loading: 'Wird geladen…',
  previewTruncated: '\n\n…Vorschau gekürzt',
  noTextualDiffForChange: 'Kein textueller Diff für diese Änderung verfügbar',
  noTextualDiffForCommit: 'Kein textueller Diff für diesen Commit verfügbar',
  readFailed: (reason: string) => `Lesen fehlgeschlagen: ${reason}`,
  projectPreview: 'Projektvorschau',
  loadingCurrentProject: 'Aktuelles Projekt wird geladen…',
  dismiss: 'Schließen',
  projectViews: 'Projektansichten',
  explorer: 'Explorer',
  sourceControl: 'Quellcodeverwaltung',
  refresh: 'Aktualisieren',
  referenceThisFile: 'Diese Datei im Eingabefeld referenzieren',
  referenceFile: (name: string) => `${name} im Eingabefeld referenzieren`,
  listTruncated: 'Zu viele Dateien — die Liste wurde gekürzt',
  collapseChanges: 'Änderungen einklappen',
  expandChanges: 'Änderungen ausklappen',
  notGitRepository: 'Das aktuelle Verzeichnis ist kein Git-Repository',
  noPendingChanges: 'Keine ausstehenden Änderungen',
  collapseHistory: 'Verlauf einklappen',
  expandHistory: 'Verlauf ausklappen',
  loadingHistory: 'Verlauf wird geladen…',
  noCommits: 'Noch keine Commits',
  historyGraph: 'Commit-Graph',
  refBranch: (name: string) => `Branch ${name}`,
  refRemote: (name: string) => `Remote-Branch ${name}`,
  refTag: (name: string) => `Tag ${name}`,
  refHead: 'HEAD — aktuell ausgecheckt',
  closeFile: 'Datei schließen',
  closeFileName: (name: string) => `${name} schließen`,
  imagePreview: 'Bildvorschau',
  binaryNoPreview: 'Diese Binärdatei kann nicht angezeigt werden',
  editorEdit: 'Bearbeiten',
  editorSave: 'Speichern',
  editorCancel: 'Abbrechen',
  editorSaving: 'Speichern…',
  editorDiscardChanges: 'Ungespeicherte Änderungen verwerfen?',
  editorDisabledTruncated: 'Datei ist zu groß zum Bearbeiten (Vorschau gekürzt)',
  editorDisabledBinary: 'Binärdateien können nicht bearbeitet werden',
  editorSaveFailed: (reason: string) => `Speichern fehlgeschlagen: ${reason}`,
  editorSaved: 'Gespeichert',
  upload: 'Datei in das Projektverzeichnis hochladen',
  uploadOverwriteConfirm: (name: string) => `${name} existiert bereits. Überschreiben?`,
  uploadFailed: (reason: string) => `Hochladen fehlgeschlagen: ${reason}`,
  uploadDone: (name: string) => `${name} hochgeladen`,
  changesCount: (count: number) => `${count} Änderungen`,
  notGitProject: 'Kein Git-Projekt',
  project: 'Projekt',
  balanceStatus: 'Kontostand',
  notAvailable: 'k. A.',
  balance: 'Guthaben',
  offPeak: 'Nebenzeit',
  peak: 'Hauptzeit',
  offPeakBillingPeriod: 'Abrechnungszeitraum Nebenzeit',
  peakBillingPeriod: 'Abrechnungszeitraum Hauptzeit',
  collapseDrawer: 'Projektbereich einklappen',
  expandDrawer: 'Projektbereich ausklappen',
}

const DICTIONARIES: Readonly<Record<string, Strings>> = { en, de }

/** @returns the browser primary language subtag, 'en' outside a browser. */
function primaryLanguage(): string {
  return typeof navigator === 'undefined' ? 'en' : navigator.language.toLowerCase().split('-')[0] ?? 'en'
}

/** @returns the dictionary matching the browser locale, English as default. */
function detect(): Strings {
  return DICTIONARIES[primaryLanguage()] ?? en
}

/** Active UI strings. */
export const t: Strings = detect()

/** Switches the active strings in place; call before the UI first renders. */
export function setLanguage(option: 'auto' | 'de' | 'en'): void {
  Object.assign(t, DICTIONARIES[option === 'auto' ? primaryLanguage() : option] ?? en)
}
