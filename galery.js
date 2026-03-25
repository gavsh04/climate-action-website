// ==============================
// GALLERY LIGHTBOX FUNCTIONALITY
// ==============================

document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const galleryModal = document.getElementById("galleryModal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDescription = document.getElementById("lightbox-description");
    const closeLightboxBtn = document.getElementById("closeLightbox");
    const themeToggleBtn = document.getElementById("themeToggle");
    const fontToggleBtn = document.getElementById("fontToggle");

    // Only run gallery logic if gallery elements exist
    if (!galleryItems.length || !galleryModal || !lightboxImg || !lightboxTitle || !lightboxDescription) {
        return;
    }

    // Opens the lightbox and fills it with the clicked item's data
    function openGalleryModal(item) {
        const title = item.getAttribute("data-title");
        const image = item.getAttribute("data-image");
        const description = item.getAttribute("data-description");

        lightboxImg.src = image;
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;

        galleryModal.style.display = "flex";
        galleryModal.setAttribute("aria-hidden", "false");
    }

    // Closes the lightbox
    function closeGalleryModal() {
        galleryModal.style.display = "none";
        galleryModal.setAttribute("aria-hidden", "true");
    }

    // Click event for each gallery item
    galleryItems.forEach(function (item) {
        item.addEventListener("click", function () {
            openGalleryModal(item);
        });

        // Hover interaction using JavaScript
        item.addEventListener("mouseenter", function () {
            item.style.transform = "scale(1.03)";
        });

        item.addEventListener("mouseleave", function () {
            item.style.transform = "scale(1)";
        });
    });

    // Close button
    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            closeGalleryModal();
        });
    }

    // Close modal when clicking outside the content
    galleryModal.addEventListener("click", function (event) {
        if (event.target === galleryModal) {
            closeGalleryModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && galleryModal.style.display === "flex") {
            closeGalleryModal();
        }
    });

    // Toggle colour scheme inside extended view
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            const currentBg = lightboxDescription.style.backgroundColor;

            if (currentBg === "rgb(232, 245, 233)") {
                lightboxDescription.style.backgroundColor = "#333333";
                lightboxDescription.style.color = "#ffffff";
                lightboxTitle.style.color = "#ffffff";
            } else {
                lightboxDescription.style.backgroundColor = "#E8F5E9";
                lightboxDescription.style.color = "#333333";
                lightboxTitle.style.color = "#2E7D32";
            }
        });
    }

    // Toggle font style inside extended view
    if (fontToggleBtn) {
        fontToggleBtn.addEventListener("click", function () {
            if (lightboxDescription.style.fontFamily === "Georgia, serif") {
                lightboxDescription.style.fontFamily = "Arial, sans-serif";
                lightboxTitle.style.fontFamily = "Arial, sans-serif";
            } else {
                lightboxDescription.style.fontFamily = "Georgia, serif";
                lightboxDescription.style.fontFamily = "Georgia, serif";
                lightboxTitle.style.fontFamily = "Georgia, serif";
            }
        });
    }
});