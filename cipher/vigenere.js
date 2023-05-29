function encode() {
    var message = document.getElementById("message").value;
    var key = document.getElementById("key").value;

    if (!isValidKey(key)) {
        // Show error message
        alert("Error: The key should only contain keywords, words, or letters. Special characters, symbols, or numbers are not allowed.");
        return;
    }

    var encodedText = vigenereCipher(message, key, false);
    document.getElementById("output").value = encodedText;
}

function decode() {
    var message = document.getElementById("message").value;
    var key = document.getElementById("key").value;

    if (!isValidKey(key)) {
        // Show error message
        alert("Error: The key should only contain keywords, words, or letters. Special characters, symbols, or numbers are not allowed.");
        return;
    }

    var decodedText = vigenereCipher(message, key, true);
    document.getElementById("output").value = decodedText;
}

function vigenereCipher(text, key, decode = false) {
    var result = "";
    var keyIndex = 0;
    var keyLength = key.length;
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        if (char.match(/[a-z]/i)) {
            var code = text.charCodeAt(i);
            var keyChar = key[keyIndex % keyLength];
            var keyCharCode = keyChar.charCodeAt(0);
            var baseCharCode = char === char.toUpperCase() ? 65 : 97;
            var shift = decode ? (26 - (keyCharCode - baseCharCode)) % 26 : (keyCharCode - baseCharCode) % 26;

            var shiftedCharCode = ((code - baseCharCode + shift) % 26) + baseCharCode;

            // Check the original case of the character and convert it accordingly
            if (char === char.toUpperCase()) {
                char = String.fromCharCode(shiftedCharCode).toUpperCase();
            } else {
                char = String.fromCharCode(shiftedCharCode).toLowerCase();
            }

            keyIndex++;
        }
        result += char;
    }
    return result;
}



function reset() {
    document.getElementById("message").value = "";
    document.getElementById("key").value = "";
    document.getElementById("output").value = "";
}

function isValidKey(key) {
    // Regex pattern to check if the key contains only keywords, words, or letters
    var pattern = /^[a-zA-Z\s]+$/;
    return pattern.test(key);
}
