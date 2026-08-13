'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Jumbotron() {
  return (
    <section className="hero-grid relative border-b border-white/10">
      <div className="section-shell relative py-20 sm:py-28 lg:py-36">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs text-slate-300"><span className="live-dot" /> Twitch moments, Discord ready</div>
          <h1 className="hero-title">Stop sharing the whole stream.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">Turn any Twitch VOD timestamp into a clean, clickable Discord link. Find the moment, name it, send it.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/generator" className="button-primary">Create timestamp links <span>↗</span></Link>
            <a href="#how-it-works" className="button-secondary">See how it works <span>↓</span></a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .15 }} className="mt-16 lg:ml-auto lg:mt-[-3rem] lg:w-[62%]">
          <div className="product-card rotate-[-1deg]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex items-center gap-2 text-xs text-slate-400"><span className="h-2 w-2 rounded-full bg-lime-300" /> LINK BUILDER</div><span className="font-mono text-[10px] text-slate-600">CL/001</span></div>
            <div className="grid gap-6 p-5 sm:p-7">
              <div><label className="field-label">Twitch channel</label><div className="mock-input"><span className="text-violet-400">◈</span> ray__c <span className="ml-auto text-lime-300">VODs loaded ✓</span></div></div>
              <div><label className="field-label">Moments</label><div className="mock-editor"><div><b>14:32</b><span>The impossible comeback</span></div><div><b>1:02:08</b><span>Chat called it way too early</span></div><div><b>2:47:51</b><span>One more for the highlight reel</span></div><i>+</i></div></div>
              <div className="flex items-center justify-between"><span className="text-xs text-slate-500">3 links · 241 characters</span><span className="rounded-full bg-lime-300 px-4 py-2 text-xs font-bold text-[#0d1012]">Generate links ↗</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
