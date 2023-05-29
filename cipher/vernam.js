// Function to perform Vernam cipher encryption
function encrypt() {
    var message = document.getElementById("message").value;
    var key = document.getElementById("key").value;
    var output = "";

    // Check if the key has been used before
    if (sessionStorage.getItem("usedKey") === key) {
        alert("Error: The key has already been used.");
        return;
    }

    // Check if key length is at least as long as the message
    if (key.length < message.length) {
        alert("Error: The key length should be equal to or greater than the message length.");
        return;
    }

    // Encrypt the message using Vernam cipher
    for (var i = 0; i < message.length; i++) {
        var messageChar = message.charCodeAt(i) - 97; // Convert to 0-25 range
        var keyChar = key.charCodeAt(i % key.length) - 97; // Convert to 0-25 range
        var encryptedChar = String.fromCharCode((messageChar + keyChar) % 26 + 97); // Convert back to ASCII
        output += encryptedChar;
    }

    // Store the used key in session storage
    sessionStorage.setItem("usedKey", key);

    // Display the encrypted message
    document.getElementById("output").value = output;
}

// Function to perform Vernam cipher decryption
function decrypt() {
    var encryptedMessage = document.getElementById("message").value;
    var key = document.getElementById("key").value;
    var output = "";

    // Check if the key has been used before
    if (sessionStorage.getItem("usedKey") === key) {
        alert("Error: The key has already been used.");
        return;
    }

    // Check if key length is at least as long as the encrypted message
    if (key.length < encryptedMessage.length) {
        alert("Error: The key length should be equal to or greater than the encrypted message length.");
        return;
    }

    // Decrypt the message using Vernam cipher
    for (var i = 0; i < encryptedMessage.length; i++) {
        var encryptedChar = encryptedMessage.charCodeAt(i) - 97; // Convert to 0-25 range
        var keyChar = key.charCodeAt(i % key.length) - 97; // Convert to 0-25 range
        var decryptedChar = String.fromCharCode((encryptedChar - keyChar + 26) % 26 + 97); // Convert back to ASCII
        output += decryptedChar;
    }

    // Store the used key in session storage
    sessionStorage.setItem("usedKey", key);

    // Display the decrypted message
    document.getElementById("output").value = output;
}

// Function to reset the form and clear session storage
function reset() {
    document.getElementById("message").value = "";
    document.getElementById("key").value = "";
    document.getElementById("output").value = "";
    sessionStorage.removeItem("usedKey");
}
