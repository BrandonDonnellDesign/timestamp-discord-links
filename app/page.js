import Jumbotron from './components/Jumbotron';
import VideoGallery from './components/VideoGallery';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Section */}
        <section className="relative">
          <Jumbotron />
        </section>

        {/* Features Section */}
        <section className="relative py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              Create Discord-formatted links from your Twitch VODs in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Select Your VOD",
                description: "Choose from your recent Twitch VODs",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                )
              },
              {
                title: "Add Timestamps",
                description: "Paste your timestamps and descriptions",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                )
              },
              {
                title: "Generate Links",
                description: "Get Discord-formatted links instantly",
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="relative group bg-zinc-900 p-6 rounded-xl hover:bg-zinc-800/50 transition-all duration-300"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg opacity-25 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200" />
                <div className="relative flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-violet-600/10 rounded-lg text-violet-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Videos Section */}
        <section className="relative">
          <VideoGallery />
        </section>
      </div>
    </div>
  );
}
