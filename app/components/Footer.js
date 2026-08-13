import Link from 'next/link';

export default function Footer() {
  return <footer className="border-t border-white/10"><div className="section-shell grid gap-10 py-10 sm:grid-cols-2 sm:items-end"><div><Link href="/" className="flex items-center gap-3"><span className="logo-mark">↗</span><span className="font-semibold text-white">clipline</span></Link><p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">A tiny tool for sharing the exact part of the stream that matters.</p></div><div className="sm:text-right"><div className="flex gap-6 text-sm text-slate-400 sm:justify-end"><Link href="/generator">Generator</Link><a href="https://github.com/BrandonDonnellDesign" target="_blank" rel="noreferrer">GitHub</a></div><p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-slate-600">© {new Date().getFullYear()} Clipline · Built for the good parts</p></div></div></footer>;
}
