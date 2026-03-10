
/**
 * CMC Community Post Generator
 * This script generates viral-style posts for CoinMarketCap Community 
 * based on the projects in your Hub.
 */

const PROJECTS = [
  { name: 'Variational Omni', ticker: '$OMNI', tier: 'S', investment: '$11.8M' },
  { name: 'Nado', ticker: '$NADO', tier: 'S', investment: 'Ink L2' },
  { name: 'Liquid', ticker: '$LIQUID', tier: 'S', investment: '$7.6M' },
  { name: 'Ostium', ticker: '$OSTIUM', tier: 'S', investment: '$27.8M' },
  { name: 'Reya Network', ticker: '$REYA', tier: 'S', investment: '$19M' },
  { name: 'Based.one', ticker: '$BASED', tier: 'A', investment: '$15.2M' },
  { name: 'Extended', ticker: '$EXTENDED', tier: 'A', investment: '$6.5M' }
];

const TEMPLATES = [
  (p) => `🚀 ${p.ticker} is looking extremely bullish! 
  
Tier ${p.tier} project with ${p.investment} backing. The Perp DEX narrative is just starting to heat up. Don't miss the next big thing in DeFi.
  
👇 Check my BIO for the full list of +10,000$ potential airdrops and referral links! 💎`,

  (p) => `Why everyone is sleeping on ${p.ticker}? 😴
  
Institutional grade infrastructure, Tier ${p.tier} status. This is where the real money is moving in 2026. 
  
🔗 Full alpha & direct access in my profile links. +10K$ Potential! 💎🔥`,

  (p) => `New Gem Alert: ${p.ticker} 💎
  
Perp trading is evolving and ${p.name} is leading the charge. Backed by top VCs. 
  
Check the Hub in my BIO for all elite perp projects in one place! 👆🔥`
];

function generatePosts() {
  console.log("--- CMC COMMUNITY POSTS GENERATOR --- \n");
  
  PROJECTS.forEach(project => {
    const randomTemplate = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
    console.log(`Project: ${project.name}`);
    console.log(randomTemplate(project));
    console.log("\n-----------------------------------\n");
  });
}

generatePosts();
