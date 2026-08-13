'use client';

import { useMemo, useState } from 'react';
import { fetchFromTwitch } from '../actions';
import { useAuth, signInWithTwitch } from '../utils/auth';
import { saveGeneratedLinks } from '../utils/database';

const inputClass = 'w-full rounded-xl border border-white/10 bg-[#0d1012] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-lime-300/70 focus:ring-4 focus:ring-lime-300/5';

function parseMoments(value) {
  return value.split('\n').map((line, index) => {
    const match = line.trim().match(/^(\d{1,3}:)?\d{1,2}:\d{2}\s*(?:-|–|—)?\s*(.+)$/);
    if (!line.trim()) return null;
    if (!match) return { invalid: true, line: index + 1 };
    const timestamp = line.trim().match(/^(?:\d{1,3}:)?\d{1,2}:\d{2}/)?.[0];
    const timeParts = timestamp.split(':').map(Number);
    if (timeParts.at(-2) > 59 || timeParts.at(-1) > 59) {
      return { invalid: true, line: index + 1 };
    }
    return { timestamp, text: match[2].trim() };
  }).filter(Boolean);
}

function StepLabel({ number, title, done }) {
  return <div className="mb-5 flex items-center gap-3"><span className={`grid h-7 w-7 place-items-center rounded-full font-mono text-[10px] ${done ? 'bg-lime-300 text-[#0d1012]' : 'border border-white/15 text-slate-500'}`}>{done ? '✓' : number}</span><h2 className="text-sm font-semibold text-white">{title}</h2></div>;
}

export default function InputForm({ onSubmit }) {
  const { user } = useAuth();
  const [platform, setPlatform] = useState('twitch');
  const [streamer, setStreamer] = useState('');
  const [kickVodUrl, setKickVodUrl] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [momentsText, setMomentsText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [generated, setGenerated] = useState(null);
  const [copied, setCopied] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ loading: false, message: '', error: '' });

  const parsedMoments = useMemo(() => parseMoments(momentsText), [momentsText]);
  const validMoments = parsedMoments.filter(item => !item.invalid);
  const invalidLines = parsedMoments.filter(item => item.invalid).map(item => item.line);
  const hasSource = platform === 'twitch' ? Boolean(selectedVideo) : Boolean(kickVodUrl.trim());
  const canGenerate = hasSource && validMoments.length > 0 && invalidLines.length === 0;

  const switchPlatform = (next) => {
    setPlatform(next); setSelectedVideo(''); setVideos([]); setGenerated(null); setError('');
  };

  const loadVideos = async (event) => {
    event.preventDefault();
    if (!streamer.trim()) return;
    setLoading(true); setError(''); setVideos([]); setSelectedVideo('');
    try {
      const userResult = await fetchFromTwitch('users', { login: streamer.trim() });
      if (!userResult.data?.length) throw new Error('That Twitch channel could not be found.');
      const result = await fetchFromTwitch('videos', { user_id: userResult.data[0].id, first: 50, type: 'archive' });
      if (!result.data?.length) throw new Error('No recent broadcasts were found for this channel.');
      setVideos(result.data);
    } catch (err) { setError(err.message || 'Could not load broadcasts. Try again.'); }
    finally { setLoading(false); }
  };

  const resolveSource = () => {
    if (platform === 'twitch') {
      const video = videos.find(item => item.id === selectedVideo);
      if (!video) throw new Error('Choose a Twitch broadcast first.');
      return { id: video.id, title: video.title, url: `https://www.twitch.tv/videos/${video.id}` };
    }
    let url;
    try { url = new URL(kickVodUrl.trim()); } catch { throw new Error('Enter a valid Kick VOD URL.'); }
    if (!['kick.com', 'www.kick.com'].includes(url.hostname.toLowerCase()) || !/^\/[^/]+\/videos\/[^/]+\/?$/.test(url.pathname)) throw new Error('Use a Kick URL in the format kick.com/channel/videos/video-id.');
    url.search = ''; url.hash = '';
    const parts = url.pathname.split('/').filter(Boolean);
    return { id: parts.at(-1), title: `Kick VOD · ${parts[0]}`, url: url.toString().replace(/\/$/, '') };
  };

  const generate = async (event) => {
    event.preventDefault(); setError(''); setSaveStatus({ loading: false, message: '', error: '' });
    if (invalidLines.length) return setError(`Check the format on line${invalidLines.length > 1 ? 's' : ''} ${invalidLines.join(', ')}.`);
    setGenerating(true);
    try {
      const videoData = resolveSource();
      const links = await onSubmit(videoData.url, validMoments, platform);
      if (!links?.length) throw new Error('No links were generated. Check your timestamps and try again.');
      setGenerated({ videoData, links });
      requestAnimationFrame(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    } catch (err) { setError(err.message || 'Could not generate links.'); setGenerated(null); }
    finally { setGenerating(false); }
  };

  const copyText = async (text, key) => {
    try { await navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(''), 1800); }
    catch { setError('Clipboard access was blocked by your browser.'); }
  };

  const save = async () => {
    if (!user) return setShowAuthModal(true);
    setSaveStatus({ loading: true, message: '', error: '' });
    try { await saveGeneratedLinks(user.id, generated.videoData, generated.links); setSaveStatus({ loading: false, message: 'Saved to your dashboard.', error: '' }); }
    catch (err) { setSaveStatus({ loading: false, message: '', error: err.message || 'Could not save these links.' }); }
  };

  return <div>
    <header className="mb-12 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
      <div><div className="section-kicker"><span>Build</span> Timestamp links</div><h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[.95] tracking-[-.06em] text-white sm:text-7xl">Find the moment.<br />Share the moment.</h1><p className="mt-6 max-w-xl leading-7 text-slate-400">Turn Twitch and Kick recordings into clean, clickable links made for Discord.</p></div>
      <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-slate-600"><span><b className="block text-xl font-normal text-white">02</b>Platforms</span><span><b className="block text-xl font-normal text-white">2k</b>Discord limit</span></div>
    </header>

    <form onSubmit={generate} className="grid gap-5 lg:grid-cols-[.78fr_1.22fr]">
      <div className="space-y-5">
        <section className="generator-panel">
          <StepLabel number="01" title="Choose a platform" done={Boolean(platform)} />
          <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#0d1012] p-1.5">
            {['twitch', 'kick'].map(item => <button key={item} type="button" onClick={() => switchPlatform(item)} className={`platform-tab ${platform === item ? 'platform-tab-active' : ''}`}><span className={`h-2 w-2 rounded-full ${item === 'twitch' ? 'bg-violet-400' : 'bg-lime-300'}`} />{item === 'twitch' ? 'Twitch' : 'Kick'}</button>)}
          </div>
        </section>

        <section className="generator-panel">
          <StepLabel number="02" title={platform === 'twitch' ? 'Find the broadcast' : 'Add the recording'} done={hasSource} />
          {platform === 'twitch' ? <>
            <label className="field-label" htmlFor="streamer">Channel username</label>
            <div className="flex flex-col gap-2 sm:flex-row"><input id="streamer" value={streamer} onChange={e => setStreamer(e.target.value)} placeholder="e.g. ray__c" className={inputClass} /><button type="button" onClick={loadVideos} disabled={loading || !streamer.trim()} className="small-action shrink-0">{loading ? <span className="spinner" /> : 'Load VODs ↗'}</button></div>
            {videos.length > 0 && <div className="mt-5"><label className="field-label" htmlFor="video">Recent broadcasts · {videos.length}</label><select id="video" value={selectedVideo} onChange={e => { setSelectedVideo(e.target.value); setGenerated(null); }} className={inputClass}><option value="">Choose a broadcast…</option>{videos.map(video => <option key={video.id} value={video.id}>{new Date(video.created_at).toLocaleDateString()} — {video.title}</option>)}</select></div>}
          </> : <><label className="field-label" htmlFor="kick-url">Kick VOD URL</label><input id="kick-url" type="url" value={kickVodUrl} onChange={e => { setKickVodUrl(e.target.value); setGenerated(null); }} placeholder="https://kick.com/channel/videos/video-id" className={inputClass} /><p className="mt-3 text-xs leading-5 text-slate-500">Open a recording on Kick, then copy its full browser URL.</p></>}
        </section>
        <aside className="rounded-2xl border border-white/10 p-5 text-xs leading-6 text-slate-500"><span className="mr-2 text-lime-300">TIP</span> You can use <span className="text-slate-300">MM:SS</span> or <span className="text-slate-300">HH:MM:SS</span>. Add one moment per line.</aside>
      </div>

      <section className="generator-panel flex min-h-[500px] flex-col">
        <StepLabel number="03" title="Mark the moments" done={validMoments.length > 0 && !invalidLines.length} />
        <div className="mb-3 flex items-center justify-between"><label className="field-label mb-0" htmlFor="moments">Timestamp — description</label><span className={`font-mono text-[10px] ${invalidLines.length ? 'text-red-400' : 'text-slate-600'}`}>{validMoments.length} valid {validMoments.length === 1 ? 'moment' : 'moments'}</span></div>
        <textarea id="moments" value={momentsText} onChange={e => { setMomentsText(e.target.value); setGenerated(null); setError(''); }} className={`${inputClass} min-h-[330px] flex-1 resize-none font-mono leading-7`} spellCheck="false" placeholder={'14:32 — The impossible comeback\n1:02:08 — Chat called it too early\n2:47:51 — One more for the highlight reel'} />
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-slate-500">Links open at the exact moment.</p><button type="submit" disabled={!canGenerate || generating} className="button-primary disabled:cursor-not-allowed disabled:opacity-40">{generating ? <><span className="spinner dark" /> Generating</> : <>Generate {validMoments.length || ''} {validMoments.length === 1 ? 'link' : 'links'} <span>↗</span></>}</button></div>
      </section>
    </form>

    {error && <div role="alert" className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300"><span className="mr-2">!</span>{error}</div>}

    {generated && <section id="results" className="mt-10 overflow-hidden rounded-2xl border border-lime-300/20 bg-[#15191d]">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7"><div><div className="section-kicker"><span>Ready</span> {generated.links.length} Discord-ready {generated.links.length === 1 ? 'link' : 'links'}</div><h2 className="mt-2 line-clamp-1 text-lg font-semibold text-white">{generated.videoData.title}</h2></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => copyText(generated.links.join('\n'), 'all')} className="small-action">{copied === 'all' ? 'Copied ✓' : 'Copy all'} </button><button type="button" onClick={save} disabled={saveStatus.loading} className="small-action">{saveStatus.loading ? <span className="spinner" /> : 'Save ↗'}</button></div></div>
      <div className="divide-y divide-white/[.07]">{generated.links.map((link, index) => <div key={link} className="group flex items-start gap-4 p-5 sm:p-6"><span className="pt-1 font-mono text-[10px] text-slate-600">{String(index + 1).padStart(2, '0')}</span><code className="min-w-0 flex-1 whitespace-pre-wrap break-words text-xs leading-6 text-slate-300 sm:text-sm">{link}</code><button type="button" onClick={() => copyText(link, index)} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-slate-400 transition hover:border-lime-300 hover:text-lime-300">{copied === index ? 'Copied' : 'Copy'}</button></div>)}</div>
      {(saveStatus.message || saveStatus.error) && <p className={`border-t border-white/10 px-6 py-4 text-xs ${saveStatus.error ? 'text-red-300' : 'text-lime-300'}`}>{saveStatus.message || saveStatus.error}</p>}
    </section>}

    {showAuthModal && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={e => e.target === e.currentTarget && setShowAuthModal(false)}><div role="dialog" aria-modal="true" aria-labelledby="auth-title" className="w-full max-w-md rounded-2xl border border-white/10 bg-[#15191d] p-7 shadow-2xl"><span className="logo-mark">↗</span><h2 id="auth-title" className="mt-6 text-2xl font-semibold tracking-tight text-white">Save this collection</h2><p className="mt-3 text-sm leading-6 text-slate-400">Connect your Twitch account to keep these timestamp links in your dashboard.</p><div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setShowAuthModal(false)} className="button-secondary">Not now</button><button type="button" onClick={signInWithTwitch} className="button-primary">Connect Twitch <span>↗</span></button></div></div></div>}
  </div>;
}
