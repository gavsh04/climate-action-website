/*
 * ===================================================
 * ais.js – JavaScript for the Action Impact Simulator
 * SDG 3: Good Health & Well-being
 * Team: HLTHY | University of Westminster 2025/26
 * Spec ref: Section 4.5 (Student 2)
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
// (royalty-free Unsplash URLs)
var backgrounds = {
  none:   'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&q=80',   // neutral gym
  low:    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80', // calm meditation
  medium: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80', // healthy food
  high:   'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80'  // energy/running
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
    msgEl.textContent   = 'Select actions above to calculate your personal health impact.';
    // Background: neutral
    wrapper.style.backgroundImage = 'url(' + backgrounds.none + ')';

  } else if (score >= 1 && score <= 7) {
    // LOW IMPACT (1–7 points)
    levelEl.textContent = '🌱 Low Impact';
    levelEl.style.color = '#e65100';
    msgEl.textContent   = 'You\'ve made a start — every small action matters. Try selecting a few more to build healthier habits.';
    // Background image A – calm / beginner
    wrapper.style.backgroundImage = 'url(' + backgrounds.low + ')';

  } else if (score >= 8 && score <= 14) {
    // MEDIUM IMPACT (8–14 points)
    levelEl.textContent = '⚡ Medium Impact';
    levelEl.style.color = '#f57f17';
    msgEl.textContent   = 'Great effort! You\'re making meaningful progress toward SDG 3. Keep building on these habits to reach high impact.';
    // Background image B – healthy food / growth
    wrapper.style.backgroundImage = 'url(' + backgrounds.medium + ')';

  } else {
    // HIGH IMPACT (15+ points)
    levelEl.textContent = '🌟 High Impact';
    levelEl.style.color = '#2e7d32';
    msgEl.textContent   = 'Outstanding commitment! Your actions collectively contribute to better health outcomes for yourself and inspire those around you. You are living SDG 3!';
    // Background image C – energetic / running
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
