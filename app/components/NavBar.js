'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, signInWithTwitch, signOut } from '../utils/auth';

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Link Generator', href: '/generator' },
    { name: 'Exodus VODs', href: '/exodus' },
  ];

  if (user) {
    navLinks.push({ name: 'Dashboard', href: '/dashboard' });
  }

  return (
    <nav className="bg-zinc-900/50 backdrop-blur-lg border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center space-x-3 text-white hover:text-violet-400 transition-colors"
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              TwitchLinker
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white bg-violet-600'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {!loading && (
              user ? (
                <div className="flex items-center ml-4 space-x-4">
                  <span className="text-sm text-zinc-400">
                    {user.user_metadata.preferred_username}
                  </span>
                  <button
                    onClick={signOut}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithTwitch}
                  className="ml-4 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-all duration-200"
                >
                  Sign In
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-lg text-base font-medium ${
                isActive(link.href)
                  ? 'text-white bg-violet-600'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {!loading && (
            user ? (
              <div className="px-3 py-2 space-y-2">
                <span className="block text-sm text-zinc-400">
                  {user.user_metadata.preferred_username}
                </span>
                <button
                  onClick={signOut}
                  className="block w-full px-3 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithTwitch}
                className="block w-full mt-2 px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-all duration-200"
              >
                Sign In
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}