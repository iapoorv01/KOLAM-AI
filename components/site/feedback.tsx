'use client'
import * as React from 'react'
import { MessageSquare, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function FeedbackFloating() {
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
        setEmail("")
        setMessage("")
      } else {
        setError(data.error || "Failed to send feedback.")
      }
    } catch (err) {
      setError("Network error.")
    }
    setLoading(false)
  }

  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 rounded-full p-3 glass-gradient"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(200,200,255,0.18) 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 4px 32px 0 rgba(31,38,135,0.37), 0 1.5px 8px 0 rgba(255,255,255,0.12) inset',
          color: '#fff',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        }}
        onClick={() => setOpen(true)}
        aria-label="Feedback"
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 8px 40px 0 rgba(31,38,135,0.45), 0 2px 12px 0 rgba(255,255,255,0.18) inset';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 32px 0 rgba(31,38,135,0.37), 0 1.5px 8px 0 rgba(255,255,255,0.12) inset';
        }}
        onTouchStart={e => {
          e.currentTarget.style.transform = 'scale(0.96)';
          e.currentTarget.style.boxShadow = '0 2px 16px 0 rgba(31,38,135,0.30), 0 1px 4px 0 rgba(255,255,255,0.10) inset';
        }}
        onTouchEnd={e => {
          e.currentTarget.style.transform = 'scale(1.08)';
          e.currentTarget.style.boxShadow = '0 8px 40px 0 rgba(31,38,135,0.45), 0 2px 12px 0 rgba(255,255,255,0.18) inset';
        }}
      >
        <MessageSquare className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-lg border border-primary bg-gradient-to-br from-primary/90 to-background p-6 shadow-xl text-primary-foreground" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-1">Share feedback</h3>
            <p className="text-sm text-muted-foreground mb-4">We&#39;d love to hear your thoughts. Your feedback will be sent securely.</p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <Input
                className="bg-background border border-primary text-primary placeholder:text-primary/60 focus-visible:ring-primary"
                placeholder="Your email (optional)"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
              />
              <textarea
                className="w-full h-28 rounded-md border border-primary bg-background p-3 text-sm text-primary placeholder:text-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                placeholder="Your feedback..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={loading}
                required
              />
              {error && <div className="text-red-400 text-sm">{error}</div>}
              {success && <div className="text-green-400 text-sm">Thank you for your feedback!</div>}
              <div className="flex justify-end gap-2">
                <Button variant="ghost" type="button" onClick={() => setOpen(false)} disabled={loading}>Close</Button>
                <Button type="submit" disabled={loading || !message}>
                  {loading ? "Sending..." : <><Send className="h-4 w-4 mr-2" /> Send</>}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
