import React from 'react';

const Footer = () => {
  return (
    <footer className='body-font w-full bg-zinc-800 text-white mt-10 self-end'>
    <div className='md:flex-no-wrap container mx-auto flex flex-col flex-wrap px-5 py-24 md:flex-row md:items-center lg:items-start'>
      <div className='mx-auto w-64 flex-shrink-0 text-center md:mx-0 md:text-left'>
        TwitchLinker
        <div className='mt-4'>
          <span className='mt-2 inline-flex justify-center sm:ml-auto sm:mt-0 sm:justify-start'>
            <a href="https://github.com/BrandonDonnellDesign" className='cursor-pointer text-white hover:text-gray-700'>
              <svg 
                fill='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                className='h-5 w-5'
                viewBox='0 0 24 24'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 496 512'>
                  <path d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z' />
                </svg>
              </svg>
            </a>
{/*             <a className='ml-3 cursor-pointer text-white hover:text-gray-700'>
              <svg
                fill='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                className='h-5 w-5'
                viewBox='0 0 24 24'>
                <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
              </svg>
            </a> */}
          </span>
        </div>
      </div>
      <div className='-mb-10 mt-10 flex flex-grow flex-wrap text-center md:mt-0 md:pl-20 md:text-left'>
        <div className='w-full px-4 md:w-1/2 lg:w-1/4' />
        <div className='w-full px-4 md:w-1/2 lg:w-1/4'>
          <h2 className='title-font mb-3 text-sm font-medium uppercase tracking-widest text-white'>
            Links
          </h2>
          <div className='mb-10 list-none'>
            <li className='mt-3'>
              <a href='/ ' className='cursor-pointer text-white'>Home</a>
            </li>
            <li className='mt-3'>
              <a href='/generator' className='cursor-pointer text-white'>Link Generator</a>
            </li>
            <li className='mt-3'>
              <a href='/company' className='cursor-pointer text-white'>Company VODS</a>
            </li>
          </div>
        </div>
        <div className='w-full px-4 md:w-1/2 lg:w-1/4'>
          <h2 className='title-font mb-3 text-sm font-medium uppercase tracking-widest text-white'>
            Lysium Socials
          </h2>
          <div className='mb-10 list-none'>
            <li className='mt-3'>
              <a href='https://www.twitch.tv/lysium' className='cursor-pointer text-white'>Twitch</a>
            </li>
            <li className='mt-3'>
              <a href='https://www.youtube.com/lysium' className='cursor-pointer text-white'>Youtube</a>
            </li>
            <li className='mt-3'>
              <a href='https://www.discord.gg/Lysium' className='cursor-pointer text-white'>Discord</a>
            </li>
            <li className='mt-3'>
              <a className='cursor-pointer text-white'>TikTok</a>
            </li>
          </div>
        </div>
      </div>
    
    </div>
  </footer>
  );
};

export default Footer;