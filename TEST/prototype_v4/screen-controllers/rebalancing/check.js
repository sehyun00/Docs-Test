// =================================================================
// Stock-Keeper UI Prototype V4 - Rebalancing Check Controller
// Rebalancing Domain
// =================================================================

import { navigateTo, goBack } from '../../core/navigation.js';

// Dummy Data
const REBALANCE_DATA = {
    totalBuy: 1622500,
    totalSell: 596000,
    netAmount: 1026500, // + means need more money
    suggestions: [
        { type: 'sell', name: '삼성전자', current: 35, target: 30, qty: -8, amount: 596000 },
        { type: 'buy', name: '카카오', current: 12, target: 15, qty: 20, amount: 974000 },
        { type: 'buy', name: 'LG에너지솔루션', current: 8, target: 10, qty: 2, amount: 648500 }
        // ... more items if needed
    ],
    isBalanced: false
};

export function init() {
    console.log('[RebalancingCheck] Initializing...');
    render(REBALANCE_DATA);
    attachListeners();
}

function render(data) {
    if (data.isBalanced) {
        document.getElementById('rebalance-suggestions').style.display = 'none';
        document.getElementById('rebalance-ok-state').style.display = 'block';
    } else {
        document.getElementById('rebalance-suggestions').style.display = 'block';
        document.getElementById('rebalance-ok-state').style.display = 'none';

        // Summary
        setText('total-buy-amount', `₩${data.totalBuy.toLocaleString()}`);
        setText('total-sell-amount', `₩${data.totalSell.toLocaleString()}`);
        setText('net-amount', `₩${Math.abs(data.netAmount).toLocaleString()}`);

        const netEl = document.querySelector('.summary-value.net-buy'); // Default class
        if (netEl) {
            // Logic to switch class if negative? 
            // In design, netAmount > 0 means "Need to buy more" -> Spend Money. 
            // Wait, net-buy class color is success(red)? 
            // Usually "Minus My Money" is bad? Or "Investment Opportunity"?
            // Let's stick to v3 design: net-buy
        }

        // Suggestions
        // For prototype, HTML hardcoded suggestions are fine, or we can dynamic render.
        // Let's keep hardcoded HTML for now as per v3 copy, but in real app we render 'data.suggestions'
    }
}

function attachListeners() {
    document.getElementById('rebalance-back-btn')?.addEventListener('click', () => goBack());

    document.getElementById('rebalance-setting-btn')?.addEventListener('click', () => {
        alert('임계값 설정 모달 (추후 구현)');
    });

    document.getElementById('copy-result-btn')?.addEventListener('click', copyResult);
}

function copyResult() {
    // Mock copy
    const btn = document.getElementById('copy-result-btn');
    const originalText = btn.innerHTML;

    btn.innerHTML = '<span class="copy-icon">✅</span> 복사 완료!';
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 2000);

    console.log('Results copied to clipboard');
}

function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}
