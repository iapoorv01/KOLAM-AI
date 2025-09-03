'use client'
import * as React from 'react'
import { MessageSquare, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function FeedbackFloating() {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary text-primary-foreground shadow-lg p-3 hover:opacity-90"
        onClick={() => setOpen(true)}
        aria-label="Feedback"
      >
        <MessageSquare className="h-5 w-5" />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-1">Share feedback</h3>
            <p className="text-sm text-muted-foreground mb-4">We&#39;d love to hear your thoughts. This is a placeholder and not submitted.</p>
            <form className="space-y-3">
              <Input placeholder="Your email (optional)" />
              <textarea className="w-full h-28 rounded-md border border-input p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Your feedback..." />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" type="button" onClick={() => setOpen(false)}>Close</Button>
                <Button type="button" onClick={() => setOpen(false)}>
                  <Send className="h-4 w-4 mr-2" /> Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
