// Function to encrypt the message using DES encryption
function encode() {
    var message = document.getElementById("message").value;
    var key = document.getElementById("key").value;

    if (key.length !== 8) {
        alert("Key length must be exactly 8 characters!");
        return;
    }

    var encrypted = CryptoJS.DES.encrypt(message, key);
    document.getElementById("output").value = encrypted.toString();
}

// Function to decrypt the message using DES decryption
function decode() {
    var message = document.getElementById("message").value;
    var key = document.getElementById("key").value;

    if (key.length !== 8) {
        alert("Key length must be exactly 8 characters!");
        return;
    }

    var decrypted = CryptoJS.DES.decrypt(message, key);
    document.getElementById("output").value = decrypted.toString(CryptoJS.enc.Utf8);
}

// Function to reset the input fields and output textarea
function reset() {
    document.getElementById("message").value = "";
    document.getElementById("key").value = "";
    document.getElementById("output").value = "";
}
