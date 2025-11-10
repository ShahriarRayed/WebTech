// Wait for the HTML document to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", function() {

    const form = document.querySelector('form');

    // Feature 1: Form Validation on Submit
    form.addEventListener('submit', function(event) {
        // Prevent the form from submitting by default
        event.preventDefault(); 
        
        if (validateForm()) {
            // If validation passes, you would typically submit the form
            // For this example, we'll just show an alert
            alert("Form is valid! Submitting...");
            // form.submit(); // Uncomment this line to allow actual submission
        }
    });

    function validateForm() {
        // Use querySelector to find elements by their 'name' attribute
        const firstName = document.querySelector('input[name="fname"]').value;
        const lastName = document.querySelector('input[name="lname"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const donationAmount = document.querySelector('input[name="amount"]:checked');

        if (!firstName || !lastName || !email || !donationAmount) {
            alert("Please fill in all required fields.");
            return false;
        }

        // Feature 2: Email Validation
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        return true; // All checks passed
    }

    // Email Validation Function (no changes needed)
    function validateEmail(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    // Feature 3: Donation Amount Check
    const otherAmountField = document.getElementById('other_amount_input');
    document.querySelectorAll('input[name="amount"]').forEach((radioButton) => {
        radioButton.addEventListener('change', function() {
            if (this.value === 'other') {
                otherAmountField.style.display = 'inline-block'; // Show the field
            } else {
                otherAmountField.style.display = 'none'; // Hide the field
            }
        });
    });

    // Feature 4: Recurring Donation Fields
    document.querySelector('input[name="recurring"]').addEventListener('change', function() {
        // Fixed: HTML class is '.recurring', not '.recurring-fields'
        const recurringFields = document.querySelector('.recurring'); 
        if (this.checked) {
            recurringFields.style.display = 'block'; // Or 'flex', 'grid' depending on CSS
        } else {
            recurringFields.style.display = 'none';
        }
    });

    // Feature 5: Select State and Country Default Options
    // This runs once the window is loaded
    window.onload = function() {
        // Note: This selects the FIRST select[name="state"] on the page
        document.querySelector('select[name="state"]').value = "Dhaka";
        document.querySelector('select[name="country"]').value = "Bangladesh";
    };

    // Feature 6: Password fields were removed, as they are not in the HTML.

    // Feature 7: Reset Button Logic
    const resetButton = document.querySelector('button[type="reset"]');
    resetButton.addEventListener('click', function(event) { // Added 'event'
        const confirmation = confirm("Are you sure you want to reset the form?");
        if (!confirmation) {
            event.preventDefault(); // Prevents the form from resetting
        }
    });

    // Feature 8: Show/Hide Additional Fields (Honorarium)
    // Fixed: Selector was 'donation_radio', HTML is 'honorType'
    document.querySelectorAll('input[name="honorType"]').forEach((radioButton) => {
        radioButton.addEventListener('change', function() {
            // Fixed: Selector was 'getElementById('name')', HTML is 'name="honoree"'
            const nameField = document.querySelector('input[name="honoree"]');
            
            // Fixed: Check 'value' attribute, not 'id'
            if (this.value === 'honor') {
                nameField.placeholder = "Name to honor";
            } else if (this.value === 'memory') {
                nameField.placeholder = "Name in memory of";
            }
        });
    });

    // Feature 9: Character Limit on Comments
    // Fixed: Selector was 'getElementById("comments")', HTML is 'name="comments"'
    document.querySelector('textarea[name="comments"]').addEventListener('input', function() {
        const charLimit = 200;
        const currentLength = this.value.length;
        if (currentLength > charLimit) {
            alert("Character limit (200) reached!");
            this.value = this.value.substring(0, charLimit);
        }
    });

    // Feature 10: Calculate Recurring Donation Total
    // This feature was buggy; it added a new line on every keystroke.
    // This is a fixed version. Let's add a <span> in the HTML to show the total.
    
    // First, add this to your HTML in the .recurring div:
    // <p>Total: $<span id="recurring_total">0</span></p>
    // Since we can't edit the HTML directly, this code will create and add it.
    
    const recurringDiv = document.querySelector('.recurring');
    const totalElement = document.createElement('p');
    totalElement.innerHTML = 'Total: $<span id="recurring_total">0</span>';
    recurringDiv.appendChild(totalElement);
    const totalSpan = document.getElementById('recurring_total');

    const monthlyAmountInput = document.querySelector('input[name="monthlyAmount"]');
    const monthsInput = document.querySelector('input[name="months"]');

    function calculateTotal() {
        const monthlyAmount = parseFloat(monthlyAmountInput.value) || 0;
        const months = parseInt(monthsInput.value) || 0;
        const total = monthlyAmount * months;
        totalSpan.textContent = total.toFixed(2); // Show total with 2 decimal places
    }

    // Calculate total when either field changes
    monthlyAmountInput.addEventListener('input', calculateTotal);
    monthsInput.addEventListener('input', calculateTotal);

});