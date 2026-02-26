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
  tier: 'S' | 'A' | 'B';
  description: string;
  investment?: string;
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
    tags: ['Aggregator', 'Non-custodial', 'Unified UI'],
    logo: '/logos/liquid.jpg'
  },
  {
    id: 'ostium',
    name: 'Ostium',
    url: 'https://ostium.app/trade?ref=WZIGP',
    twitter: 'https://x.com/OstiumLabs',
    tier: 'S',
    description: 'RWA Perpetual DEX on Arbitrum. Trade gold, oil, FX, and stocks with up to 200x leverage. Top-tier project in its niche.',
    investment: '$27.8M (Jump Crypto, General Catalyst, Coinbase Ventures)',
    otcPrice: '~$0.003 / point',
    tags: ['RWA', 'Arbitrum', 'Series A'],
    logo: '/logos/ostium.jpg'
  },
  {
    id: 'reya',
    name: 'Reya Network',
    url: 'https://app.reya.xyz/trade?referredBy=kh4deiqw',
    twitter: 'https://x.com/reya_xyz',
    tier: 'S',
    description: 'High-performance trading L2. Institutional-grade liquidity and the fastest order execution on the market.',
    investment: '$19M (Coinbase Ventures, Amber Group, Framework)',
    otcPrice: '$0.032 (Whales Market)',
    tags: ['L2', 'Ethereum', 'Amber Group'],
    logo: 'https://app.reya.xyz/favicon.ico'
  },
  {
    id: 'based',
    name: 'Based.one',
    url: 'https://app.based.one/r/OGETH',
    twitter: 'https://x.com/BasedOneX',
    tier: 'A',
    description: 'Next-gen trading platform on Base. Early access with social trading mechanics.',
    investment: '$15.2M (Pantera Capital, Coinbase Ventures, Wintermute)',
    tags: ['Base', 'Early Access', 'Social'],
    logo: 'https://app.based.one/favicon.ico'
  },
  {
    id: 'extended',
    name: 'Extended',
    url: 'https://app.extended.exchange/join/EXTENDED2026',
    twitter: 'https://x.com/extendedapp',
    tier: 'A',
    description: 'Starknet DEX powered by ZK-Rollups. High performance and ultra-low fees for active traders.',
    investment: '$6.5M (cyber Fund, Semantic, StarkWare)',
    tags: ['Starknet', 'ZK-Rollup', 'StarkWare'],
    logo: '/logos/extended.jpg'
  },
  {
    id: 'hibachi',
    name: 'Hibachi',
    url: 'https://hibachi.xyz/r/7QXRZUZ4VQ',
    twitter: 'https://x.com/hibachi_xyz',
    tier: 'A',
    description: 'Global market on Hyperliquid L1 (HIP-3). Trade any asset 24/7 in a decentralized environment.',
    investment: '$5M (Dragonfly, Circle Ventures, Electric Capital)',
    tags: ['Hyperliquid', 'HIP-3', 'L1'],
    logo: '/logos/hibachi.jpg'
  },
  {
    id: 'o1',
    name: 'O1 Exchange',
    url: 'https://o1.exchange/@ogeth',
    twitter: 'https://x.com/o1_exchange',
    tier: 'A',
    description: 'StarkEx-powered DEX. CEX-like speed with full blockchain security and transparency.',
    investment: '$4.2M (Coinbase Ventures, Alliance DAO)',
    tags: ['StarkEx', 'Amber Group', 'ZK-Proofs'],
    logo: 'https://o1.exchange/favicon.ico'
  },
  {
    id: 'ethereal',
    name: 'Ethereal',
    url: 'https://app.ethereal.trade/?ref=PAT4YX3841A3',
    twitter: 'https://x.com/etherealdex',
    tier: 'A',
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
    tier: 'A',
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

const Card = ({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
      className={cn(
        "group relative h-full flex flex-col bg-card-bg/80 backdrop-blur-md border border-white/[0.03] rounded-[2rem] p-8 hover:border-opinion-orange/40 transition-all duration-700 orange-border-glow overflow-hidden",
        index < 3 && "border-opinion-orange/20 bg-opinion-orange/[0.02]"
      )}
    >
      <div className={cn(
        "absolute top-0 right-0 w-32 h-32 blur-3xl -z-10 transition-all duration-700",
        index < 3 ? "bg-opinion-orange/15" : "bg-opinion-orange/5 group-hover:bg-opinion-orange/10"
      )} />
      
      {index < 3 && (
        <div className="absolute top-6 right-6 z-20">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-opinion-orange text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-opinion-orange/20">
            <Trophy className="w-3 h-3" />
            TOP {index + 1}
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-8 gap-4 min-h-[80px]">
        <div className="flex items-start gap-5 min-w-0 flex-1">
          <div className={cn(
            "w-20 h-20 rounded-2xl bg-white/[0.03] flex items-center justify-center overflow-hidden border border-white/[0.05] transition-all duration-700 shadow-2xl p-2 shrink-0",
            index < 3 ? "border-opinion-orange/40" : "group-hover:border-opinion-orange/40"
          )}>
            {project.logo ? (
              <img 
                src={project.logo} 
                alt={project.name} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${project.name}&background=FF5F1F&color=fff`;
                }}
              />
            ) : (
              <Zap className="w-10 h-10 text-opinion-orange animate-pulse" />
            )}
          </div>
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-2xl font-black group-hover:text-opinion-orange transition-colors duration-500 leading-none py-1">
                {project.name}
              </h3>
              <div className="flex items-center gap-2 shrink-0">
                {project.twitter && (
                  <a 
                    href={project.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/[0.03] hover:bg-opinion-orange/20 text-white/20 hover:text-opinion-orange transition-all duration-300 border border-white/[0.05]"
                  >
                    <Twitter className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.tier === 'S' && (
                  <div className="relative">
                    <Trophy className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-yellow-500/20 blur-md rounded-full -z-10" 
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={cn(
                "text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-[0.15em] border transition-all duration-500",
                project.tier === 'S' ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/30 group-hover:bg-yellow-500/20" :
                project.tier === 'A' ? "bg-opinion-orange/10 text-opinion-orange border-opinion-orange/30 group-hover:bg-opinion-orange/20" :
                "bg-white/5 text-white/40 border-white/10 group-hover:bg-white/10"
              )}>
                Tier {project.tier}
              </span>
              {project.tags.slice(0, 2).map(tag => (
                <span key={tag} className="text-[10px] px-3 py-1 rounded-lg bg-white/[0.02] text-white/30 font-bold uppercase tracking-[0.1em] border border-white/[0.05] group-hover:text-white/50 transition-colors duration-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          {index >= 3 && (
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-white/[0.03] hover:bg-opinion-orange text-white/20 hover:text-white transition-all duration-500 border border-white/[0.05] hover:border-opinion-orange/50 hover:shadow-[0_0_20px_rgba(255,95,31,0.3)] group/btn"
            >
              <ExternalLink className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            </a>
          )}
        </div>
      </div>

      <div className="flex-1">
        <p className="text-[14px] text-white/50 mb-8 leading-[1.6] font-medium line-clamp-3 group-hover:text-white/70 transition-colors duration-500 min-h-[66px]">
          {project.description}
        </p>
      </div>

      <div className="space-y-4 pt-6 border-t border-white/[0.03] min-h-[120px]">
        {project.investment && (
          <div className="flex items-start gap-3.5 text-[12px] text-white/40">
            <div className="p-2 rounded-lg bg-opinion-orange/5 text-opinion-orange group-hover:bg-opinion-orange/10 transition-colors duration-500">
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <span className="block font-black text-white/20 uppercase tracking-[0.2em] text-[9px]">CryptoRank Stats</span>
              <span className="leading-snug block font-bold text-white/60 group-hover:text-white/80 transition-colors duration-500 line-clamp-2">{project.investment}</span>
            </div>
          </div>
        )}
        {project.otcPrice && (
          <div className="flex items-start gap-3.5 text-[12px] text-white/40">
            <div className="p-2 rounded-lg bg-opinion-orange/5 text-opinion-orange group-hover:bg-opinion-orange/10 transition-colors duration-500">
              <Activity className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <span className="block font-black text-white/20 uppercase tracking-[0.2em] text-[9px]">Market Price (OTC)</span>
              <span className="text-opinion-orange font-mono font-black text-sm tracking-tight">{project.otcPrice}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative group/farm overflow-hidden block w-full py-5 px-6 rounded-2xl text-center text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 active:scale-[0.98]",
            index < 3 
              ? "bg-white text-opinion-orange hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]" 
              : "bg-opinion-orange text-white hover:shadow-[0_0_40px_rgba(255,95,31,0.5)]"
          )}
        >
          <div className={cn(
            "absolute inset-0 translate-y-full group-hover/farm:translate-y-0 transition-transform duration-500",
            index < 3 ? "bg-opinion-orange/10" : "bg-white/20"
          )} />
          <span className="relative z-10 flex items-center justify-center gap-3">
            Join the Farm <Rocket className="w-4 h-4 group-hover/farm:translate-x-1 group-hover/farm:-translate-y-1 transition-transform duration-500" />
          </span>
        </a>
      </div>
    </motion.div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505] selection:bg-opinion-orange selection:text-white font-space">
      <FallingAirdrop />
      
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-opinion-orange/15 blur-[180px] rounded-full opacity-40 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-opinion-orange/10 blur-[180px] rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <main className="max-w-7xl mx-auto px-6 py-8 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-left space-y-2"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.05em] leading-[0.85] text-white">
              PERP <span className="text-gradient inline-block hover:skew-x-[-2deg] transition-transform duration-700 cursor-default">DEX</span><br/>
              <span className="text-white/10 tracking-[0.05em] sm:tracking-[0.1em]">HUB</span>
            </h1>
            <p className="text-xs sm:text-sm font-black uppercase tracking-[0.4em] text-white/30">
              Institutional Trading Access
            </p>
          </motion.div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-opinion-orange/30 blur-2xl rounded-full -z-10" />
              <div className="flex items-center gap-4 px-6 py-2.5 rounded-2xl bg-opinion-orange/10 border border-opinion-orange/40 text-opinion-orange font-black text-[10px] sm:text-xs tracking-[0.3em] orange-glow transition-all duration-700 hover:scale-105 hover:bg-opinion-orange/20 cursor-default uppercase">
                <TrendingUp className="w-4 h-4" />
                Airdrop +10,000$ 💎
              </div>
            </motion.div>
            
            <div className="flex gap-4">
              {[
                { label: 'Projects', value: PROJECTS.length, icon: Layers },
                { label: 'Elite S', value: PROJECTS.filter(p => p.tier === 'S').length, icon: Trophy },
              ].map((stat, i) => (
                <div key={stat.label} className="bg-card-bg/40 backdrop-blur-xl border border-white/[0.03] rounded-2xl px-5 py-3 text-center">
                  <div className="text-lg font-black text-white">{stat.value}</div>
                  <div className="text-[8px] text-white/20 font-black uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROJECTS.map((project, index) => (
            <Card key={project.id} project={project} index={index} />
          ))}
        </div>

        <footer className="mt-32 pb-16 border-t border-white/[0.05] pt-16">
          <div className="flex flex-col items-center gap-12">
            <div className="flex justify-center items-center">
              <a 
                href="https://x.com/Alex_devvv" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-[11px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all duration-500"
              >
                Twitter
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
