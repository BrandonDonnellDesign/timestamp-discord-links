'use client'
import React, { useEffect, useState } from 'react';

function TwitchVideos() {
  useEffect(() => {
    async function fetchVideos(userId, clientId) {
      const response = await fetch(
        `https://api.twitch.tv/helix/videos?user_id=${userId}&first=10`,
        {
          headers: {
            'Client-ID': process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
            Authorization: process.env.NEXT_PUBLIC_TWITCH_AUTH_TOKEN,
          },
        }
      );
      const data = await response.json();
      return data.data; // Array of video objects
    }

    async function displayVideos() {
      const streamers = [
        { name: 'Streamer1', userId: '44574567' },
        { name: 'Streamer2', userId: '52959392' },
        // Add more streamers as needed
      ];

      const allVideos = [];
      const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;

      for (const streamer of streamers) {
        const videos = await fetchVideos(streamer.userId, clientId);
        allVideos.push(...videos);
      }

      // Sort videos by date in descending order
      allVideos.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setVideos(allVideos);
    }

    displayVideos();
  }, []);

  const [videos, setVideos] = useState([]);

  return (
    <div className='rounded-lg bg-zinc-800 p-10 container-xl'>
      <h1 className='text-3xl pb-10'>The Company</h1>
      <div className='grid grid-cols-4 gap-4'>
        {videos.map((video) => (
          <div key={video.id} className='max-w-sm bg-white shadow-lg'>
            <iframe
              src={`https://player.twitch.tv/?video=${video.id}&parent=localhost&parent=theones.netlify.app&autoplay=false`}
              height={219}
              width={355}
            />
            <div className='p-6'>
              <h5 className='mb-2 text-xl font-medium text-black'>
                {video.title}
              </h5>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <p className=' text-base text-black'>
                    {new Date(video.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className=' text-base text-black'>
                    {video.view_count} views
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TwitchVideos;
