import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 text-center">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ff6b2b]/6 rounded-full blur-[160px]" />

      <div className="relative z-10">
        <p className="text-[#ffaa33] font-mono text-sm tracking-[0.3em] uppercase mb-4">Error 404</p>

        <h1 className="text-7xl md:text-9xl font-black mb-6 font-mono leading-none">
          <span className="bg-gradient-to-r from-[#ff6b2b] via-[#ffaa33] to-[#b347ff] bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <p className="text-lg text-white/45 mb-2">This page went off-script.</p>
        <p className="text-sm text-white/25 mb-10">
          Even my agents came up empty, and they check everything twice.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" data-hover="true"
            className="squeeze-btn px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] text-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,107,43,0.3)] transition-shadow duration-300">
            Back Home
          </Link>
          <Link href="/#projects" data-hover="true"
            className="squeeze-btn px-8 py-3.5 rounded-full border border-[#ff6b2b]/30 text-[#ffaa33] font-bold text-sm uppercase tracking-wider hover:bg-[#ff6b2b]/8 transition-all duration-300">
            See Projects
          </Link>
        </div>

        <p className="mt-12 text-xs font-mono text-white/45">
          Press <kbd className="border border-white/20 rounded px-1.5 py-0.5 mx-1">⌘K</kbd> to search anything
        </p>
      </div>
    </main>
  );
}
