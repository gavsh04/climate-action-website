/*
  ================================================
  sitemap.js
  JavaScript for the Sitemap page (sitemap.html)
  Student 4: Dinura — Climate Action Website
  ================================================

  PURPOSE:
  Adds JavaScript-controlled hover and focus event listeners
  to all SVG sitemap nodes. This fulfils the requirement that
  hover interaction logic is handled by JavaScript event listeners,
  not CSS-only techniques.
  ================================================
*/

/* Wait for the DOM to fully load before running any code */
document.addEventListener("DOMContentLoaded", function () {

  // Select all SVG node groups (they all have the class "sitemap-node")
  var nodes = document.querySelectorAll(".sitemap-node");

  // Loop through each node and attach event listeners
  nodes.forEach(function (node) {

    // Get the rect element inside this node group
    var rect = node.querySelector("rect");
    // Store the original fill colour so we can restore it on mouseout
    var originalFill = rect ? rect.getAttribute("fill") : null;

    /* ------ mouseover: lighten the node fill colour ------ */
    node.addEventListener("mouseover", function () {
      if (rect) {
        // Slightly brighten by shifting to a lighter shade via inline style
        rect.style.opacity = "0.80";
        rect.style.strokeWidth = "3";
      }
    });

    /* ------ mouseout: restore the original appearance ------ */
    node.addEventListener("mouseout", function () {
      if (rect) {
        rect.style.opacity = "1";
        rect.style.strokeWidth = "2";
      }
    });

    /* ------ focus (keyboard navigation): same as hover ------ */
    node.addEventListener("focus", function () {
      if (rect) {
        rect.style.opacity = "0.80";
        rect.style.strokeWidth = "3";
      }
    });

    /* ------ blur (keyboard navigation): restore ------ */
    node.addEventListener("blur", function () {
      if (rect) {
        rect.style.opacity = "1";
        rect.style.strokeWidth = "2";
      }
    });

    /* ------ keydown: allow Enter key to activate the link ------ */
    node.addEventListener("keydown", function (event) {
      // Enter key (keyCode 13) or Space (keyCode 32)
      if (event.key === "Enter" || event.key === " ") {
        // Find the parent <a> element and click it
        var link = node.closest("a");
        if (link) {
          link.click();
        }
      }
    });

  }); // end forEach

}); // end DOMContentLoaded
