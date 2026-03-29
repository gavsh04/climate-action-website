/*
  ================================================
  sitemap.js
  JavaScript for the Sitemap page (sitemap.html)
  Student 4: Dinura — Climate Action Website
  ================================================

  FEATURES:
  1. mouseover / mouseout  — visual highlight (opacity + strokeWidth)
  2. focus / blur          — same as hover for keyboard users
  3. keydown               — Enter or Space activates the link
  4. Info panel update     — on hover, reads data-desc attribute and
                             displays the node description in the
                             #info-panel at the bottom of the SVG
  5. Current-page marker   — the "Sitemap" node gets extra styling
                             applied on load to highlight it

  NOTE: CSS also provides hover effects (brightness filter).
        This JS layer is required by the coursework specification
        to demonstrate JavaScript event listeners for interactivity.
  ================================================
*/

/* Wait for the DOM to fully load before attaching events */
document.addEventListener("DOMContentLoaded", function () {

  /* ──────────────────────────────────────────────
     SELECT ALL SITEMAP NODES
     Every clickable group uses the class "sitemap-node"
  ────────────────────────────────────────────── */
  var nodes = document.querySelectorAll(".sitemap-node");

  /* Reference to the info panel text element */
  var infoText = document.getElementById("info-text");

  /* Default message shown when no node is hovered */
  var defaultMsg = "\u2139\uFE0F Hover over any node to see its description here.";


  /* ──────────────────────────────────────────────
     HELPER: applyHighlight
     Applies the hover visual style to a node's rect.
  ────────────────────────────────────────────── */
  function applyHighlight(node) {
    var rect = node.querySelector("rect");
    if (rect) {
      rect.style.opacity = "0.80";
      rect.style.strokeWidth = "3.5";
    }
  }

  /* ──────────────────────────────────────────────
     HELPER: removeHighlight
     Restores a node's rect to its default style.
  ────────────────────────────────────────────── */
  function removeHighlight(node) {
    var rect = node.querySelector("rect");
    if (rect) {
      rect.style.opacity = "1";
      /* Restore original stroke width.
         The current-node (.sitemap-node.current-node) uses an
         animated strokeWidth via CSS; we do not override it here. */
      rect.style.strokeWidth = "2";
    }
  }

  /* ──────────────────────────────────────────────
     HELPER: showInfo
     Reads the node's data-desc attribute and displays
     it in the SVG info panel at the bottom.
  ────────────────────────────────────────────── */
  function showInfo(node) {
    if (!infoText) return;
    var desc = node.getAttribute("data-desc");
    if (desc) {
      infoText.textContent = "\u2139\uFE0F " + desc;
    }
  }

  /* ──────────────────────────────────────────────
     HELPER: clearInfo
     Resets the info panel to the default message.
  ────────────────────────────────────────────── */
  function clearInfo() {
    if (infoText) {
      infoText.textContent = defaultMsg;
    }
  }


  /* ──────────────────────────────────────────────
     ATTACH EVENT LISTENERS TO EVERY NODE
  ────────────────────────────────────────────── */
  nodes.forEach(function (node) {

    /* ---- mouseover: highlight + show description ---- */
    node.addEventListener("mouseover", function () {
      applyHighlight(node);
      showInfo(node);
    });

    /* ---- mouseout: restore + clear description ---- */
    node.addEventListener("mouseout", function () {
      removeHighlight(node);
      clearInfo();
    });

    /* ---- focus (Tab key): same behaviour as hover ---- */
    node.addEventListener("focus", function () {
      applyHighlight(node);
      showInfo(node);
    });

    /* ---- blur (Tab away): restore ---- */
    node.addEventListener("blur", function () {
      removeHighlight(node);
      clearInfo();
    });

    /* ---- keydown: Enter or Space activates the link ---- */
    node.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        /* Prevent Space from scrolling the page */
        event.preventDefault();
        /* Find the wrapping <a> element and trigger a click */
        var link = node.closest("a");
        if (link) {
          link.click();
        }
      }
    });

  }); // end forEach


  /* ──────────────────────────────────────────────
     CURRENT PAGE INDICATOR
     The "Sitemap" node has class "current-node".
     On load, we briefly flash its stroke to draw
     the user's attention to their current location.
  ────────────────────────────────────────────── */
  var currentNode = document.querySelector(".current-node");
  if (currentNode) {
    var currentRect = currentNode.querySelector("rect");
    if (currentRect) {
      /* Flash the stroke colour once on page load */
      currentRect.style.stroke = "#FFD600";
      currentRect.style.strokeWidth = "4";
      /* After 1.2 seconds, let the CSS pulse animation take over */
      setTimeout(function () {
        currentRect.style.stroke = "";
        currentRect.style.strokeWidth = "";
      }, 1200);
    }
  }


}); // end DOMContentLoaded
