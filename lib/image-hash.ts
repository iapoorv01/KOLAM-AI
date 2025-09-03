import Jimp from 'jimp'

// Compute a simple average hash (aHash) for an image.
// Returns a Buffer of length size*size/8 bits (for size=16 => 256 bits => 32 bytes).
export async function computeAHashFromBuffer(buf: Buffer, size = 16): Promise<Buffer> {
  const img = await Jimp.read(buf)
  img.grayscale()
  img.resize(size, size)
  const total = size * size
  let sum = 0
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4
      sum += img.bitmap.data[idx]
    }
  }
  const avg = sum / total
  const bytes = Buffer.alloc(Math.ceil((total) / 8))
  for (let i = 0; i < total; i++) {
    const v = img.bitmap.data[i * 4]
    if (v > avg) {
      const byteIndex = Math.floor(i / 8)
      const bitIndex = i % 8
      bytes[byteIndex] |= (1 << bitIndex)
    }
  }
  return bytes
}

export function hammingDistance(a: Buffer, b: Buffer): number {
  const len = Math.min(a.length, b.length)
  let dist = 0
  for (let i = 0; i < len; i++) {
    let x = a[i] ^ b[i]
    // Count bits set in x (Brian Kernighan’s algorithm)
    while (x) {
      x &= x - 1
      dist++
    }
  }
  // If lengths differ, count the remaining bits in the longer one
  if (a.length !== b.length) {
    const rest = a.length > b.length ? a.subarray(len) : b.subarray(len)
    for (const byte of rest) {
      let x = byte
      while (x) {
        x &= x - 1
        dist++
      }
    }
  }
  return dist
}

// Compute pHash (perceptual hash) using DCT of a resized image (default 32x32 -> take top-left 8x8 excluding DC).
// Returns 64-bit hash in 8 bytes (LSB-first within each byte).
export async function computePHashFromBuffer(buf: Buffer, size = 32, lowSize = 8): Promise<Buffer> {
  const img = await Jimp.read(buf)
  img.grayscale()
  img.resize(size, size)

  // Build luminance matrix
  const pixels = new Float64Array(size * size)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4
      pixels[y * size + x] = img.bitmap.data[idx]
    }
  }

  // 2D DCT (naive, but size is small)
  const dct = new Float64Array(size * size)
  const c = (n: number) => (n === 0 ? 1 / Math.SQRT2 : 1)
  const piN = Math.PI / size
  for (let u = 0; u < size; u++) {
    for (let v = 0; v < size; v++) {
      let sum = 0
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          sum += pixels[y * size + x] *
            Math.cos((2 * x + 1) * u * piN / 2) *
            Math.cos((2 * y + 1) * v * piN / 2)
        }
      }
      dct[v * size + u] = 0.25 * c(u) * c(v) * sum
    }
  }

  // Take top-left lowSize x lowSize block, skip [0,0] (DC), compute median, set bits
  const coeffs: number[] = []
  for (let v = 0; v < lowSize; v++) {
    for (let u = 0; u < lowSize; u++) {
      if (u === 0 && v === 0) continue
      coeffs.push(dct[v * size + u])
    }
  }
  const sorted = [...coeffs].sort((a, b) => a - b)
  const median = sorted[Math.floor(sorted.length / 2)]

  const totalBits = lowSize * lowSize - 1 // excluding DC
  const bytes = Buffer.alloc(Math.ceil(totalBits / 8))
  for (let i = 0; i < coeffs.length; i++) {
    if (coeffs[i] > median) {
      const byteIndex = Math.floor(i / 8)
      const bitIndex = i % 8
      bytes[byteIndex] |= (1 << bitIndex)
    }
  }
  return bytes
}
