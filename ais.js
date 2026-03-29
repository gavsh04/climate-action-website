/*
 * ===================================================
 * ais.js – JavaScript for the Action Impact Simulator
 *
 * Impact thresholds:
 *   Low    =  1 – 7  points
 *   Medium =  8 – 14 points
 *   High   = 15+     points
 * ===================================================
 */

// Array tracking which cards are selected (true/false)
var selected = [false, false, false, false, false, false];

// Background images for each impact level
// (royalty-free Unsplash URLs – Climate Action themed)
// Photo credits via Unsplash:
//   none   – Dikaseva (grey city skyline)
//   low    – Markus Spiske (lone green seedling)
//   medium – Appolinary Kalashnikova (wind turbines at sunset)
//   high   – Arnaud Mesureur (lush green forest aerial)
var backgrounds = {
  none:   'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80',  // grey city skyline
  low:    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1600&q=80',  // lone green seedling
  medium: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80',  // wind turbines at sunset
  high:   'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80'   // lush green forest aerial
};

/*
 * toggleCard(index)
 * Selects or deselects a card and updates the feedback panel.
 */
function toggleCard(index) {
  // Toggle selected state
  selected[index] = !selected[index];

  var card = document.getElementById('card-' + index);

  if (selected[index]) {
    card.classList.add('selected');
    card.setAttribute('aria-checked', 'true');
  } else {
    card.classList.remove('selected');
    card.setAttribute('aria-checked', 'false');
  }

  // Recalculate total after every toggle
  updateFeedback();
}

/*
 * handleKey(event, index)
 * Allows keyboard users (Enter/Space) to select cards.
 */
function handleKey(event, index) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    toggleCard(index);
  }
}

/*
 * calculateScore()
 * Returns total impact points of all selected cards.
 */
function calculateScore() {
  var total = 0;
  var cards = document.querySelectorAll('.action-card');
  for (var i = 0; i < cards.length; i++) {
    if (selected[i]) {
      // Read points from data attribute
      total += parseInt(cards[i].getAttribute('data-points'), 10);
    }
  }
  return total;
}

/*
 * updateFeedback()
 * Updates score display, impact level label, message,
 * and background image based on current score.
 */
function updateFeedback() {
  var score = calculateScore();

  // Update score number
  document.getElementById('score-display').textContent = score;

  var levelEl = document.getElementById('impact-level');
  var msgEl   = document.getElementById('impact-message');
  var wrapper = document.getElementById('ais-wrapper');

  // Determine impact level and update UI accordingly
  if (score === 0) {
    // No actions selected
    levelEl.textContent = 'No actions selected yet';
    levelEl.style.color = '#333';
    msgEl.textContent   = 'Select actions above to calculate your personal climate impact.';
    // Background: neutral grey city
    wrapper.style.backgroundImage = 'url(' + backgrounds.none + ')';

  } else if (score >= 1 && score <= 7) {
    // LOW IMPACT (1–7 points)
    levelEl.textContent = '🌱 Low Impact';
    levelEl.style.color = '#e65100';
    msgEl.textContent   = 'Every green action counts — you\'ve planted the seed. Try selecting a few more to amplify your climate impact.';
    // Background image A – lone seedling / early effort
    wrapper.style.backgroundImage = 'url(' + backgrounds.low + ')';

  } else if (score >= 8 && score <= 14) {
    // MEDIUM IMPACT (8–14 points)
    levelEl.textContent = '⚡ Medium Impact';
    levelEl.style.color = '#f57f17';
    msgEl.textContent   = 'Great effort! You\'re making a meaningful contribution to SDG 13. Keep building these habits to reach high impact.';
    // Background image B – wind turbines / renewable energy
    wrapper.style.backgroundImage = 'url(' + backgrounds.medium + ')';

  } else {
    // HIGH IMPACT (15+ points)
    levelEl.textContent = '🌍 High Impact';
    levelEl.style.color = '#2e7d32';
    msgEl.textContent   = 'Outstanding commitment! Your daily actions are actively fighting climate change and inspiring those around you. You are living SDG 13!';
    // Background image C – lush green forest / thriving planet
    wrapper.style.backgroundImage = 'url(' + backgrounds.high + ')';
  }
}

/*
 * resetAll()
 * Deselects all cards and resets feedback panel.
 */
function resetAll() {
  for (var i = 0; i < selected.length; i++) {
    selected[i] = false;
    var card = document.getElementById('card-' + i);
    card.classList.remove('selected');
    card.setAttribute('aria-checked', 'false');
  }
  updateFeedback();
}

// Initialise feedback on page load
updateFeedback();
