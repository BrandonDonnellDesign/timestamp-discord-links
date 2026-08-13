import './globals.css';
import Navbar from './components/NavBar';
import Footer from './components/Footer';

export const metadata = {
  title: 'Clipline — Twitch timestamps, Discord ready',
  description: 'Turn Twitch VOD timestamps into clean, clickable Discord links.',
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
      <body className="min-h-screen bg-[#0d1012] text-white antialiased selection:bg-lime-300 selection:text-[#0d1012]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
