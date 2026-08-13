'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchFromTwitch } from '../actions';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetchFromTwitch('videos', { user_id: '44574567', first: 3 }).then(r => setVideos(r.data || [])).catch(() => setVideos([])).finally(() => setLoading(false)); }, []);
  const thumbnail = (video) => video.thumbnail_url?.replace('%{width}', '640').replace('%{height}', '360');

  return (
    <section className="border-y border-white/10 bg-white/[.018] py-24 sm:py-28">
      <div className="section-shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><div className="section-kicker"><span>03</span> Fresh from Twitch</div><h2 className="mt-6 display-title">Recent broadcasts.</h2></div><a href="https://www.twitch.tv/Ray__C/videos" target="_blank" rel="noreferrer" className="text-link">View channel <span>↗</span></a></div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {loading && [1,2,3].map(i => <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-white/5" />)}
          {!loading && videos.map((video, i) => <a key={video.id} href={`https://www.twitch.tv/videos/${video.id}`} target="_blank" rel="noreferrer" className="video-card group">
            <div className="relative aspect-video overflow-hidden bg-[#171b1e]">{thumbnail(video) && <Image src={thumbnail(video)} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" unoptimized className="object-cover opacity-75 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />}<span className="absolute left-4 top-4 rounded-full bg-[#0d1012]/80 px-3 py-1 font-mono text-[10px] text-white backdrop-blur">VOD {String(i + 1).padStart(2, '0')}</span><span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-lime-300 text-[#0d1012] transition group-hover:rotate-12">↗</span></div>
            <div className="p-5"><h3 className="line-clamp-2 min-h-[3rem] font-semibold leading-6 text-white">{video.title}</h3><div className="mt-5 flex justify-between border-t border-white/10 pt-4 font-mono text-[10px] uppercase tracking-wider text-slate-500"><span>{new Date(video.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span><span>{Number(video.view_count).toLocaleString()} views</span></div></div>
          </a>)}
          {!loading && videos.length === 0 && <p className="col-span-full py-12 text-slate-500">Recent broadcasts are taking a breather. Check back soon.</p>}
        </div>
      </div>
    </section>
  );
}
