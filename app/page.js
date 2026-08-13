import Link from 'next/link';
import Jumbotron from './components/Jumbotron';
import VideoGallery from './components/VideoGallery';

const steps = [
  { number: '01', title: 'Find the VOD', text: 'Search any Twitch channel and choose a recent broadcast.' },
  { number: '02', title: 'Drop your moments', text: 'Paste timestamps with a label on each line. No fussy formatting.' },
  { number: '03', title: 'Share the good part', text: 'Copy clean, clickable links formatted and ready for Discord.' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Jumbotron />

      <section id="how-it-works" className="section-shell py-24 sm:py-32">
        <div className="section-kicker"><span>01</span> The workflow</div>
        <div className="mt-7 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
          <div>
            <h2 className="display-title max-w-xl">From stream to shared moment in seconds.</h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
              Skip the timestamp math, broken URLs, and hand-written markdown. Clipline does the repetitive part so your community can jump straight to the moment.
            </p>
          </div>

          <ol className="border-t border-white/10">
            {steps.map((step) => (
              <li key={step.number} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-white/10 py-7 sm:grid-cols-[4rem_1fr_auto] sm:items-center">
                <span className="font-mono text-xs text-lime-300">{step.number}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 max-w-md text-sm leading-6 text-slate-400">{step.text}</p>
                </div>
                <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-500 transition group-hover:border-lime-300 group-hover:text-lime-300 sm:flex">↗</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell pb-24 sm:pb-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#15191d] p-7 sm:p-12 lg:p-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <div className="section-kicker"><span>02</span> Built for Discord</div>
              <h2 className="mt-7 display-title">Paste once.<br />Look polished everywhere.</h2>
              <p className="mt-6 max-w-md leading-7 text-slate-400">Every result uses Discord-friendly markdown and stays within message limits. One click copies the whole set.</p>
              <Link href="/generator" className="text-link mt-8 inline-flex">Try the generator <span>↗</span></Link>
            </div>
            <div className="discord-window">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 text-xs text-slate-500"><span className="h-2 w-2 rounded-full bg-red-400" /><span className="h-2 w-2 rounded-full bg-amber-300" /><span className="h-2 w-2 rounded-full bg-emerald-400" /><span className="ml-2"># stream-highlights</span></div>
              <div className="space-y-5 p-5 sm:p-7">
                <div className="flex gap-3"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-600 text-xs font-bold">CL</div><div><p className="text-sm font-semibold text-white">clipline <span className="ml-1 text-[10px] font-normal text-slate-500">Today at 9:41 PM</span></p><p className="mt-1 text-sm text-slate-300"><span className="text-sky-400">00:14:32</span> — The impossible comeback</p><p className="mt-1 text-sm text-slate-300"><span className="text-sky-400">01:02:08</span> — Chat called it way too early</p><p className="mt-1 text-sm text-slate-300"><span className="text-sky-400">02:47:51</span> — One more for the highlight reel</p></div></div>
                <div className="ml-12 rounded-lg border border-white/5 bg-[#101316] p-4"><div className="mb-2 h-2 w-24 rounded-full bg-violet-400/60" /><div className="h-2 w-3/4 rounded-full bg-white/10" /><div className="mt-2 h-2 w-1/2 rounded-full bg-white/10" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoGallery />

      <section className="section-shell py-24 sm:py-32">
        <div className="cta-panel">
          <p className="font-mono text-xs uppercase tracking-[.25em] text-lime-300">Your next highlight is waiting</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-.04em] text-white sm:text-6xl">Make every second easy to share.</h2>
          <Link href="/generator" className="button-primary mt-9">Build your links <span>↗</span></Link>
        </div>
      </section>
    </div>
  );
}
