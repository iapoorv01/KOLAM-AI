'use client'
import * as React from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/components/site/auth-context'
import Link from 'next/link'
import Image from 'next/image';
import { CommunityPostModal } from '@/components/community/CommunityPostModal';

type KolamAnalysisResult = {
  dot_grid: {
    dots: [number, number][];
    rows: number;
    cols: number;
    spacing_x: number;
    spacing_y: number;
    regularity_score: number;
    num_dots?: number;
  };
  symmetry: {
    horizontal: number;
    vertical: number;
    diagonal: number;
    rotational_90: number;
    rotational_180: number;
    primary_symmetry: string;
    is_symmetric: boolean;
  };
  kolam_type: string;
  type_confidence: number;
  dl_classification: string;
  dl_confidence: number;
  repetition_patterns: {
    has_repetition: boolean;
    repetition_score: number;
    tile_size: [number, number] | null;
  };
  characteristics: {
    edge_pixels: number;
    edge_density: number;
    num_contours: number;
    complexity: string;
  };
};

export default function RecognitionPage() {
  // Track which analysis was chosen first
  const [preferGemini, setPreferGemini] = React.useState(false)
  const [reanalyzing, setReanalyzing] = React.useState(false)
  const [geminiResult, setGeminiResult] = React.useState<any>(null)
  const [datasetResult, setDatasetResult] = React.useState<any>(null)
  const [showPostModal, setShowPostModal] = React.useState(false);
  const [postImage, setPostImage] = React.useState<string | null>(null);
  const [postDetails, setPostDetails] = React.useState<string | null>(null);
  const [alreadyPosted, setAlreadyPosted] = React.useState(false);

  // Handler for posting to community
  async function handlePostToCommunity(description: string) {
    setAlreadyPosted(true);
    // Example: send post to API or Supabase
    try {
      // Replace with actual post logic
      // await supabase.from('community_posts').insert({ image: postImage, details: description, user_id: user?.id });
      // For now, just close modal
      setShowPostModal(false);
    } catch (e: any) {
      // Handle error if needed
    }
  }
  const auth = useAuth();
  const user = auth?.user;
  // Curated Kolam facts and quotes (concise, accurate, and respectful)
  const TIPS = React.useMemo(
    () => [
      'Kolam (Tamil: கோலம்) means beauty or embellishment; it is a threshold art drawn at dawn.',
      'In Tamil, dot patterns are called Pulli Kolam (pulli = dots); looping knot designs are Sikku Kolam.',
      'Similar traditions exist across India: Telugu Muggu/Muggulu, Kannada and Marathi Rangoli.',
      'Rice flour is traditionally used so birds and ants can feed - art that also nourishes.',
      'Kolam designs often encode symmetry, tiling, and fractal-like repetition.',
      'Many kolams start from a pulli (dot) grid and weave continuous lines around them.',
      'Drawing kolam daily is believed to invite prosperity and positive energy into the home.',
      'Sikku kolams trace elegant knots around dots without crossing the drawn line.',
      'Kolam is ephemeral - wiped by wind and footsteps, then renewed every morning.',
      'Festive kolams can be large, colorful, and highly intricate with seasonal motifs.',
      'Kolam practice blends math and mindfulness - precision, rhythm, and creativity.',
      'Eco-friendly pigments and stone powders add color while keeping it biodegradable.'
    ],
    []
  )

  const [file, setFile] = React.useState<File | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [analysisResult, setAnalysisResult] = React.useState<KolamAnalysisResult | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [preview, setPreview] = React.useState<string | null>(null)
  const [overlayUrl, setOverlayUrl] = React.useState<string | null>(null)
  const [overlayDotCount, setOverlayDotCount] = React.useState<number | null>(null)
  const [progress, setProgress] = React.useState<number>(0)
  const [consentGiven, setConsentGiven] = React.useState<boolean>(false)
  const [tip, setTip] = React.useState<string | null>(null)


  const onFile = (f: File | null) => {
    setFile(f)
    setAnalysisResult(null)
    setError(null)
    setPreview(f ? URL.createObjectURL(f) : null)
    setAlreadyPosted(false);
  }


  React.useEffect(() => {
    if (analysisResult && preview && !alreadyPosted) {
      setPostImage(preview);
      const name = analysisResult.kolam_type || analysisResult.dl_classification || '';
      const explanation = `CV: ${analysisResult.kolam_type} (${(analysisResult.type_confidence * 100).toFixed(1)}%), DL: ${analysisResult.dl_classification} (${(analysisResult.dl_confidence * 100).toFixed(1)}%)`;
      setPostDetails(`${name}${explanation ? ': ' + explanation : ''}`);
      setShowPostModal(true);
    }
  }, [analysisResult, preview, alreadyPosted]);


  // Removed preference loading and persistence as preferGemini is no longer relevant

  const analyze = async () => {
    if (!file) return
    setLoading(true)
    setProgress(10)
    if (TIPS.length) {
      setTip(TIPS[Math.floor(Math.random() * TIPS.length)])
    }
    setError(null)
    setAnalysisResult(null)
    setGeminiResult(null)
    setDatasetResult(null)
    try {
      const form = new FormData()
      form.append('image', file)
      const t1 = setTimeout(() => setProgress(35), 350)
      const t2 = setTimeout(() => setProgress(60), 900)
      const t3 = setTimeout(() => setProgress(85), 1600)
      // Default: dataset analysis first
      setPreferGemini(false)
      const res = await fetch('/api/analyze/python-script', { method: 'POST', body: form })
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      setAnalysisResult(data)
      setDatasetResult(data)
      // eslint-disable-next-line no-console
      console.log('Python script analysis result:', data)
      storeAnnotation(file, data)
    } catch (e: any) {
      setError(e.message || 'Failed to analyze image with Python script')
    } finally {
      setProgress(100)
      setLoading(false)
    }
  }

  // Rotate tips while loading
  React.useEffect(() => {
    if (!loading || TIPS.length === 0) return
    const id = window.setInterval(() => {
      setTip(TIPS[Math.floor(Math.random() * TIPS.length)])
    }, 5500) // rotate more slowly so each tip stays visible
    return () => window.clearInterval(id)
  }, [loading, TIPS])

  // Redirect to sign-in if user is not authenticated
  React.useEffect(() => {
    if (!user && !auth?.loading) {
      window.location.href = '/signin';
    }
  }, [user, auth?.loading]);

  // Log when analysis result updates
  React.useEffect(() => {
    if (analysisResult) {
      // eslint-disable-next-line no-console
      console.log('Analysis result updated:', analysisResult)
    }
  }, [analysisResult]);

  // Persist user-upload + analysis result to Supabase for dataset building
  const storeAnnotation = async (file: File, analysis: KolamAnalysisResult) => {
    try {
      if (!file) return
      // compute sha256 of file to deduplicate
      const ab = await file.arrayBuffer()
      const digest = await crypto.subtle.digest('SHA-256', ab)
      const hex = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('')

      // check for existing annotation by hash
      const { data: existing } = await supabase.from('annotations').select('id').eq('hash', hex).limit(1).maybeSingle()
      if (existing) {
        // already stored
        // eslint-disable-next-line no-console
        console.log('Annotation already exists, skipping upload', hex)
        return
      }

      // upload to storage bucket 'kolam_images' (ensure bucket exists)
      const ext = (file.name.split('.').pop() || 'jpg').replace(/[^a-z0-9]/gi, '')
      const path = `${hex}.${ext}`
      const { error: upErr } = await supabase.storage.from('kolam_images').upload(path, file, { upsert: false })
      if (upErr && upErr.message && !upErr.message.includes('already exists')) {
        // eslint-disable-next-line no-console
        console.warn('upload error', upErr)
      }
      const { data: pu } = supabase.storage.from('kolam_images').getPublicUrl(path)
      const publicUrl = pu?.publicUrl ?? null

      // insert annotation record
      const userId = (await supabase.auth.getUser()).data.user?.id ?? null
      const payload = {
        user_id: userId,
        url: publicUrl,
        hash: hex,
        gemini_result: analysis ?? {},
        created_at: new Date().toISOString()
      }
      const { error: insErr } = await supabase.from('annotations').insert(payload)
      if (insErr) {
        // eslint-disable-next-line no-console
        console.warn('Failed to insert annotation', insErr)
      } else {
        // eslint-disable-next-line no-console
        console.log('Annotation stored', hex)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('storeAnnotation failed', err)
    }
  }

  // Show loading or nothing while redirecting
  if (!user) {
    return (
      <div>
        <Navbar />
        <main className="container py-10">
          <div className="max-w-md mx-auto text-center">
            <Card className="p-8 shadow-xl rounded-2xl border bg-card/80 backdrop-blur-sm">
              <h1 className="text-3xl font-bold text-primary mb-4">Redirecting...</h1>
              <p className="text-muted-foreground">Please wait while we redirect you to sign in.</p>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="container py-10">
        <h1 className="text-3xl font-bold">Kolam Recognition</h1>
        <p className="text-muted-foreground mt-1">Upload a Kolam image. We&#39;ll detect dots, symmetry and classify the style.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* ...existing code... */}
          <Card className="w-full max-w-md mx-auto sm:max-w-none sm:mx-0">
            {/* ...existing code... */}
            <CardHeader>
              <CardTitle>Upload</CardTitle>
              <CardDescription>PNG or JPG up to 5MB.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 w-full">
                <Input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Button className="w-full sm:w-auto" onClick={analyze} disabled={!file || loading || !consentGiven}>{loading ? 'Analyzing…' : 'Analyze'}</Button>
                {/* Button to choose Gemini analysis first */}
                <Button
                  className="w-full sm:w-auto"
                  variant="outline"
                  onClick={async () => {
                    if (!file) return
                    setLoading(true)
                    setProgress(10)
                    setError(null)
                    setAnalysisResult(null)
                    setGeminiResult(null)
                    setDatasetResult(null)
                    setPreferGemini(true)
                    try {
                      const form = new FormData()
                      form.append('image', file)
                      const t1 = setTimeout(() => setProgress(35), 350)
                      const t2 = setTimeout(() => setProgress(60), 900)
                      const t3 = setTimeout(() => setProgress(85), 1600)
                      const res = await fetch('/api/analyze/gemini', { method: 'POST', body: form })
                      clearTimeout(t1)
                      clearTimeout(t2)
                      clearTimeout(t3)
                      if (!res.ok) throw new Error(await res.text())
                      const data = await res.json()
                      setAnalysisResult(data)
                      setGeminiResult(data)
                      // eslint-disable-next-line no-console
                      console.log('Gemini analysis result:', data)
                      storeAnnotation(file, data)
                    } catch (e: any) {
                      setError(e.message || 'Failed to analyze image with Gemini')
                    } finally {
                      setProgress(100)
                      setLoading(false)
                    }
                  }}
                  disabled={!file || loading || !consentGiven}
                >Analyze with Gemini</Button>
                  {file && <Button className="w-full sm:w-auto" variant="ghost" onClick={() => onFile(null)}>Reset</Button>}
                  {file && (
                    <Button
                      className="w-full sm:w-auto"
                      variant="outline"
                      onClick={async () => {
                        setOverlayUrl(null)
                        setOverlayDotCount(null)
                        try {
                          const form = new FormData()
                          form.append('image', file)
                          const res = await fetch('/api/analyze/overlay', { method: 'POST', body: form })
                          if (!res.ok) throw new Error(await res.text())
                          // Get dot count from custom header
                          const dotCount = Number(res.headers.get('X-Dot-Count'))
                          setOverlayDotCount(isNaN(dotCount) ? null : dotCount)
                          const blob = await res.blob()
                          const url = URL.createObjectURL(blob)
                          setOverlayUrl(url)
                        } catch (e: any) {
                          setError(e?.message || 'Failed to fetch overlay')
                        }
                      }}
                    >
                      Show detected dots
                    </Button>
                  )}
                        {/* Try Its Variants button: always shown after analysis */}
                        {file && analysisResult && (
                          <Button
                            variant="secondary"
                            className="ml-2 w-full sm:w-auto relative font-bold bg-teal-600 text-white border border-teal-600 shadow hover:bg-teal-700 hover:shadow-lg transition-transform duration-200"
                            onClick={async () => {
                              if (file) {
                                // Convert file to base64 before storing
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  const base64 = reader.result as string;
                                  sessionStorage.setItem('kolam_variant_image', base64);
                                  window.location.href = '/creation?variant=1';
                                };
                                reader.readAsDataURL(file);
                              } else if (preview) {
                                // fallback for preview
                                sessionStorage.setItem('kolam_variant_image', preview);
                                window.location.href = '/creation?variant=1';
                              }
                            }}
                          >
                            <span className="relative z-10">Try Its Variants</span>
                            {/* Sparkle effect */}
                            <span className="absolute pointer-events-none inset-0 flex justify-center items-center">
                              {[...Array(8)].map((_, i) => (
                                <span
                                  key={i}
                                  className="absolute rounded-full bg-teal-300 opacity-70"
                                  style={{
                                    width: '6px',
                                    height: '6px',
                                    top: `${Math.random() * 80 + 10}%`,
                                    left: `${Math.random() * 80 + 10}%`,
                                    animation: `sparkle 1.2s linear ${i * 0.15}s infinite`
                                  }}
                                />
                              ))}
                            </span>
                            <style>{`
                              @keyframes sparkle {
                                0% { opacity: 0.7; transform: scale(1); }
                                50% { opacity: 1; transform: scale(1.5); }
                                100% { opacity: 0; transform: scale(0.8); }
                              }
                            `}</style>
                          </Button>
                        )}
                </div>
                <div className="flex items-start gap-3">
                  <input id="consent" type="checkbox" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)} className="mt-1 h-4 w-4" />
                  <label htmlFor="consent" className="text-xs text-muted-foreground max-w-md">
                    I consent to storing my uploaded images and Gemini analysis results to improve the dataset. See your <a href="/profile" className="underline">Profile settings</a> to change this preference.
                  </label>
                </div>

                {preview && (
                  <div className="rounded-lg overflow-hidden border">
                    <Image src={preview} alt="preview" width={600} height={400} className="w-full object-contain max-h-96 bg-muted" />
                    {overlayUrl && (
                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground mb-1">Detected dots overlay</div>
                        <Image src={overlayUrl} alt="overlay" width={600} height={400} className="w-full object-contain rounded" />
                      </div>
                    )}
                  </div>
                )}
                {loading && (
                  <div className="relative overflow-hidden rounded-xl border bg-card/40">
                    <div className="absolute inset-0 grid grid-rows-3 gap-2 p-4">
                      <div className="h-2 shimmer animate-shimmer rounded bg-white/10" />
                      <div className="h-2 shimmer animate-shimmer rounded bg-white/10" />
                      <div className="h-2 shimmer animate-shimmer rounded bg-white/10" />
                    </div>
                    <div className="relative p-6">
                      <div className="text-sm text-muted-foreground">Analyzing with AI…</div>
                      <div className="mt-2 h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
                      </div>
                      {tip && (
                        <div className="mt-3 text-xs italic text-muted-foreground/90">
                          {tip}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>
            </CardContent>
          </Card>
          {/* ...existing code... */}
          <Card className="bg-card/60 backdrop-blur">
            {/* ...existing code... */}
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>Interactive insights</CardDescription>
            </CardHeader>
            <CardContent>
  {!analysisResult && <p className="text-sm text-muted-foreground">No results yet.</p>}
  {analysisResult && (
    <div className="space-y-4">
      {/* Show Gemini result card if Gemini analysis is preferred and result exists */}
      {preferGemini && geminiResult && geminiResult.classification && (
        <div className="rounded-xl border p-4 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16">
              {/* radial progress for Gemini confidence */}
              <svg viewBox="0 0 36 36" className="h-16 w-16">
                <path className="text-muted stroke-current" strokeWidth="3" fill="none" pathLength={100}
                  d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32" opacity="0.2" />
                <path className="text-primary stroke-current" strokeWidth="3" strokeLinecap="round" fill="none" pathLength={100}
                  strokeDasharray={`${Math.round((geminiResult.classification.confidence) * 100)}, 100`}
                  d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32" />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-sm font-semibold">{Math.round(geminiResult.classification.confidence * 100)}%</div>
            </div>
            <div>
              <div className="text-sm uppercase text-muted-foreground">Classification</div>
              <div className="mt-1 text-xl font-semibold tracking-tight">
                {geminiResult.classification.label}
                <span className="ml-3 text-[10px] uppercase tracking-wider rounded-full bg-secondary/60 px-2 py-0.5">{geminiResult.classification.source}</span>
              </div>
            </div>
          </div>
          {/* confidence breakdown bar */}
          <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.round(geminiResult.classification.confidence * 100)}%` }}
                title={`${Math.round(geminiResult.classification.confidence * 100)}% ${geminiResult.classification.label}`}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{Math.round(geminiResult.classification.confidence * 100)}% {geminiResult.classification.label}</span>
            <span>
              Other: {Math.max(0, 100 - Math.round(geminiResult.classification.confidence * 100))}%
            </span>
          </div>
          {geminiResult.classification.details && (
            <div className="mt-2 text-xs text-muted-foreground space-y-1">
              {Object.entries(geminiResult.classification.details).map(([k, v]) => (
                <div key={k}>
                  <span className="font-medium">{k}:</span> {String(v)}
                </div>
              ))}
            </div>
          )}
          <div className="mt-3 flex gap-2">
            <Button
              className="mt-4"
              variant="secondary"
              disabled={reanalyzing}
              onClick={async () => {
                if (!file) return
                setReanalyzing(true)
                setProgress(10)
                try {
                  const form = new FormData()
                  form.append('image', file)
                  const t1 = setTimeout(() => setProgress(40), 300)
                  const t2 = setTimeout(() => setProgress(70), 900)
                  const res = await fetch('/api/analyze/python-script', { method: 'POST', body: form })
                  clearTimeout(t1)
                  clearTimeout(t2)
                  if (!res.ok) throw new Error(await res.text())
                  const data = await res.json()
                  setDatasetResult(data)
                  setAnalysisResult(data)
                  storeAnnotation(file, data)
                } catch (e: any) {
                  setError(e?.message || 'Failed to re-analyze with Dataset')
                } finally {
                  setProgress(100)
                  setReanalyzing(false)
                }
              }}
            >{reanalyzing ? 'Re-analyzing…' : 'Reanalyze with Dataset'}</Button>
          </div>
        </div>
      )}
      {/* Show dataset result card if dataset analysis is preferred and result exists */}
      {!preferGemini && datasetResult && datasetResult.classification && (
        <div className="rounded-xl border p-4 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16">
              {/* radial progress for Dataset confidence */}
              <svg viewBox="0 0 36 36" className="h-16 w-16">
                <path className="text-muted stroke-current" strokeWidth="3" fill="none" pathLength={100}
                  d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32" opacity="0.2" />
                <path className="text-primary stroke-current" strokeWidth="3" strokeLinecap="round" fill="none" pathLength={100}
                  strokeDasharray={`${Math.round((datasetResult.classification.confidence) * 100)}, 100`}
                  d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32" />
              </svg>
              <div className="absolute inset-0 grid place-items-center text-sm font-semibold">{Math.round(datasetResult.classification.confidence * 100)}%</div>
            </div>
            <div>
              <div className="text-sm uppercase text-muted-foreground">Classification</div>
              <div className="mt-1 text-xl font-semibold tracking-tight">
                {datasetResult.classification.label}
                <span className="ml-3 text-[10px] uppercase tracking-wider rounded-full bg-secondary/60 px-2 py-0.5">{datasetResult.classification.source}</span>
              </div>
            </div>
          </div>
          {/* confidence breakdown bar */}
          <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.round(datasetResult.classification.confidence * 100)}%` }}
                title={`${Math.round(datasetResult.classification.confidence * 100)}% ${datasetResult.classification.label}`}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{Math.round(datasetResult.classification.confidence * 100)}% {datasetResult.classification.label}</span>
            <span>
              Other: {Math.max(0, 100 - Math.round(datasetResult.classification.confidence * 100))}%
            </span>
          </div>
          {datasetResult.classification.details && (
            <div className="mt-2 text-xs text-muted-foreground space-y-1">
              {Object.entries(datasetResult.classification.details).map(([k, v]) => (
                <div key={k}>
                  <span className="font-medium">{k}:</span> {String(v)}
                </div>
              ))}
            </div>
          )}
          <div className="mt-3 flex gap-2">
            <Button
              className="mt-4"
              variant="secondary"
              disabled={reanalyzing}
              onClick={async () => {
                if (!file) return
                setReanalyzing(true)
                setProgress(10)
                try {
                  const form = new FormData()
                  form.append('image', file)
                  const t1 = setTimeout(() => setProgress(40), 300)
                  const t2 = setTimeout(() => setProgress(70), 900)
                  const res = await fetch('/api/analyze/gemini', { method: 'POST', body: form })
                  clearTimeout(t1)
                  clearTimeout(t2)
                  if (!res.ok) throw new Error(await res.text())
                  const data = await res.json()
                  setGeminiResult(data)
                  setAnalysisResult(data)
                  storeAnnotation(file, data)
                } catch (e: any) {
                  setError(e?.message || 'Failed to re-analyze with Gemini')
                } finally {
                  setProgress(100)
                  setReanalyzing(false)
                }
              }}
            >{reanalyzing ? 'Re-analyzing…' : 'Reanalyze with Gemini'}</Button>
          </div>
        </div>
      )}
                {analysisResult.dl_classification && (
                    <div className="rounded-xl border p-4 bg-gradient-to-br from-primary/10 to-accent/10">
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16">
                          {/* radial progress for Kolam Type confidence */}
                          <svg viewBox="0 0 36 36" className="h-16 w-16">
                            <path className="text-muted stroke-current" strokeWidth="3" fill="none" pathLength={100}
                              d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32" opacity="0.2" />
                            <path className="text-primary stroke-current" strokeWidth="3" strokeLinecap="round" fill="none" pathLength={100}
                              strokeDasharray={`${Math.round((analysisResult!.type_confidence) * 100)}, 100`}
                              d="M18 2a16 16 0 1 1 0 32a16 16 0 1 1 0-32" />
                          </svg>
                          <div className="absolute inset-0 grid place-items-center text-sm font-semibold">{Math.round(analysisResult!.type_confidence * 100)}%</div>
                        </div>
                        <div>
                          <div className="text-sm uppercase text-muted-foreground">Kolam Type</div>
                          <div className="mt-1 text-xl font-semibold tracking-tight">
                            {analysisResult.kolam_type}
                            <span className="ml-3 text-[10px] uppercase tracking-wider rounded-full bg-secondary/60 px-2 py-0.5">CV Model</span>
                          </div>
                        </div>
                      </div>
                      {/* confidence breakdown bar */}
                      <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${Math.round(analysisResult.type_confidence * 100)}%` }}
                            title={`${Math.round(analysisResult.type_confidence * 100)}% ${analysisResult.kolam_type}`}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{Math.round(analysisResult.type_confidence * 100)}% {analysisResult.kolam_type}</span>
                        <span>
                          DL: {Math.round(analysisResult.dl_confidence * 100)}% {analysisResult.dl_classification}
                        </span>
                      </div>
                    </div>
                  )}
                  {analysisResult.dot_grid && (
                    <div className="rounded-xl border p-4 bg-card/50">
                      <div className="text-sm uppercase text-muted-foreground">Dot Grid</div>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5">rows: {analysisResult.dot_grid.rows}</span>
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5">cols: {analysisResult.dot_grid.cols}</span>
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5">
                          dots: {typeof analysisResult.dot_grid.num_dots === 'number' ? analysisResult.dot_grid.num_dots : '—'}
                        </span>
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5">regularity: {(analysisResult.dot_grid.regularity_score * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  )}
                  {analysisResult.symmetry && (
                    <div className="rounded-xl border p-4 bg-card/50">
                      <div className="text-sm uppercase text-muted-foreground">Symmetry</div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-accent/60 px-2 py-0.5 text-xs">Primary: {analysisResult.symmetry.primary_symmetry}</span>
                        <span className="rounded-full bg-accent/60 px-2 py-0.5 text-xs">H: {(analysisResult.symmetry.horizontal * 100).toFixed(1)}%</span>
                        <span className="rounded-full bg-accent/60 px-2 py-0.5 text-xs">V: {(analysisResult.symmetry.vertical * 100).toFixed(1)}%</span>
                        <span className="rounded-full bg-accent/60 px-2 py-0.5 text-xs">Rot90: {(analysisResult.symmetry.rotational_90 * 100).toFixed(1)}%</span>
                        <span className="rounded-full bg-accent/60 px-2 py-0.5 text-xs">Rot180: {(analysisResult.symmetry.rotational_180 * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  )}
                  {analysisResult.repetition_patterns && (
                    <div className="rounded-xl border p-4 bg-card/50">
                      <div className="text-sm uppercase text-muted-foreground">Repetition</div>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5">Has Repetition: {analysisResult.repetition_patterns.has_repetition ? 'Yes' : 'No'}</span>
                        {analysisResult.repetition_patterns.tile_size && (
                          <span className="rounded-full bg-secondary/60 px-2 py-0.5">Tile Size: {analysisResult.repetition_patterns.tile_size[0]}x{analysisResult.repetition_patterns.tile_size[1]}</span>
                        )}
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5">Score: {(analysisResult.repetition_patterns.repetition_score * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  )}
                  {analysisResult.characteristics && (
                    <div className="rounded-xl border p-4 bg-card/50">
                      <div className="text-sm uppercase text-muted-foreground">Characteristics</div>
                      <div className="mt-2 flex flex-wrap gap-2 text-sm">
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5">Complexity: {analysisResult.characteristics.complexity}</span>
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5">Edge Density: {(analysisResult.characteristics.edge_density * 100).toFixed(1)}%</span>
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5">Num Contours: {analysisResult.characteristics.num_contours}</span>
                        <span className="rounded-full bg-secondary/60 px-2 py-0.5">Type: Complex (109-dot)</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* CommunityPostModal integration */}
<CommunityPostModal
  image={postImage ?? ''}
  details={postDetails ?? ''}
  open={showPostModal}
  onClose={() => setShowPostModal(false)}
  onPost={async (description) => {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data?.user?.id;
      if (!userId) throw new Error('User not logged in');

      // Convert file to base64 before posting
      let imageBase64 = '';
      if (file) {
        imageBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } else if (postImage) {
        imageBase64 = postImage;
      }

      const res = await fetch('/api/community-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageBase64, description, userId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post');

      // Removed karma points and modal logic
      // setTimeout(() => {
      //   setKarmaPoints(data.karma ?? null);
      //   setShowKarmaModal(true);
      // }, 500);
    } catch (e) {
      const errMsg = (e instanceof Error) ? e.message : 'Failed to post';
      alert(errMsg);
    }
    setShowPostModal(false);
  }}
/>
      </main>
      <Footer />
    </div>
  )
}
