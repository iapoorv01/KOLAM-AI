import fs from 'fs'
import path from 'path'
import { computePHashFromBuffer } from './image-hash'

export type DatasetEntry = {
  file: string
  label: string // coarse class inferred
  hash: Buffer
}

let datasetCache: DatasetEntry[] | null = null

const LABEL_HINTS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /pulli/i, label: 'Pulli' },
  { pattern: /sikku|kambi|line/i, label: 'Sikku' },
  { pattern: /free|hand/i, label: 'Freehand' },
]

function inferLabelFromPath(p: string): string {
  const base = path.basename(p)
  for (const h of LABEL_HINTS) {
    if (h.pattern.test(base)) return h.label
  }
  const dir = path.basename(path.dirname(p))
  for (const h of LABEL_HINTS) {
    if (h.pattern.test(dir)) return h.label
  }
  // Fallback: based on set size number (Kolam19, 29, 109) we can't know; default Unknown
  return 'Unknown'
}

function* walkImages(root: string): Generator<string> {
  const exts = new Set(['.jpg', '.jpeg', '.png', '.webp'])
  const stack = [root]
  while (stack.length) {
    const dir = stack.pop()!
    let entries: fs.Dirent[]
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true })
    } catch {
      continue
    }
    for (const e of entries) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) stack.push(p)
      else if (e.isFile() && exts.has(path.extname(e.name).toLowerCase())) yield p
    }
  }
}

export async function loadKolamDataset(root: string): Promise<DatasetEntry[]> {
  if (datasetCache) return datasetCache
  const results: DatasetEntry[] = []
  for (const imgPath of walkImages(root)) {
    try {
      const buf = fs.readFileSync(imgPath)
  const hash = await computePHashFromBuffer(buf, 32, 8)
      const label = inferLabelFromPath(imgPath)
      results.push({ file: imgPath, label, hash })
    } catch {
      // ignore errors on individual files
    }
    // Limit to a reasonable number to keep memory small for serverless. Adjust as needed.
    if (results.length >= 500) break
  }
  datasetCache = results
  return results
}

export function nearestByHash(query: Buffer, dataset: DatasetEntry[]) {
  // Inline simple Hamming since we want to avoid extra imports here
  function bitcount(x: number) {
    let c = 0
    while (x) { x &= x - 1; c++ }
    return c
  }
  let best: { entry: DatasetEntry | null; dist: number } = { entry: null, dist: Number.POSITIVE_INFINITY }
  for (const e of dataset) {
    const len = Math.min(e.hash.length, query.length)
    let d = 0
    for (let i = 0; i < len; i++) {
      d += bitcount(e.hash[i] ^ query[i])
    }
    if (e.hash.length !== query.length) {
      const rest = e.hash.length > query.length ? e.hash.subarray(len) : query.subarray(len)
      for (const b of rest) d += bitcount(b)
    }
    if (d < best.dist) best = { entry: e, dist: d }
  }
  return best
}
