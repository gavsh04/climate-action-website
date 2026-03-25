/*
 * SPLASH SCREEN JAVASCRIPT
 * ─────────────────────────────────────────────
 * 1. Countdown timer – updates every second (4 → 3 → 2 → 1 → Redirecting now…)
 * 2. Auto-redirect – navigates to home.html after 4 seconds
 * 3. skipIntro()   – cancels the timer and redirects immediately
 * ─────────────────────────────────────────────
 */

// Store the auto-redirect timer ID so we can cancel it if the user skips
let redirectTimer;
let countdownValue = 4;
const countdownEl = document.getElementById('countdown');

// Update the countdown text every second
const countdownInterval = setInterval(function () {
    countdownValue--;
    if (countdownValue > 0) {
        countdownEl.textContent = 'Entering site in ' + countdownValue + '…';
    } else {
        countdownEl.textContent = 'Redirecting now…';
        clearInterval(countdownInterval);
    }
}, 1000);

// Auto-redirect using JavaScript (meta refresh tag in HTML acts as a backup)
redirectTimer = setTimeout(function () {
    window.location.href = 'home.html';
}, 4000);

// Skip Intro: cancel both timers and redirect immediately
function skipIntro() {
    clearTimeout(redirectTimer);
    clearInterval(countdownInterval);
    window.location.href = 'home.html';
}
//check line 28 and line 35 to link home page
