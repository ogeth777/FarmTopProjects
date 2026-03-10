
// ==UserScript==
// @name         CMC Community Auto-Shiller PRO
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Автоматический постинг в CMC Community
// @author       og.dev
// @match        https://coinmarketcap.com/community/*
// @grant        none
// ==UserScript==

(function() {
    'use strict';

    const HUB_PROMO = "Check the ELITE PERP HUB in my BIO for +10,000$ potential airdrops! 💎💎💎";
    const TRENDING_TICKERS = ["$BTC", "$ETH", "$SOL", "$CFG", "$ARC", "$TRENCH", "$BILL", "$WMTX", "$LGNS"];
    const THOUGHTS = [
        "This chart looks absolutely primed for a leg up! 📈",
        "Whales are accumulating here, don't miss the entry. 🐋",
        "Narrative is shifting, and this project is leading the charge! 🔥",
        "Institutional interest is growing by the day. Pure alpha. 💎",
        "Volume is spiking, big move incoming! 🚀",
        "One of the strongest setups I've seen this week. 🎯"
    ];

    const CTA_PHRASES = [
        "Full details and early access links in my BIO! 👆",
        "Don't trade alone, check the Hub in my profile. 🔥",
        "My top picks for 2026 are already live in the BIO! 💎",
        "Elite alpha and referral bonuses waiting in my profile. 🚀"
    ];

    function generateSmartPost() {
        const ticker = TRENDING_TICKERS[Math.floor(Math.random() * TRENDING_TICKERS.length)];
        const thought = THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
        const cta = CTA_PHRASES[Math.floor(Math.random() * CTA_PHRASES.length)];
        return `${ticker} ${thought} \n\n${cta} \n\n${HUB_PROMO}`;
    }

    async function postAction() {
        const postContent = generateSmartPost();
        console.log(`%c [CMC Shiller] Preparing Post: `, "color: #FF5F1F; font-weight: bold;");
        
        const editor = document.querySelector('.public-DraftEditor-content');
        if (editor) {
            editor.focus();
            document.execCommand('insertText', false, postContent);
            console.log("%c Text inserted! Sending in 3s... ", "color: #4CAF50;");
            
            setTimeout(() => {
                const buttons = document.querySelectorAll('button');
                const postBtn = Array.from(buttons).find(b => 
                    b.innerText.trim().toLowerCase() === 'post' || 
                    b.textContent.trim().toLowerCase() === 'post'
                );
                
                if (postBtn && !postBtn.disabled) {
                    postBtn.click();
                    console.log("%c Post Sent Successfully! ✅ ", "background: #4CAF50; color: white; padding: 2px 5px;");
                }
            }, 3000); 
        }
    }

    // Запуск цикла
    console.log("%c CMC PRO SHILLER (Userscript) ACTIVE! 💎 ", "background: #FF5F1F; color: white; font-size: 16px;");
    
    // Первый пост через 10 сек после загрузки страницы
    setTimeout(postAction, 10000);

    // Далее каждые 60-75 минут
    setInterval(() => {
        postAction();
    }, (60 + Math.random() * 15) * 60 * 1000);

})();
