// =================================================================
// Stock-Keeper UI Prototype V3 - State Management
// Empty, Loading, Error state toggles for demo
// =================================================================

let emptyStates = { home: false, detail: false, search: false };
let loadingState = false;
let errorState = false;

/**
 * Helper to manage button state by title
 * @param {string} title - Button data-title attribute
 * @param {boolean} isActive - Active state
 */
function setButtonState(title, isActive) {
    const btn = document.querySelector(`.state-btn[data-title="${title}"]`);
    if (btn) {
        btn.classList.toggle('active', isActive);
    }
}

/**
 * Toggle empty state for a screen
 * @param {string} screen - Screen name (home, detail, search)
 * @param {HTMLElement} btnElement - Button element that triggered the toggle
 */
function toggleEmptyState(screen, btnElement) {
    emptyStates[screen] = !emptyStates[screen];
    const isOn = emptyStates[screen];

    // Toggle active class on button
    if (btnElement) {
        btnElement.classList.toggle('active', isOn);
    }

    if (screen === 'home') {
        const content = document.querySelector('#screen-home .portfolio-section');
        const summary = document.querySelector('#screen-home .home-summary');
        const emptyEl = document.getElementById('home-empty-state');
        const fab = document.querySelector('#screen-home .fab');

        if (content) content.style.display = isOn ? 'none' : '';
        if (summary) summary.style.display = isOn ? 'none' : '';
        if (emptyEl) emptyEl.style.display = isOn ? 'flex' : 'none';
        if (fab) fab.style.display = isOn ? 'none' : '';

        if (isOn) {
            loadingState = false;
            errorState = false;
            setButtonState('로딩 상태', false);
            setButtonState('에러 상태', false);

            document.getElementById('home-loading-state').style.display = 'none';
            document.getElementById('home-error-state').style.display = 'none';
        }
    } else if (screen === 'detail') {
        const summary = document.querySelector('#screen-detail .detail-summary');
        const stocks = document.querySelector('#screen-detail .stocks-section');
        const actions = document.querySelector('#screen-detail .detail-actions');
        const emptyEl = document.getElementById('detail-empty-state');

        if (summary) summary.style.display = isOn ? 'none' : '';
        if (stocks) stocks.style.display = isOn ? 'none' : '';
        if (actions) actions.style.display = isOn ? 'none' : '';
        if (emptyEl) emptyEl.style.display = isOn ? 'flex' : 'none';
    } else if (screen === 'search') {
        const results = document.querySelector('#screen-search .search-results');
        const emptyEl = document.getElementById('search-empty-state');

        if (results) results.style.display = isOn ? 'none' : '';
        if (emptyEl) emptyEl.style.display = isOn ? 'flex' : 'none';
    }

    showToast(`${screen} Empty: ${isOn ? 'ON' : 'OFF'}`);
}

/**
 * Toggle loading state (home screen only)
 * @param {HTMLElement} btnElement - Button element that triggered the toggle
 */
function toggleLoadingState(btnElement) {
    loadingState = !loadingState;
    const isOn = loadingState;

    // Toggle active class on button
    if (btnElement) {
        btnElement.classList.toggle('active', isOn);
    }

    const homeContent = document.querySelector('#screen-home .portfolio-section');
    const homeSummary = document.querySelector('#screen-home .home-summary');
    const homeLoading = document.getElementById('home-loading-state');
    const fab = document.querySelector('#screen-home .fab');

    if (homeContent) homeContent.style.display = isOn ? 'none' : '';
    if (homeSummary) homeSummary.style.display = isOn ? 'none' : '';
    if (homeLoading) homeLoading.style.display = isOn ? 'block' : 'none';
    if (fab) fab.style.display = isOn ? 'none' : '';

    if (isOn) {
        emptyStates.home = false;
        errorState = false;
        setButtonState('홈 Empty State', false);
        setButtonState('에러 상태', false);

        const emptyEl = document.getElementById('home-empty-state');
        const errorEl = document.getElementById('home-error-state');
        if (emptyEl) emptyEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'none';
    }

    showToast(`Loading: ${isOn ? 'ON' : 'OFF'}`);
}

/**
 * Toggle error state (home screen only)
 * @param {HTMLElement} btnElement - Button element that triggered the toggle
 */
function toggleErrorState(btnElement) {
    errorState = !errorState;
    const isOn = errorState;

    if (btnElement) btnElement.classList.toggle('active', isOn);

    const homeContent = document.querySelector('#screen-home .portfolio-section');
    const homeSummary = document.querySelector('#screen-home .home-summary');
    const homeError = document.getElementById('home-error-state');
    const fab = document.querySelector('#screen-home .fab');

    if (homeContent) homeContent.style.display = isOn ? 'none' : '';
    if (homeSummary) homeSummary.style.display = isOn ? 'none' : '';
    if (homeError) homeError.style.display = isOn ? 'flex' : 'none';
    if (fab) fab.style.display = isOn ? 'none' : '';

    if (isOn) {
        emptyStates.home = false;
        loadingState = false;

        // Sync visuals
        setButtonState('홈 Empty State', false);
        setButtonState('로딩 상태', false);

        const emptyEl = document.getElementById('home-empty-state');
        const loadingEl = document.getElementById('home-loading-state');
        if (emptyEl) emptyEl.style.display = 'none';
        if (loadingEl) loadingEl.style.display = 'none';
    }

    showToast(`Error: ${isOn ? 'ON' : 'OFF'}`);
}
