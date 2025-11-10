// Feature 1: Form Validation
function validateForm() {
  const firstName = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
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
 
  return true;
}
 
// Email Validation Function
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}
 
// Feature 3: Donation Amount Check
document.querySelectorAll('input[name="amount"]').forEach((radioButton) => {
  radioButton.addEventListener('change', function() {
    const otherAmountField = document.getElementById('other_amount');
    if (this.value === 'Other') {
      otherAmountField.style.display = 'block';
    } else {
      otherAmountField.style.display = 'none';
    }
  });
});
 
// Feature 4: Recurring Donation Fields
document.querySelector('input[name="recurring"]').addEventListener('change', function() {
  const recurringFields = document.querySelector('.recurring-fields');
  if (this.checked) {
    recurringFields.style.display = 'block';
  } else {
    recurringFields.style.display = 'none';
  }
});
 
// Feature 5: Select State and Country Default Options
window.onload = function() {
  document.querySelector('select[name="state"]').value = "Dhaka";
  document.querySelector('select[name="country"]').value = "Bangladesh";
};
 
// Feature 6: Confirm Password (If Needed)
function validatePassword() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;
 
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }
}
 
// Feature 7: Reset Button Logic
const resetButton = document.querySelector('button[type="reset"]');
resetButton.addEventListener('click', function() {
  const confirmation = confirm("Are you sure you want to reset the form?");
  if (!confirmation) {
    event.preventDefault();
  }
});
 
// Feature 8: Show/Hide Additional Fields
document.querySelectorAll('input[name="donation_radio"]').forEach((radioButton) => {
  radioButton.addEventListener('change', function() {
    const nameField = document.getElementById('name');
    if (this.id === 'to_honor') {
      nameField.placeholder = "Name to honor";
    } else if (this.id === 'in_memory_of') {
      nameField.placeholder = "Name in memory of";
    }
  });
});
 
// Feature 9: Character Limit on Comments
document.getElementById("comments").addEventListener('input', function() {
  const charLimit = 200;
  const currentLength = this.value.length;
  if (currentLength > charLimit) {
    alert("Character limit reached!");
    this.value = this.value.substring(0, charLimit);
  }
});
 
// Feature 10: Calculate Recurring Donation Total
document.querySelector('input[name="monthly_amount"]').addEventListener('input', function() {
  const monthlyAmount = parseFloat(this.value) || 0;
  const months = parseInt(document.querySelector('input[name="months"]').value) || 0;
  const total = monthlyAmount * months;
 
  const totalElement = document.createElement('p');
  totalElement.textContent = `Total donation for ${months} months: $${total}`;
  document.querySelector('.recurring-fields').appendChild(totalElement);
});