import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * IKWIDK Landing Page
 * A luxury editorial discovery engine landing page.
 * 
 * DESIGN PRINCIPLES:
 * - Minimalist, high-end editorial look
 * - Deep navy-black background
 * - Cream typography
 * - Gold/Amber accents
 * - Playfair Display & DM Sans
 */

const CYCLING_WORDS = [{
  id: 'opportunities',
  label: 'opportunities'
}, {
  id: 'knowledge',
  label: 'knowledge'
}, {
  id: 'people',
  label: 'people'
}];

// --- Constants & Data ---

const FEATURES = [{
  num: "I",
  title: "Proactive, not reactive",
  description: "When you don't know what to search for, you shouldn't have to search."
}, {
  num: "II",
  title: "Community first, algorithm second",
  description: "Every opportunity is sourced by real founders who just found it themselves, not scraped by a bot that doesn't know the difference."
}, {
  num: "III",
  title: "Built around you",
  description: "The people, knowledge, and opportunities specific to what you're building."
}];

// --- Sub-components ---

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };
  return <div className="w-full max-w-[560px] mx-auto mt-12 mb-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? <motion.div key="success" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -10
      }} className="text-center py-4">
            <span className="text-[var(--text-primary)] font-medium tracking-wide">
              You're on the list. We'll be in touch soon.
            </span>
          </motion.div> : <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch gap-4" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }}>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="flex-1 bg-[var(--surface)] border-2 border-[var(--border)] rounded-[4px] px-5 py-4 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:border-[var(--accent-gold)]/50 transition-colors font-sans" />
            <button type="submit" disabled={status === 'loading'} className="bg-[var(--accent-gold)] text-[var(--bg-deep)] px-8 py-4 rounded-[4px] font-sans font-bold uppercase tracking-[0.1em] text-sm hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50">
              {status === 'loading' ? 'Joining...' : 'Join the waitlist'}
            </button>
          </motion.form>}
      </AnimatePresence>
      
      {/* Decorative rule */}
      <div className="mt-12 flex justify-center">
        <div className="h-[1px] w-[320px] bg-[var(--accent-gold)] opacity-15" />
      </div>
    </div>;
};
const FeatureItem = ({
  num,
  title,
  description,
  index
}: {
  num: string;
  title: string;
  description: string;
  index: number;
}) => <motion.div className="flex flex-col items-center md:items-start text-center md:text-left px-8 py-4 relative group" initial={{
  opacity: 0,
  y: 30
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true,
  margin: "-100px"
}} transition={{
  duration: 0.8,
  delay: 0.2 + index * 0.1,
  ease: [0.22, 1, 0.36, 1]
}}>
    <span className="text-[var(--accent-gold)] text-[11px] font-serif italic mb-3 opacity-80 uppercase tracking-widest">{num}</span>
    <h3 className="text-[var(--text-primary)] font-sans font-medium text-lg mb-3 tracking-tight">
      {title}
    </h3>
    <p className="text-[var(--text-secondary)] font-sans text-sm leading-[1.7] max-w-[280px]"></p>
  </motion.div>;

// --- Main Page Component ---

export const IKWIDKLandingPage: React.FC = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<'in' | 'visible' | 'out'>('in');
  useEffect(() => {
    document.title = "IKWIDK | Opportunity Discovery Engine";
  }, []);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === 'in') {
      // Stay visible after fade-in (500ms) for 2500ms
      timer = setTimeout(() => setPhase('visible'), 500);
    } else if (phase === 'visible') {
      timer = setTimeout(() => setPhase('out'), 2500);
    } else if (phase === 'out') {
      // After fade-out (500ms), advance to next word
      timer = setTimeout(() => {
        setWordIndex(prev => (prev + 1) % CYCLING_WORDS.length);
        setPhase('in');
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [phase]);
  const currentWord = CYCLING_WORDS[wordIndex];
  return <main className="min-h-screen w-full bg-[var(--bg-deep)] selection:bg-[var(--accent-gold)] selection:text-[var(--bg-deep)] overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
      __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
        
        :root {
          --bg-deep: oklch(0.09 0.015 255);
          --surface: oklch(0.12 0.012 255);
          --text-primary: oklch(0.93 0.03 85);
          --text-secondary: oklch(0.65 0.02 85);
          --accent-gold: oklch(0.78 0.12 85);
          --border: oklch(0.22 0.01 255);
        }

        body {
          background-color: var(--bg-deep);
        }

        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .font-sans {
          font-family: 'DM Sans', sans-serif;
        }

        .small-caps {
          font-variant: all-small-caps;
        }
      `
    }} />

      {/* Top Header Label (Logotype) */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 pointer-events-none">
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 1,
        delay: 0.5
      }} className="text-[var(--accent-gold)] font-sans text-xs tracking-[0.3em] font-bold uppercase pointer-events-auto">
          IKWIDK
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12 overflow-hidden">
        {/* Masthead */}
        <motion.div className="flex items-center gap-6 mb-12" initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1
      }}>
          <div className="h-[1px] w-12 bg-[var(--accent-gold)] opacity-30" />
          <span className="text-[var(--accent-gold)] font-sans text-[10px] uppercase tracking-[0.4em] font-bold">I know what i don't know</span>
          <div className="h-[1px] w-12 bg-[var(--accent-gold)] opacity-30" />
        </motion.div>

        {/* Headline */}
        <motion.h1 className="text-[var(--text-primary)] font-serif text-5xl md:text-[88px] text-center leading-[1.05] max-w-[1000px] mb-8 tracking-[-0.02em]" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.9,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}>
          <span>The </span>
          <span style={{
          display: 'inline-block',
          position: 'relative',
          verticalAlign: 'baseline'
        }}>
            {/* Hidden sizer to reserve width of the longest word */}
            <span aria-hidden="true" style={{
            visibility: 'hidden',
            display: 'inline-block'
          }}>opportunities</span>
            {/* Animated word absolutely positioned over the sizer */}
            <span style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-gold)',
            opacity: phase === 'out' ? 0 : 1,
            transform: phase === 'in' ? 'translateY(0px)' : phase === 'out' ? 'translateY(-6px)' : 'translateY(0px)',
            transition: phase === 'in' ? 'opacity 0.5s ease, transform 0.5s ease' : phase === 'out' ? 'opacity 0.5s ease, transform 0.5s ease' : 'none'
          }}>
              {currentWord.label}
            </span>
          </span>
          <span> you never knew to look for</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p className="text-[var(--text-secondary)] font-sans text-lg md:text-[18px] text-center max-w-[560px] leading-[1.65] mb-10 px-4" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.9,
        delay: 0.35,
        ease: [0.22, 1, 0.36, 1]
      }}>A personalised discovery engine.<br />You shouldn't lose from a lack of knowledge.</motion.p>

        {/* Form Container */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.9,
        delay: 0.55,
        ease: [0.22, 1, 0.36, 1]
      }} className="w-full">
          <WaitlistForm />
        </motion.div>

        {/* Subtle Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-gold)]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto py-40 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 relative">
          {FEATURES.map((feature, idx) => <React.Fragment key={idx}>
              <FeatureItem {...feature} index={idx} />
              {/* Vertical Divider for desktop */}
              {idx < FEATURES.length - 1 && <div className="hidden md:block absolute top-0 bottom-0 w-[1px] bg-[var(--accent-gold)] opacity-10" style={{
            left: `${(idx + 1) * 33.33}%`
          }} />}
            </React.Fragment>)}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-[var(--border)] mt-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <span className="text-[var(--accent-gold)] font-sans text-xs tracking-[0.4em] font-bold uppercase">
            IKWIDK
          </span>
          <span className="text-[var(--text-secondary)] font-sans text-[11px] uppercase tracking-widest opacity-60">
            © 2026 Discovery Intelligence
          </span>
        </div>
      </footer>
    </main>;
};