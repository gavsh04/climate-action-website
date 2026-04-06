// ==============================
// SMOOTH SCROLL FOR HOME BUTTON
// ==============================

// Scrolls smoothly to the mission section if it exists
function scrollToMission() {
    const missionSection = document.getElementById("mission");

    if (missionSection) {
        missionSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ==============================
// ANIMATED NUMBER COUNTERS
// ==============================

// Animates numbers from start value to end value
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);

    // Stop if the element does not exist
    if (!obj) {
        return;
    }

    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepCount = Math.abs(range);

    // Prevent division by zero
    if (stepCount === 0) {
        obj.textContent = end;
        return;
    }

    const stepTime = Math.max(1, Math.floor(duration / stepCount));
    let current = start;

    const timer = setInterval(function () {
        current += increment;
        obj.textContent = current;

        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Run counter animations only if the stats exist
animateValue("trees", 0, 1000, 2000);
animateValue("volunteers", 0, 500, 2000);
animateValue("projects", 0, 120, 2000);


// ==============================
// SCROLL REVEAL ANIMATION
// ==============================

// Reveals elements when they enter the viewport
function reveal() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach(function (element) {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
}

// Run reveal on scroll
window.addEventListener("scroll", reveal);

// Run reveal once when page first loads
window.addEventListener("load", reveal);

const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('nav-list');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        // Toggle the 'active' class on the <ul>
        navList.classList.toggle('active');
    });
}

// Close menu if a link is clicked (optional)
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});