import './globals.css';
import Navbar from './components/NavBar'
import Footer from './components/Footer';

export const metadata = {
  title: "Timestamp to Discord Link",
  description: "Convert Timestamp list to discord masked links.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <div className='max-w-screen max-h-screen bg-black text-white flex flex-col'>
          <Navbar />
          <div className='container mx-auto flex-grow flex-auto'>
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}