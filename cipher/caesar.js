function encode() {
    var message = document.getElementById("message").value;
    var shiftKey = parseInt(document.getElementById("shift-key").value);
    var encodedText = caesarCipher(message, shiftKey);
    document.getElementById("output").value = encodedText;
}

function decode() {
    var message = document.getElementById("message").value;
    var shiftKey = parseInt(document.getElementById("shift-key").value);
    var decodedText = caesarCipher(message, 26 - shiftKey);
    document.getElementById("output").value = decodedText;
}

function caesarCipher(text, shift) {
    var result = "";
    for (var i = 0; i < text.length; i++) {
        var char = text[i];
        if (char.match(/[a-z]/i)) {
            var code = text.charCodeAt(i);
            var isUpperCase = char === char.toUpperCase();
            var baseCode = isUpperCase ? 65 : 97;
            char = String.fromCharCode(((code - baseCode + shift) % 26) + baseCode);
        }
        result += char;
    }
    return result;
}
function reset() {
    document.getElementById("message").value = "";
    document.getElementById("shift-key").value = "";
    document.getElementById("slider").value = 0;
    document.getElementById("output").value = "";
}