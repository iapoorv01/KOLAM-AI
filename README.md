# Kolam Ai: Digitizing heritage with Ai & Ar

Production-ready Next.js 14 app with Tailwind CSS and shadcn/ui.

MVP: Upload a Kolam image, analyze using the bundled Kaggle dataset first (perceptual hash nearest-neighbor), blend with lightweight CV (dot grid + symmetry), and optionally use Gemini fallback when confidence is low.

## Tech
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS + shadcn/ui (custom components)
- Jimp + TensorFlow.js (server-side lightweight CV scaffold)
- API Routes (stateless)

## Env
Create `.env.local` with:

```
GEMINI_API_KEY=your_key_optional
GEMINI_MODEL=gemini-1.5-flash
```

## Scripts
- dev: start dev server
- build: production build
- start: run production server

## Deploy
Deploy on Vercel. Ensure `GEMINI_API_KEY` (optional) and `GEMINI_MODEL` (optional) are set in project Environment Variables.

## Dataset
Place dataset under `archive/` (already included in this workspace). The server builds a small index (up to 500 images) using a perceptual aHash to enable fast nearest-neighbor lookup. Labels are inferred from folder/file names when possible.
