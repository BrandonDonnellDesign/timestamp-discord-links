import Jumbotron from './components/Jumbotron';
import VideoGallery from './components/VideoGallery';

export default function Home() {
  return (
<<<<<<< HEAD
    <div>
      {/* Jumbotron */}
      <Jumbotron />
      {/* Jumbotron */}
      <VideoGallery />
    </div>
=======
    <main className='flex min-h-screen flex-col items-center justify-between p-12'>
      <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
        <div className='fixed bottom-0 left-0 flex h-24 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none'>
          <a
            className='pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0'
            href=''
            target='_blank'
            rel='noopener noreferrer'>
            <h1 className='text-2xl'>Discord Link Generator</h1>
          </a>
        </div>
      </div>
      <div className='gap-5 w-2/5'>
        <InputForm onSubmit={handleFormSubmit} />
        
      </div>
      <div className='grid gap-5 w-2/5 min-h-96'>
      <GeneratedLinks links={generatedLinks} />
        
      </div>
      <div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
        <a
          href='https://github.com/BrandonDonnellDesign'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            BDonnellDesign{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Made by TotallyTipsy
          </p>
        </a>

        <a
          href='https://www.twitch.tv/lysium'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Lysium Twitch{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Check Lysium out on twitch!!!
          </p>
        </a>

        <a
          href='https://www.discord.gg/Lysium'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Lysium Discord{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Join the Lysium community on discord.
          </p>
        </a>

        <a
          href='https://www.youtube.com/lysium'
          className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
          target='_blank'
          rel='noopener noreferrer'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Lysium Youtube{' '}
            <span className='inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none'>
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
          Join the Lysium community on youtube.
          </p>
        </a>
      </div>
    </main>
>>>>>>> parent of e76b6f7 (Cleaned up layout and added seperation after 2000 characters)
  );
}
