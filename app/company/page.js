'use client'
import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON);

function TwitchVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos(userId, clientId) {
      const response = await fetch(
        `https://api.twitch.tv/helix/videos?user_id=${userId}&first=5`,
        {
          headers: {
            'Client-ID': clientId,
            Authorization: process.env.NEXT_PUBLIC_TWITCH_AUTH_TOKEN,
          },
        }
      );
      const data = await response.json();
      return data.data; // Array of video objects
    }

    async function displayVideos() {
      try {
        // Fetch streamer data from Supabase
        const { data: streamers, error } = await supabase.from('Company').select('twitchId');
        
        if (error) {
          throw error;
        }

        const allVideos = [];
        const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;

        for (const streamer of streamers) {
          const videos = await fetchVideos(streamer.twitchId, clientId);
          allVideos.push(...videos);
        }

        // Sort videos by date in descending order
        allVideos.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setVideos(allVideos);
      } catch (error) {
        console.error('Error fetching streamer data:', error);
      }
    }

    displayVideos();
  }, []);

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
              <p className='text-clip overflow-hidden mb-6 text-l font-bold text-black h-24 max-h-24 line-clamp-3'>
                {video.title}
              </p>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <p className='text-black font-medium'>
                    {new Date(video.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className='text-black font-medium'>
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
