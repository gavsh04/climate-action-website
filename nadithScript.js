/* 
           1. LIVE CHARACTER COUNTER
           Updates the counter span as the user types in the textarea.
 */
        const commentField = document.getElementById('commentMsg');
        const charCountSpan = document.getElementById('charCount');

        commentField.addEventListener('input', function () {
            const used = this.value.length;
            charCountSpan.textContent = used;

            // Warn user when approaching limit
            if (used >= 270) {
                charCountSpan.style.color = '#c62828';
            } else {
                charCountSpan.style.color = '#777';
            }
        });


        /* 
           2. HELPER – Show or hide an error message and highlight field
           @param {string} fieldId  – the input/textarea id
           @param {string} errorId  – the error <span> id
           @param {boolean} show    – true to show error, false to hide
         */
        function setError(fieldId, errorId, show) {
            const field = document.getElementById(fieldId);
            const errorEl = document.getElementById(errorId);

            if (show) {
                errorEl.style.display = 'block';
                field.classList.add('input-error');
            } else {
                errorEl.style.display = 'none';
                field.classList.remove('input-error');
            }
        }


        /* 
           3. FORM VALIDATION (JavaScript-enhanced)
           .
       */
        function validateForm() {
            let isValid = true;

            // --- Full Name (must not be empty) ---
            const name = document.getElementById('fullName').value.trim();
            if (name === '') {
                setError('fullName', 'err-name', true);
                isValid = false;
            } else {
                setError('fullName', 'err-name', false);
            }

            // --- Email (HTML type="email" handles format; check it's not empty) ---
            const email = document.getElementById('emailAddr').value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('emailAddr', 'err-email', true);
                isValid = false;
            } else {
                setError('emailAddr', 'err-email', false);
            }

            // --- Programme selection (must not be the blank option) ---
            const prog = document.getElementById('programme').value;
            if (prog === '') {
                setError('programme', 'err-programme', true);
                isValid = false;
            } else {
                setError('programme', 'err-programme', false);
            }

            // --- Date (must not be empty) ---
            const visitDate = document.getElementById('visitDate').value;
            if (visitDate === '') {
                setError('visitDate', 'err-date', true);
                isValid = false;
            } else {
                setError('visitDate', 'err-date', false);
            }

            // --- Comment (must be at least 10 characters) ---
            const comment = document.getElementById('commentMsg').value.trim();
            if (comment.length < 10) {
                setError('commentMsg', 'err-comment', true);
                isValid = false;
            } else {
                setError('commentMsg', 'err-comment', false);
            }

            return isValid;
        }


        /* 
           4. SUBMISSION HANDLER
           
         */
        function submitFeedback() {
            // Hide any previous confirmation message
            document.getElementById('confirmation-msg').style.display = 'none';

            const valid = validateForm();

            if (valid) {
                // Show personalised confirmation message
                const userName = document.getElementById('fullName').value.trim();
                document.getElementById('confirm-name').textContent = userName;
                document.getElementById('confirmation-msg').style.display = 'block';

                // Scroll confirmation into view
                document.getElementById('confirmation-msg').scrollIntoView({ behavior: 'smooth' });

                // Disable submit button to prevent duplicate submissions
                const btn = document.getElementById('submitBtn');
                btn.textContent = 'Submitted ✓';
                btn.disabled = true;
                btn.style.background = '#888';
                btn.style.cursor = 'default';
            }
        }


        /* 
           5. REAL-TIME INLINE VALIDATION
           
         */
        document.getElementById('fullName').addEventListener('blur', function () {
            setError('fullName', 'err-name', this.value.trim() === '');
        });

        document.getElementById('emailAddr').addEventListener('blur', function () {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setError('emailAddr', 'err-email', !emailRegex.test(this.value.trim()));
        });

        document.getElementById('programme').addEventListener('change', function () {
            setError('programme', 'err-programme', this.value === '');
        });

        document.getElementById('visitDate').addEventListener('change', function () {
            setError('visitDate', 'err-date', this.value === '');
        });

        document.getElementById('commentMsg').addEventListener('blur', function () {
            setError('commentMsg', 'err-comment', this.value.trim().length < 10);
        });