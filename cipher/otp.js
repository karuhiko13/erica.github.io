// otp.js

let generatedKey = '';

// Function to generate a random key
function generateKey() {
    const messageInput = document.getElementById('message');
    const keyInput = document.getElementById('key');

    const messageLength = messageInput.value.length;
    generatedKey = '';

    // Generate a random key of equal or greater length than the message
    for (let i = 0; i < messageLength; i++) {
        const randomCharCode = Math.floor(Math.random() * 26) + 65; // Generate a random uppercase letter ASCII code (65-90)
        generatedKey += String.fromCharCode(randomCharCode);
    }

    keyInput.value = generatedKey;
}

// Function to encrypt the message using the OTP
function encrypt() {
    const messageInput = document.getElementById('message');
    const keyInput = document.getElementById('key');
    const outputTextarea = document.getElementById('output');

    const message = messageInput.value;
    const key = keyInput.value;

    if (key.length < message.length) {
        alert('Key length must be equal or longer than the message!');
        return;
    }

    let encryptedText = '';

    // Perform OTP encryption
    for (let i = 0; i < message.length; i++) {
        const messageCharCode = message.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i);
        const encryptedCharCode = (messageCharCode + keyCharCode) % 26; // Modulo 26 to wrap around the alphabet

        encryptedText += String.fromCharCode(encryptedCharCode + 65); // Convert encrypted char code to uppercase letter
    }

    outputTextarea.value = encryptedText;
}

// Function to decrypt the message using the OTP
function decrypt() {
    const keyInput = document.getElementById('key');
    const outputTextarea = document.getElementById('output');

    const message = outputTextarea.value;
    const key = keyInput.value;

    if (key.length < message.length) {
        alert('Key length must be equal or longer than the message!');
        return;
    }

    let decryptedText = '';

    // Perform OTP decryption
    for (let i = 0; i < message.length; i++) {
        const messageCharCode = message.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i);
        const decryptedCharCode = (messageCharCode - keyCharCode + 26) % 26; // Modulo 26 to wrap around the alphabet

        decryptedText += String.fromCharCode(decryptedCharCode + 65); // Convert decrypted char code to uppercase letter
    }

    outputTextarea.value = decryptedText;
    keyInput.value = '';

    generatedKey = ''; // Clear the generated key
}


// Function to reset the input fields and output textarea
function reset() {
    const messageInput = document.getElementById('message');
    const keyInput = document.getElementById('key');
    const outputTextarea = document.getElementById('output');

    messageInput.value = '';
    keyInput.value = '';
    outputTextarea.value = '';
    generatedKey = '';
}
