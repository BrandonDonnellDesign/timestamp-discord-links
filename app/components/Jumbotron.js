import React from 'react';
import Link from 'next/link';

const Jumbotron = () => {
  return (
    <div className="relative overflow-hidden bg-zinc-900 rounded-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-indigo-600/30" />
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M0 32V0h32" fill="none" stroke="white" strokeOpacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative px-6 py-16 sm:px-8 sm:py-24 lg:py-32 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Convert Timestamps to{' '}
                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  Discord Links
                </span>
              </h1>
              <p className="text-lg text-zinc-400 sm:text-xl max-w-2xl">
                Easily create clickable Discord-formatted links from your Twitch VOD timestamps. Perfect for sharing highlights and memorable moments with your community.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/generator"
                  className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 focus:ring-offset-zinc-900 transition-all duration-200"
                >
                  Get Started
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <a 
                  href="https://www.twitch.tv/lysium" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 text-base font-medium text-violet-200 bg-zinc-800/50 rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 focus:ring-offset-zinc-900 transition-all duration-200"
                >
                  Watch Live
                  <svg className="ml-2 -mr-1 w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="relative lg:block">
              <div className="absolute -inset-2">
                <div className="w-full h-full mx-auto opacity-30 blur-lg filter" style={{ 
                  background: 'linear-gradient(90deg, #7c3aed 0%, #4f46e5 100%)'
                }}/>
              </div>
              <img
                src="https://www.vectorlogo.zone/logos/twitch/twitch-icon.svg"
                className="relative w-full max-w-lg mx-auto transform lg:scale-110"
                alt="Twitch Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;