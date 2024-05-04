import React from 'react';

const Jumbotron = () => {
  return (
    <div className='text-left'>
      <div className='w-100 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl'>
        <div className='grid items-center gap-28 lg:grid-cols-2'>
          <div>
            <h1 className='mb-16 mt-0 text-4xl font-bold tracking-tight text-white md:text-5xl xl:text-6xl'>
              Converting your timestamps to Discord Links
            </h1>
            <a
              className='mb-2 inline-block rounded bg-violet-600 px-12 pb-3.5 pt-4 text-sm font-medium uppercase leading-normal text-white'
              data-te-ripple-init
              data-te-ripple-color='light'
              href='/generator'
              role='button'>
              Get started
            </a>
          </div>
          <div className='mb-12 lg:mb-0'>
            <img
              src='https://www.vectorlogo.zone/logos/twitch/twitch-tile.svg'
              className='w-full scale-50'
              alt=''
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;