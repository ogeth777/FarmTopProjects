import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  ExternalLink, 
  Coins, 
  BarChart3, 
  Globe, 
  Zap, 
  Trophy,
  Activity,
  DollarSign,
  Layers,
  Rocket,
  ShieldCheck,
  Package,
  ArrowDown,
  Twitter
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Project {
  id: string;
  name: string;
  url: string;
  twitter?: string;
  tier: 'S' | 'A' | 'B' | 'C';
  description: string;
  investment?: string;
  investmentUrl?: string;
  otcPrice?: string;
  tags: string[];
  logo?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'omni',
    name: 'Variational Omni',
    url: 'https://omni.variational.io/?ref=OMNI22CPU2OG',
    twitter: 'https://x.com/variational_io',
    tier: 'S',
    description: 'Omnichain perpetual DEX. Advanced risk management and deep cross-chain liquidity.',
    investment: '$11.8M (Dragonfly, Coinbase, Bain Capital)',
    investmentUrl: 'https://cryptorank.io/ico/variational',
    otcPrice: 'Pre-market live',
    tags: ['Arbitrum', 'Dragonfly', 'Omnichain'],
    logo: '/logos/variational.jpg'
  },
  {
    id: 'nado',
    name: 'Nado',
    url: 'https://app.nado.xyz?join=qv0JaRc',
    twitter: 'https://x.com/nadoHQ',
    tier: 'S',
    description: 'CLOB DEX on Ink L2 (Kraken). High-performance central limit order book for professional traders.',
    investment: 'Ink L2 Ecosystem (Kraken)',
    investmentUrl: 'https://inkonchain.com',
    tags: ['Ink L2', 'Kraken', 'CLOB'],
    logo: '/logos/nado.jpg'
  },
  {
    id: 'liquid',
    name: 'Liquid',
    url: 'https://referral.tryliquid.xyz/cGnvVI5n40b',
    twitter: 'https://x.com/tryLiquid',
    tier: 'S',
    description: 'Perp DEX aggregator. Unified interface for accessing liquidity from Hyperliquid, Lighter, and Ostium.',
    investment: '$7.6M (Paradigm, General Catalyst, Alpen Capital)',
    investmentUrl: 'https://cryptorank.io/ico/liquid-markets',
    tags: ['Aggregator', 'Non-custodial', 'Unified UI'],
    logo: '/logos/liquid.jpg'
  },
  {
    id: 'extended',
    name: 'Extended',
    url: 'https://app.extended.exchange/join/EXTENDED2026',
    twitter: 'https://x.com/extendedapp',
    tier: 'S',
    description: 'Starknet DEX powered by ZK-Rollups. High performance and ultra-low fees for active traders.',
    investment: '$6.5M (cyber Fund, Semantic, StarkWare)',
    investmentUrl: 'https://cryptorank.io/ico/extended',
    tags: ['Starknet', 'ZK-Rollup', 'StarkWare'],
    logo: '/logos/extended.jpg'
  },
  {
    id: 'ostium',
    name: 'Ostium',
    url: 'https://ostium.app/trade?ref=WZIGP',
    twitter: 'https://x.com/OstiumLabs',
    tier: 'A',
    description: 'RWA Perpetual DEX on Arbitrum. Trade gold, oil, FX, and stocks with up to 200x leverage. Top-tier project in its niche.',
    investment: '$27.8M (Jump Crypto, General Catalyst, Coinbase Ventures)',
    investmentUrl: 'https://cryptorank.io/ico/ostium-labs',
    otcPrice: '~$0.003 / point',
    tags: ['RWA', 'Arbitrum', 'Series A'],
    logo: '/logos/ostium.jpg'
  },
  {
    id: 'reya',
    name: 'Reya Network',
    url: 'https://app.reya.xyz/trade?referredBy=kh4deiqw',
    twitter: 'https://x.com/reya_xyz',
    tier: 'A',
    description: 'High-performance trading L2. Institutional-grade liquidity and the fastest order execution on the market.',
    investment: '$19M (Coinbase Ventures, Amber Group, Framework)',
    investmentUrl: 'https://cryptorank.io/ico/reya-network',
    otcPrice: '$0.032 (Whales Market)',
    tags: ['L2', 'Ethereum', 'Amber Group'],
    logo: 'https://app.reya.xyz/favicon.ico'
  },
  {
    id: 'hibachi',
    name: 'Hibachi',
    url: 'https://hibachi.xyz/r/7QXRZUZ4VQ',
    twitter: 'https://x.com/hibachi_xyz',
    tier: 'A',
    description: 'Global market on Hyperliquid L1 (HIP-3). Trade any asset 24/7 in a decentralized environment.',
    investment: '$5M (Dragonfly, Circle Ventures, Electric Capital)',
    investmentUrl: 'https://cryptorank.io/ico/hibachi',
    tags: ['Hyperliquid', 'HIP-3', 'L1'],
    logo: '/logos/hibachi.jpg'
  },
  {
    id: 'based',
    name: 'Based.one',
    url: 'https://app.based.one/r/OGETH',
    twitter: 'https://x.com/BasedOneX',
    tier: 'B',
    description: 'Next-gen trading platform on Base. Early access with social trading mechanics.',
    investment: '$15.2M (Pantera Capital, Coinbase Ventures, Wintermute)',
    investmentUrl: 'https://cryptorank.io/ico/based-one',
    tags: ['Base', 'Early Access', 'Social'],
    logo: 'https://app.based.one/favicon.ico'
  },
  {
    id: 'o1',
    name: 'O1 Exchange',
    url: 'https://o1.exchange/@ogeth',
    twitter: 'https://x.com/o1_exchange',
    tier: 'B',
    description: 'StarkEx-powered DEX. CEX-like speed with full blockchain security and transparency.',
    investment: '$4.2M (Coinbase Ventures, Alliance DAO)',
    investmentUrl: 'https://cryptorank.io/ico/o1',
    tags: ['StarkEx', 'Amber Group', 'ZK-Proofs'],
    logo: 'https://o1.exchange/favicon.ico'
  },
  {
    id: 'ethereal',
    name: 'Ethereal',
    url: 'https://app.ethereal.trade/?ref=PAT4YX3841A3',
    twitter: 'https://x.com/etherealdex',
    tier: 'C',
    description: 'Ethena-based DEX. Deep USDe integration for seamless trading and yield farming.',
    investment: 'Backed by Ethena Labs (USDe Ecosystem)',
    otcPrice: 'TBA',
    tags: ['Ethena', 'USDe', 'L2'],
    logo: 'https://app.ethereal.trade/favicon.ico'
  },
  {
    id: 'pacifica',
    name: 'Pacifica',
    url: 'https://app.pacifica.fi?referral=pacifica2026',
    twitter: 'https://x.com/pacifica_fi',
    tier: 'C',
    description: 'Solana hybrid DEX. CEX speed with DeFi transparency. Built by a team with FTX-level expertise.',
    investment: 'Strategic Backers (Constance Wang)',
    tags: ['Solana', 'AI Tools', 'Hybrid'],
    logo: 'https://app.pacifica.fi/favicon.ico'
  }
];

const FallingAirdrop = () => {
  const [drops, setDrops] = useState<{ id: number; x: number; delay: number; duration: number; type: 'coin' | 'box' | 'zap' }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops(prev => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          x: Math.random() * 100,
          delay: 0,
          duration: 10 + Math.random() * 10,
          type: Math.random() > 0.6 ? 'box' : Math.random() > 0.3 ? 'coin' : 'zap'
        }
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      <AnimatePresence>
        {drops.map(drop => (
          <motion.div
            key={drop.id}
            initial={{ y: -100, opacity: 0, rotate: 0, scale: 0.8 }}
            animate={{ 
              y: '110vh', 
              opacity: [0, 0.4, 0.4, 0],
              rotate: 360,
              scale: [0.8, 1, 1, 0.8]
            }}
            transition={{ 
              duration: drop.duration, 
              delay: drop.delay,
              ease: "linear"
            }}
            style={{ left: `${drop.x}%` }}
            className="absolute"
          >
            <div className="flex flex-col items-center gap-1">
              {drop.type === 'box' ? (
                <div className="relative group">
                  <div className="absolute inset-0 bg-opinion-orange/20 blur-xl rounded-full animate-pulse" />
                  <Package className="w-6 h-6 text-opinion-orange/50 relative z-10" />
                </div>
              ) : drop.type === 'coin' ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-500/10 blur-lg rounded-full animate-pulse" />
                  <Coins className="w-5 h-5 text-yellow-500/40 relative z-10" />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute inset-0 bg-opinion-orange/20 blur-lg rounded-full animate-pulse" />
                  <Zap className="w-5 h-5 text-opinion-orange/40 relative z-10" />
                </div>
              )}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowDown className="w-3 h-3 text-white/5" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const VCTicker = () => {
  const vcs = [
    'Paradigm', 'Coinbase Ventures', 'Dragonfly', 'Polychain', 'a16z', 
    'Pantera', 'Multicoin', 'Binance Labs', 'Sequoia', 'Wintermute', 
    'Framework', 'Jump Crypto', 'Delphi Digital', 'Spartan', 'Hashed'
  ];

  return (
    <div className="w-full overflow-hidden bg-opinion-orange/5 border-y border-opinion-orange/10 py-2 mb-8">
      <motion.div 
        className="flex gap-8 items-center whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...vcs, ...vcs, ...vcs].map((vc, i) => (
          <div key={i} className="flex items-center gap-2 text-white/40 font-bold uppercase tracking-wider text-xs md:text-sm">
            <span className="text-opinion-orange">★</span> {vc}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const VisitorStats = () => {
  const [location, setLocation] = useState<{ city: string; country: string; flag: string } | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.city && data.country_name) {
          setLocation({
            city: data.city,
            country: data.country_name,
            flag: data.country_code // This is just the code, we can use emoji flag logic if needed or just display code
          });
        }
      })
      .catch(err => console.error('Failed to fetch location', err));
  }, []);

  if (!location) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-opinion-orange/20 rounded-full text-[10px] font-mono text-opinion-orange/80 shadow-[0_0_15px_rgba(255,95,31,0.15)] animate-pulse">
      <div className="w-1.5 h-1.5 bg-opinion-orange rounded-full animate-ping" />
      <span>DETECTED: {location.city.toUpperCase()}, {location.country.toUpperCase()}</span>
    </div>
  );
};

const TIER_STYLES = {
  S: 'bg-[#FF5F5F] text-white',
  A: 'bg-[#FF9F43] text-white',
  B: 'bg-[#54A0FF] text-white',
  C: 'bg-[#FDCB6E] text-white',
};

const TRANSLATIONS = {
  en: {
    title: 'PERP',
    hub: 'HUB',
    subtitle: 'Institutional Trading Access',
    potential: 'Potential Profit: $5,000 - 10,000💎',
    projects: 'Projects',
    elite: 'Elite S',
  },
  de: {
    title: 'PERP',
    hub: 'HUB',
    subtitle: 'Institutioneller Handelszugang',
    potential: 'Möglicher Gewinn: $5.000 - 10.000💎',
    projects: 'Projekte',
    elite: 'Elite S',
  },
  ko: {
    title: 'PERP',
    hub: '허브',
    subtitle: '기관급 거래 액세스',
    potential: '예상 수익: $5,000 - 10,000💎',
    projects: '프로젝트',
    elite: '엘리트 S',
  },
};

type Language = 'en' | 'de' | 'ko';

const TierList = () => {
  const tiers = ['S', 'A', 'B', 'C'];
  const projectsByTier = tiers.map(tier => ({
    tier,
    projects: PROJECTS.filter(p => p.tier === tier)
  }));

  return (
    <div className="space-y-4">
      {projectsByTier.map(({ tier, projects }) => (
        <motion.div 
          key={tier}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-4 bg-[#0A0A0A] p-3 rounded-2xl border border-white/[0.05]"
        >
          {/* Tier Letter */}
          <div className={cn(
            'w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center rounded-xl text-3xl md:text-4xl font-black shadow-lg',
            TIER_STYLES[tier as keyof typeof TIER_STYLES]
          )}>
            {tier}
          </div>

          {/* Projects Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-6 p-2 w-full">
            {projects.map(project => (
              <a 
                key={project.id} 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 bg-[#1A1A1A] rounded-full flex items-center justify-center border-2 border-transparent hover:border-opinion-orange transition-all duration-300 hover:scale-110"
              >
                {/* Investment Badge */}
                {project.investment && (
                  <a 
                    href={project.investmentUrl || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-md text-[11px] font-black text-green-400 shadow-xl z-20 hover:scale-105 hover:bg-gray-800 transition-all cursor-pointer tracking-wide"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.investment.split('(')[0].trim()}
                  </a>
                )}

                <img 
                  src={project.logo} 
                  alt={project.name} 
                  className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${project.name}&background=333&color=fff`;
                  }}
                />
                
                {/* Tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 group-hover:-bottom-11 transition-all duration-300 pointer-events-none z-30 font-bold border border-white/10 shadow-2xl">
                  {project.name}
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState<Language>(() => {
    // Auto-detect language from browser settings (which usually match the country)
    if (typeof window === 'undefined') return 'en';
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('de')) return 'de';
    if (browserLang.startsWith('ko')) return 'ko';
    return 'en';
  });
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505] selection:bg-opinion-orange selection:text-white font-space">
      <FallingAirdrop />
      <VisitorStats />
      
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-opinion-orange/15 blur-[180px] rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-opinion-orange/10 blur-[180px] rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 sm:px-8 lg:px-12 relative">
        {/* Language Switcher */}
        <div className="absolute top-0 right-6 sm:right-8 lg:right-12 z-50 flex gap-2">
          {[
            { code: 'en', label: '🇺🇸 EN' },
            { code: 'de', label: '🇩🇪 DE' },
            { code: 'ko', label: '🇰🇷 KO' }
          ].map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code as Language)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                lang === l.code 
                  ? "bg-opinion-orange text-white border-opinion-orange shadow-[0_0_15px_rgba(255,95,31,0.4)]" 
                  : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-left space-y-2"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.05em] leading-[0.85] text-white">
              {t.title} <span className="text-gradient inline-block hover:skew-x-[-2deg] transition-transform duration-700 cursor-default">DEX</span><br/>
              <span className="text-white/10 tracking-[0.05em] sm:tracking-[0.1em]">{t.hub}</span>
            </h1>
            <p className="text-xs sm:text-sm font-black uppercase tracking-[0.4em] text-white/30">
              {t.subtitle}
            </p>
          </motion.div>

          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-opinion-orange/10 rounded-full border border-opinion-orange/20 shadow-[0_0_20px_rgba(255,95,31,0.3)] animate-pulse">
              <Activity className="w-4 h-4 text-opinion-orange" />
              <span className="text-sm font-black text-opinion-orange tracking-widest uppercase">
                {t.potential}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {[
                { label: t.projects, value: PROJECTS.length, icon: Layers },
                { label: t.elite, value: PROJECTS.filter(p => p.tier === 'S').length, icon: Trophy },
              ].map((stat, i) => (
                <div key={stat.label} className="bg-card-bg/40 backdrop-blur-xl border border-white/[0.03] rounded-2xl px-5 py-3 text-center">
                  <div className="text-lg font-black text-white">{stat.value}</div>
                  <div className="text-[8px] text-white/20 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 mb-4">
          <VCTicker />
        </div>

        <div className="mt-6">
          <TierList />
        </div>

        <footer className="mt-32 pb-16 border-t border-white/[0.05] pt-16">
          <div className="flex flex-col items-center gap-12">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12">
              <a 
                href="https://x.com/OG_Cryptooo" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-[11px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all duration-500 flex items-center gap-2"
              >
                <Twitter className="w-3 h-3 text-opinion-orange" />
                CREATOR: OG_CRYPTOOO
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-opinion-orange group-hover:w-full transition-all duration-500" />
              </a>
              <a 
                href="https://x.com/OG_Cryptooo" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-[11px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all duration-500"
              >
                DEVELOPER: OG_CRYPTOOO
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-opinion-orange group-hover:w-full transition-all duration-500" />
              </a>
            </div>
            
            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] hover:text-opinion-orange/30 transition-colors duration-700 cursor-default">
              © 2026 PERP DEX HUB — SYSTEM ONLINE
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
