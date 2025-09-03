export function Footer() {
  return (
  <footer className="border-t mt-16 bg-black/30">
      <div className="container py-10 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>Built with ❤️ by Team SciDivine</p>
        <p className="opacity-80">© {new Date().getFullYear()} Kolam Ai</p>
      </div>
    </footer>
  )
}
