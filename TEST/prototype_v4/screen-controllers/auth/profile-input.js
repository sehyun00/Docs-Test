// =================================================================
// Stock-Keeper UI Prototype V4 - Profile Input Screen Controller
// Auth Domain
// =================================================================

let state = {
    nickname: '',
    investmentStyle: 'neutral', // conservative, neutral, aggressive
    isLoading: false,
};

/**
 * Initialize profile input screen
 */
export function initProfileInputScreen() {
    const screen = document.getElementById('screen-profile-input');
    if (!screen) return;

    // Nickname input
    const nicknameInput = screen.querySelector('#nickname-input');
    if (nicknameInput) {
        nicknameInput.addEventListener('input', handleNicknameInput);
    }

    // Investment style toggle buttons
    const toggleBtns = screen.querySelectorAll('.toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => handleStyleSelect(btn));
    });

    // Submit button
    const submitBtn = screen.querySelector('#profile-submit-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmit);
    }

    // Back button
    const backBtn = screen.querySelector('#profile-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', handleBackClick);
    }

    // Modal buttons
    const cancelBtn = screen.querySelector('#logout-cancel-btn');
    const confirmBtn = screen.querySelector('#logout-confirm-btn');
    const modalClose = screen.querySelector('.modal-close');

    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    if (confirmBtn) confirmBtn.addEventListener('click', handleLogout);
    if (modalClose) modalClose.addEventListener('click', closeModal);

    console.log('[ProfileInput] Screen initialized');
}

/**
 * Handle nickname input
 * @param {Event} e - Input event
 */
function handleNicknameInput(e) {
    const value = e.target.value;
    state.nickname = value;

    // Update character counter
    const counter = document.getElementById('nickname-count');
    if (counter) {
        counter.textContent = value.length;
    }

    // Update submit button state
    updateSubmitButton();
}

/**
 * Handle investment style selection
 * @param {HTMLElement} btn - Clicked button
 */
function handleStyleSelect(btn) {
    // Remove selected from all
    document.querySelectorAll('.toggle-btn').forEach(b => {
        b.classList.remove('selected');
    });

    // Add selected to clicked
    btn.classList.add('selected');
    state.investmentStyle = btn.dataset.value;

    console.log('[ProfileInput] Style selected:', state.investmentStyle);
}

/**
 * Update submit button disabled state
 */
function updateSubmitButton() {
    const submitBtn = document.getElementById('profile-submit-btn');
    if (submitBtn) {
        submitBtn.disabled = state.nickname.trim().length === 0;
    }
}

/**
 * Handle submit button click
 */
async function handleSubmit() {
    if (state.isLoading || !state.nickname.trim()) return;

    showLoading(true);
    console.log('[ProfileInput] Submitting profile:', state);

    // Simulate API call
    await delay(1500);

    showLoading(false);
    console.log('[ProfileInput] Profile saved successfully');
    // In real app: navigate to home
}

/**
 * Handle back button click
 */
function handleBackClick() {
    const modal = document.getElementById('logout-confirm-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Close logout confirmation modal
 */
function closeModal() {
    const modal = document.getElementById('logout-confirm-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Handle logout confirmation
 */
function handleLogout() {
    closeModal();
    console.log('[ProfileInput] User logged out');
    // In real app: clear tokens and navigate to login
}

/**
 * Show/hide loading overlay
 * @param {boolean} show - Whether to show loading
 */
function showLoading(show) {
    state.isLoading = show;

    const overlay = document.getElementById('profile-loading-overlay');
    if (overlay) {
        overlay.classList.toggle('hidden', !show);
    }

    // Disable inputs during loading
    const nicknameInput = document.getElementById('nickname-input');
    const submitBtn = document.getElementById('profile-submit-btn');
    const toggleBtns = document.querySelectorAll('.toggle-btn');

    if (nicknameInput) nicknameInput.disabled = show;
    if (submitBtn) submitBtn.disabled = show;
    toggleBtns.forEach(btn => { btn.disabled = show; });
}

/**
 * Utility: delay for simulation
 * @param {number} ms - Milliseconds to delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Set profile input screen state (for control panel)
 * @param {string} stateId - State ID (loading)
 */
export function setProfileInputState(stateId) {
    switch (stateId) {
        case 'loading':
            showLoading(true);
            break;
        default:
            showLoading(false);
    }
}

/**
 * Get profile input screen state
 */
export function getProfileInputState() {
    return { ...state };
}
