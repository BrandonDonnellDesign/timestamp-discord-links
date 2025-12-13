import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
import Navbar from './components/NavBar';
import Footer from './components/Footer';

export const metadata = {
  title: 'TwitchLinker',
  description: 'Generate timestamped links for your favorite Twitch VODs',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: ['/favicon.svg'],
    apple: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-950 text-white min-h-screen flex flex-col antialiased selection:bg-violet-500/30 selection:text-violet-200`}>
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}