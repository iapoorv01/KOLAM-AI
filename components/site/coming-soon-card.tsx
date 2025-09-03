'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'

export function ComingSoonCard({ title, description, icon }: { title: string; description: string; icon?: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-primary">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {title}
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs">Coming Soon</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="mt-4">
            <Button variant="secondary" onClick={() => setOpen(true)}>Learn more</Button>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold">🚧 Feature Coming Soon</h3>
            <p className="text-sm text-muted-foreground mt-2">We’re crafting this experience. Stay tuned!</p>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
