// Declare the string to reverse
var str = "JavaScript";
 
// Initialize an empty string to store the reversed string
var reversedStr = "";
 
// Loop through the string starting from the last character
for (var i = str.length - 1; i >= 0; i--) {
  reversedStr += str[i]; // Append each character to reversedStr
}
 
// Output the reversed string to the page
document.getElementById("output").textContent = "Reversed string is: " + reversedStr;