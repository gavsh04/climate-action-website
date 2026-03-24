document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adds the 'active' class defined in your style.css
                entry.target.classList.add("active");
                // Stop observing once the element is visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15 // Triggers when 15% of the element is visible
    });

    revealElements.forEach(el => revealObserver.observe(el));
});

// Back to Top Smooth Scroll
const goTopBtn = document.getElementById("go-top");
if (goTopBtn) {
    goTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}