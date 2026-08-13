'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, signInWithTwitch, signOut } from '../utils/auth';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const links = [{ name: 'Home', href: '/' }, { name: 'Generator', href: '/generator' }, ...(user ? [{ name: 'Saved links', href: '/dashboard' }] : [])];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1012]/85 backdrop-blur-xl">
      <nav className="section-shell flex h-[72px] items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="logo-mark">↗</span><span className="text-base font-semibold tracking-[-.02em] text-white">clipline</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map(link => <Link key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? 'text-white' : ''}`}>{link.name}</Link>)}
        </div>
        <div className="hidden md:block">
          {!loading && (user ? <button className="nav-action" onClick={signOut}>Sign out</button> : <button className="nav-action" onClick={signInWithTwitch}>Connect Twitch <span>↗</span></button>)}
        </div>
        <button className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? '×' : '≡'}</button>
      </nav>
      {open && <div className="border-t border-white/10 bg-[#0d1012] px-5 py-5 md:hidden">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-sm text-slate-300">{link.name}</Link>)}{!loading && <button onClick={user ? signOut : signInWithTwitch} className="button-primary mt-5 w-full">{user ? 'Sign out' : 'Connect Twitch'} <span>↗</span></button>}</div>}
    </header>
  );
}
