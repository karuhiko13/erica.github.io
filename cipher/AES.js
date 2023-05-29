// Encrypts the message using AES encryption algorithm
function encode() {
    const message = document.getElementById("message").value;
    const key = document.getElementById("key").value;
  
    if (key.length !== 16 && key.length !== 24 && key.length !== 32) {
      alert("Key must be equal to 16, 24, or 32 characters long (128, 192, or 256 bits).");
      return;
    }
  
    const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();
    document.getElementById("output").value = encryptedMessage;
  }
  
  // Decrypts the message using AES decryption algorithm
  function decode() {
    const encryptedMessage = document.getElementById("output").value;
    const key = document.getElementById("key").value;
  
    if (key.length !== 16 && key.length !== 24 && key.length !== 32) {
      alert("Key must be equal to 16, 24, or 32 characters long (128, 192, or 256 bits).");
      return;
    }
  
    const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, key).toString(CryptoJS.enc.Utf8);
    document.getElementById("output").value = decryptedMessage;
  }
  
  // Resets the input fields and output area
  function reset() {
    document.getElementById("message").value = "";
    document.getElementById("key").value = "";
    document.getElementById("output").value = "";
  }
  