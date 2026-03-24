/*
  ================================================
  profile.js
  JavaScript for the User Profile page (profile.html)
  Student 4: Dinura — Climate Action Website
  ================================================

  FEATURES IMPLEMENTED:
  - 3 steps, each with 3+ prompts (JavaScript prompt())
  - Progressive profile display via DOM manipulation
  - Profile completion progress bar
  - Skip individual prompts or entire steps
  - Revisit previously skipped steps
  - Variables and objects to store profile data
  - Functions to organise logic
  - Conditional logic for step progression
  ================================================
*/

/* -----------------------------------------------
   DATA STORAGE
   profileData object stores all collected answers.
   stepStatus tracks whether each step was started/completed.
   answeredCounts tracks how many prompts were answered per step.
----------------------------------------------- */
var profileData = {
  step1: { name: null, username: null, location: null },
  step2: { sdgInterest: null, preferredContent: null, weeklyTime: null },
  step3: { actionTaken: null, goal: null, commitment: null }
};

// stepStatus values: "pending", "partial", "complete", "skipped"
var stepStatus = { 1: "pending", 2: "pending", 3: "pending" };

// Count how many prompts were answered per step (for progress calculation)
var answeredCounts = { 1: 0, 2: 0, 3: 0 };

// Total prompts per step (3 each)
var totalPromptsPerStep = 3;

/* -----------------------------------------------
   FUNCTION: startProfile
   Entry point — runs the next pending or partial step.
----------------------------------------------- */
function startProfile() {
  // Find the first step that is not yet "complete"
  var nextStep = null;
  for (var i = 1; i <= 3; i++) {
    if (stepStatus[i] !== "complete") {
      nextStep = i;
      break;
    }
  }

  if (nextStep === null) {
    // All steps are already complete
    setStatus("Your profile is already complete! Use 'Revisit' buttons to update any step.");
    return;
  }

  runStep(nextStep);
}

/* -----------------------------------------------
   FUNCTION: runStep
   Runs the prompts for a given step number (1, 2, or 3).
   Uses confirm() to let the user skip an entire step.
----------------------------------------------- */
function runStep(stepNum) {
  // Ask user if they want to do this step or skip it
  var stepNames = { 1: "Basic Details", 2: "Climate Interests", 3: "Actions & Commitments" };
  var doStep = confirm("Ready for Step " + stepNum + ": " + stepNames[stepNum] + "?\n\nClick OK to continue or Cancel to skip this step.");

  if (!doStep) {
    // User chose to skip the entire step
    if (stepStatus[stepNum] !== "complete") {
      stepStatus[stepNum] = "skipped";
    }
    setStatus("Step " + stepNum + " skipped. You can revisit it later.");
    updateProgress();
    // Enable the revisit button for this step
    enableRevisitButton(stepNum);
    // Move on to the next step automatically
    runNextAfterStep(stepNum);
    return;
  }

  // Run the appropriate step
  if (stepNum === 1) {
    runStep1();
  } else if (stepNum === 2) {
    runStep2();
  } else if (stepNum === 3) {
    runStep3();
  }
}

/* -----------------------------------------------
   FUNCTION: runStep1
   Step 1 — Basic Details
   Collects: name, username, location
----------------------------------------------- */
function runStep1() {
  var count = 0;

  // Prompt 1: Name
  var name = prompt("Step 1 of 3 — Basic Details\n\nWhat is your full name?\n(Press Cancel to skip this question)");
  if (name !== null && name.trim() !== "") {
    profileData.step1.name = name.trim();
    count++;
  }

  // Prompt 2: Username
  var username = prompt("Step 1 of 3 — Basic Details\n\nChoose a username for your Climate Action profile:\n(Press Cancel to skip)");
  if (username !== null && username.trim() !== "") {
    profileData.step1.username = username.trim();
    count++;
  }

  // Prompt 3: Location
  var location = prompt("Step 1 of 3 — Basic Details\n\nWhat city or country are you based in?\n(Press Cancel to skip)");
  if (location !== null && location.trim() !== "") {
    profileData.step1.location = location.trim();
    count++;
  }

  // Update answered count
  answeredCounts[1] = count;

  // Mark step as complete (even if some prompts were skipped — user went through the step)
  stepStatus[1] = "complete";

  // Display the section in the profile output
  displaySection1();
  updateProgress();
  enableRevisitButton(1);

  setStatus("Step 1 complete! " + count + " out of 3 questions answered. Moving to Step 2...");

  // Automatically move to Step 2 after a short delay effect
  runNextAfterStep(1);
}

/* -----------------------------------------------
   FUNCTION: runStep2
   Step 2 — Climate Interests
   Collects: SDG interest, preferred content type, weekly time commitment
----------------------------------------------- */
function runStep2() {
  var count = 0;

  // Prompt 1: SDG Interest
  var sdgInterest = prompt("Step 2 of 3 — Climate Interests\n\nWhich climate topic interests you most?\n(e.g. Ocean Health, Renewable Energy, Deforestation, Air Quality)\n\nPress Cancel to skip");
  if (sdgInterest !== null && sdgInterest.trim() !== "") {
    profileData.step2.sdgInterest = sdgInterest.trim();
    count++;
  }

  // Prompt 2: Preferred content type
  var preferredContent = prompt("Step 2 of 3 — Climate Interests\n\nHow do you prefer to learn about climate action?\n(e.g. Videos, Articles, Podcasts, Infographics)\n\nPress Cancel to skip");
  if (preferredContent !== null && preferredContent.trim() !== "") {
    profileData.step2.preferredContent = preferredContent.trim();
    count++;
  }

  // Prompt 3: Weekly time
  var weeklyTime = prompt("Step 2 of 3 — Climate Interests\n\nHow many minutes per week can you dedicate to climate action activities?\n(e.g. 30, 60, 120)\n\nPress Cancel to skip");
  if (weeklyTime !== null && weeklyTime.trim() !== "") {
    profileData.step2.weeklyTime = weeklyTime.trim() + " mins";
    count++;
  }

  answeredCounts[2] = count;
  stepStatus[2] = "complete";

  displaySection2();
  updateProgress();
  enableRevisitButton(2);

  setStatus("Step 2 complete! " + count + " out of 3 questions answered. Moving to Step 3...");

  runNextAfterStep(2);
}

/* -----------------------------------------------
   FUNCTION: runStep3
   Step 3 — Actions & Commitments
   Collects: action taken, goal, commitment pledge
----------------------------------------------- */
function runStep3() {
  var count = 0;

  // Prompt 1: Action already taken
  var actionTaken = prompt("Step 3 of 3 — Actions & Commitments\n\nName one climate-friendly action you already take in your daily life:\n(e.g. Using reusable bags, cycling to university, reducing meat intake)\n\nPress Cancel to skip");
  if (actionTaken !== null && actionTaken.trim() !== "") {
    profileData.step3.actionTaken = actionTaken.trim();
    count++;
  }

  // Prompt 2: Climate goal
  var goal = prompt("Step 3 of 3 — Actions & Commitments\n\nWhat is one climate goal you want to achieve this year?\n(e.g. Reduce my carbon footprint by 20%, Go plastic-free at home)\n\nPress Cancel to skip");
  if (goal !== null && goal.trim() !== "") {
    profileData.step3.goal = goal.trim();
    count++;
  }

  // Prompt 3: Commitment pledge
  var commitment = prompt("Step 3 of 3 — Actions & Commitments\n\nComplete this sentence: 'I commit to helping climate action by...'\n\nPress Cancel to skip");
  if (commitment !== null && commitment.trim() !== "") {
    profileData.step3.commitment = commitment.trim();
    count++;
  }

  answeredCounts[3] = count;
  stepStatus[3] = "complete";

  displaySection3();
  updateProgress();
  enableRevisitButton(3);

  setStatus("All steps complete! Your Climate Action Profile has been built. 🌍");

  // Show the confirmation box if all 3 steps are done
  checkAllComplete();
}

/* -----------------------------------------------
   FUNCTION: runNextAfterStep
   Determines which step to run next after completing/skipping one.
----------------------------------------------- */
function runNextAfterStep(currentStep) {
  if (currentStep < 3) {
    var next = currentStep + 1;
    if (stepStatus[next] !== "complete") {
      runStep(next);
    }
  } else {
    checkAllComplete();
  }
}

/* -----------------------------------------------
   FUNCTION: revisitStep
   Allows user to redo a previously completed or skipped step.
----------------------------------------------- */
function revisitStep(stepNum) {
  var stepNames = { 1: "Basic Details", 2: "Climate Interests", 3: "Actions & Commitments" };
  var confirm1 = confirm("Revisit Step " + stepNum + ": " + stepNames[stepNum] + "?\n\nYour previous answers will be replaced. Click OK to continue.");
  if (!confirm1) return;

  // Reset this step's data
  if (stepNum === 1) {
    profileData.step1 = { name: null, username: null, location: null };
    runStep1();
  } else if (stepNum === 2) {
    profileData.step2 = { sdgInterest: null, preferredContent: null, weeklyTime: null };
    runStep2();
  } else if (stepNum === 3) {
    profileData.step3 = { actionTaken: null, goal: null, commitment: null };
    runStep3();
  }
}

/* -----------------------------------------------
   FUNCTION: resetProfile
   Clears all data and resets the page to its initial state.
----------------------------------------------- */
function resetProfile() {
  var confirmReset = confirm("Are you sure you want to reset your entire profile? All data will be lost.");
  if (!confirmReset) return;

  // Reset all data objects
  profileData = {
    step1: { name: null, username: null, location: null },
    step2: { sdgInterest: null, preferredContent: null, weeklyTime: null },
    step3: { actionTaken: null, goal: null, commitment: null }
  };
  stepStatus = { 1: "pending", 2: "pending", 3: "pending" };
  answeredCounts = { 1: 0, 2: 0, 3: 0 };

  // Hide all sections
  document.getElementById("section1").style.display = "none";
  document.getElementById("section2").style.display = "none";
  document.getElementById("section3").style.display = "none";
  document.getElementById("confirmationBox").style.display = "none";

  // Clear grids
  document.getElementById("grid1").innerHTML = "";
  document.getElementById("grid2").innerHTML = "";
  document.getElementById("grid3").innerHTML = "";

  // Reset progress bar
  updateProgress();

  // Disable revisit buttons
  disableAllRevisitButtons();

  setStatus("Profile has been reset. Click 'Start / Continue Profile' to begin again.");
}

/* -----------------------------------------------
   DOM DISPLAY FUNCTIONS
   These functions update the page content without reloading.
----------------------------------------------- */

/* Display Step 1 section */
function displaySection1() {
  var grid = document.getElementById("grid1");
  grid.innerHTML = buildCard("Full Name", profileData.step1.name) +
                   buildCard("Username", profileData.step1.username) +
                   buildCard("Location", profileData.step1.location);
  document.getElementById("section1").style.display = "block";
}

/* Display Step 2 section */
function displaySection2() {
  var grid = document.getElementById("grid2");
  grid.innerHTML = buildCard("SDG Interest", profileData.step2.sdgInterest) +
                   buildCard("Preferred Content", profileData.step2.preferredContent) +
                   buildCard("Weekly Time", profileData.step2.weeklyTime);
  document.getElementById("section2").style.display = "block";
}

/* Display Step 3 section */
function displaySection3() {
  var grid = document.getElementById("grid3");
  grid.innerHTML = buildCard("Action I Take", profileData.step3.actionTaken) +
                   buildCard("My Goal", profileData.step3.goal) +
                   buildCard("My Commitment", profileData.step3.commitment);
  document.getElementById("section3").style.display = "block";
}

/* -----------------------------------------------
   HELPER: buildCard
   Returns HTML string for a single profile data card.
   If value is null (skipped), shows "Not provided".
----------------------------------------------- */
function buildCard(label, value) {
  var display = (value !== null && value !== "") ? value : "<em style='color:#aaa;'>Not provided</em>";
  return '<div class="profile-card">' +
           '<div class="label">' + label + '</div>' +
           '<div class="value">' + display + '</div>' +
         '</div>';
}

/* -----------------------------------------------
   FUNCTION: updateProgress
   Calculates the overall completion percentage and updates
   the progress bar and step counter text via DOM manipulation.

   Logic:
   - Each step has 3 prompts = 9 total prompts across 3 steps
   - Only "complete" steps count toward the answered total
   - A skipped step contributes 0 answered prompts
----------------------------------------------- */
function updateProgress() {
  var totalAnswered = 0;
  var completedSteps = 0;

  for (var i = 1; i <= 3; i++) {
    if (stepStatus[i] === "complete") {
      totalAnswered += answeredCounts[i];
      completedSteps++;
    }
  }

  // Max possible answers = 9 (3 steps × 3 prompts)
  var maxTotal = 9;
  var percentage = Math.round((totalAnswered / maxTotal) * 100);

  // Update progress bar width and label
  var bar = document.getElementById("progressBar");
  bar.style.width = percentage + "%";
  bar.textContent = percentage + "%";

  // Update step counter
  document.getElementById("stepCounter").textContent =
    "Step " + completedSteps + " of 3 completed (" + totalAnswered + "/" + maxTotal + " questions answered)";
}

/* -----------------------------------------------
   FUNCTION: checkAllComplete
   Shows the confirmation box if all 3 steps are complete.
----------------------------------------------- */
function checkAllComplete() {
  if (stepStatus[1] === "complete" && stepStatus[2] === "complete" && stepStatus[3] === "complete") {
    document.getElementById("confirmationBox").style.display = "block";
  }
}

/* -----------------------------------------------
   HELPER: setStatus
   Updates the status message paragraph in the profile output.
----------------------------------------------- */
function setStatus(message) {
  document.getElementById("statusMsg").textContent = message;
}

/* -----------------------------------------------
   HELPER: enableRevisitButton / disableAllRevisitButtons
   Enables or disables the revisit buttons for each step.
----------------------------------------------- */
function enableRevisitButton(stepNum) {
  var btn = document.getElementById("revisitBtn" + stepNum);
  if (btn) {
    btn.disabled = false;
  }
}

function disableAllRevisitButtons() {
  for (var i = 1; i <= 3; i++) {
    var btn = document.getElementById("revisitBtn" + i);
    if (btn) {
      btn.disabled = true;
    }
  }
}
