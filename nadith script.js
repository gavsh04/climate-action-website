 const messageBox = document.getElementById('message');
    const charCounter = document.getElementById('charCounter');

    messageBox.addEventListener('input', function () {
        const maxLen = parseInt(messageBox.getAttribute('maxlength'));
        const remaining = maxLen - messageBox.value.length;
        charCounter.textContent = remaining + ' characters remaining';

        // Warn user when nearly at the limit
        if (remaining <= 50) {
            charCounter.style.color = '#c0392b';
        } else {
            charCounter.style.color = '#888';
        }
    });


    // -------------------------------------------------------
    // 2. FORM VALIDATION AND SUBMISSION
    // Checks fields, shows error messages, confirms on success
    // -------------------------------------------------------
    const feedbackForm = document.getElementById('feedbackForm');

    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default browser submit

        let isValid = true; // Track overall validity

        // Helper: show or hide an error message
        function showError(errorId, inputId, show) {
            const errorEl = document.getElementById(errorId);
            const inputEl = document.getElementById(inputId);
            if (show) {
                errorEl.style.display = 'block';
                inputEl.classList.add('input-error');
                isValid = false;
            } else {
                errorEl.style.display = 'none';
                inputEl.classList.remove('input-error');
            }
        }

        // Validate Full Name (must not be empty)
        const nameVal = document.getElementById('fullName').value.trim();
        showError('nameError', 'fullName', nameVal === '');

        // Validate Email (basic pattern check)
        const emailVal = document.getElementById('emailAddr').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        showError('emailError', 'emailAddr', !emailPattern.test(emailVal));

        // Validate programme selection
        const selectVal = document.getElementById('programSelect').value;
        showError('selectError', 'programSelect', selectVal === '');

        // Validate date field
        const dateVal = document.getElementById('visitDate').value;
        showError('dateError', 'visitDate', dateVal === '');

        // Validate message (at least 20 characters)
        const msgVal = messageBox.value.trim();
        showError('msgError', 'message', msgVal.length < 20);

        // If all valid, show confirmation message
        if (isValid) {
            // Populate confirmation with user's name and selected programme
            document.getElementById('confirmName').textContent = nameVal;
            const selectEl = document.getElementById('programSelect');
            const programName = selectEl.options[selectEl.selectedIndex].text;
            document.getElementById('confirmProgram').textContent = programName;

            // Show confirmation and hide the form
            document.getElementById('confirmMsg').style.display = 'block';
            feedbackForm.style.display = 'none';

            // Scroll to confirmation message
            document.getElementById('confirmMsg').scrollIntoView({ behavior: 'smooth' });
        }
    });