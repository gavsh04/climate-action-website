//SPLASH SCREEN JAVASCRIPT

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

