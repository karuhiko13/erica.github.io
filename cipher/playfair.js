// Define the Playfair cipher object
var PlayfairCipher = {
    // The key table for the cipher
    keyTable: [],
    // The filler character
    filler: 'X',
  
    // Function to initialize the key table
    initializeKeyTable: function (key) {
      // Convert key to uppercase and strip non-alphabetic characters
      key = key.replace(/[^A-Za-z]/g, '').toUpperCase();
  
      // Remove duplicate characters
      var uniqueChars = [];
      for (var i = 0; i < key.length; i++) {
        if (uniqueChars.indexOf(key[i]) === -1) {
          uniqueChars.push(key[i]);
        }
      }
  
      // Create the key table
      this.keyTable = uniqueChars;
  
      // Add the remaining unused alphabet characters to the key table
      var alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';
      for (var j = 0; j < alphabet.length; j++) {
        if (this.keyTable.indexOf(alphabet[j]) === -1) {
          this.keyTable.push(alphabet[j]);
        }
      }
    },
  
// Function to encrypt a message using the Playfair cipher
encrypt: function (message, key) {

     // Check if the key contains any non-alphabetic characters
  if (!/^[A-Za-z]+$/.test(key)) {
    return 'Error: Key should only contain alphabetic characters.';
  }

    this.initializeKeyTable(key);

    // Convert message to uppercase and strip non-alphabetic characters
    message = message.replace(/[^A-Za-z]/g, '').toUpperCase();

    // Replace 'J' with 'I' in the message
    message = message.replace(/J/g, 'I');

    // Insert filler character between double letters
    var modifiedMessage = '';
    for (var k = 0; k < message.length; k++) {
      modifiedMessage += message[k];
      if (k < message.length - 1 && message[k] === message[k + 1]) {
        modifiedMessage += this.filler;
      }
    }

    // Pad uneven pairs with the filler character
    if (modifiedMessage.length % 2 !== 0) {
      modifiedMessage += this.filler;
    }

    // Perform encryption
    var encryptedMessage = '';
    for (var l = 0; l < modifiedMessage.length; l += 2) {
      var char1 = modifiedMessage[l];
      var char2 = modifiedMessage[l + 1];
      var row1, col1, row2, col2;

      // Find the positions of the characters in the key table
      for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) {
          if (this.keyTable[row * 5 + col] === char1) {
            row1 = row;
            col1 = col;
          }
          if (this.keyTable[row * 5 + col] === char2) {
            row2 = row;
            col2 = col;
          }
        }
      }

      // Apply the Playfair cipher rules
      if (row1 === row2) {
        col1 = (col1 + 1) % 5;
        col2 = (col2 + 1) % 5;
      } else if (col1 === col2) {
        row1 = (row1 + 1) % 5;
        row2 = (row2 + 1) % 5;
      } else {
        var temp = col1;
        col1 = col2;
        col2 = temp;
      }

      // Append the encrypted characters to the result
      encryptedMessage += this.keyTable[row1 * 5 + col1] + this.keyTable[row2 * 5 + col2];
    }

    return encryptedMessage;
  },

  
    // Function to decrypt a message using the Playfair cipher
    decrypt: function (message, key) {
        
        // Check if the key contains any non-alphabetic characters
        if (!/^[A-Za-z]+$/.test(key)) {
            return 'Error: Key should only contain alphabetic characters.';
        }

    this.initializeKeyTable(key);
  
    // Perform decryption
    var decryptedMessage = '';
    for (var m = 0; m < message.length; m += 2) {
      var char1 = message[m];
      var char2 = message[m + 1];
      var row1, col1, row2, col2;
  
      // Find the positions of the characters in the key table
      for (var row = 0; row < 5; row++) {
        for (var col = 0; col < 5; col++) {
          if (this.keyTable[row * 5 + col] === char1) {
            row1 = row;
            col1 = col;
          }
          if (this.keyTable[row * 5 + col] === char2) {
            row2 = row;
            col2 = col;
          }
        }
      }
  
      // Apply the Playfair cipher rules
      if (row1 === row2) {
        col1 = (col1 - 1 + 5) % 5;
        col2 = (col2 - 1 + 5) % 5;
      } else if (col1 === col2) {
        row1 = (row1 - 1 + 5) % 5;
        row2 = (row2 - 1 + 5) % 5;
      } else {
        var temp = col1;
        col1 = col2;
        col2 = temp;
      }
  
      // Append the decrypted characters to the result
      decryptedMessage += this.keyTable[row1 * 5 + col1] + this.keyTable[row2 * 5 + col2];
  
      // Insert a space between original double letters and filler character
      if (char1 === char2 && decryptedMessage.charAt(decryptedMessage.length - 2) !== ' ') {
        decryptedMessage = decryptedMessage.slice(0, -1) + ' ' + decryptedMessage.slice(-1);
      }
    }
  
    return decryptedMessage;
  }
  };
  
  // Function to encode the message using the Playfair cipher
  function encode() {
    var message = document.getElementById('message').value;
    var key = document.getElementById('key').value;
    var output = document.getElementById('output');
  
    var encryptedMessage = PlayfairCipher.encrypt(message, key);
    output.value = encryptedMessage;
  }
  
  // Function to decode the message using the Playfair cipher
  function decode() {
    var message = document.getElementById('message').value;
    var key = document.getElementById('key').value;
    var output = document.getElementById('output');
  
    var decryptedMessage = PlayfairCipher.decrypt(message, key);
    output.value = decryptedMessage;
  }
  
  // Function to reset the input fields and output
  function reset() {
    document.getElementById('message').value = '';
    document.getElementById('key').value = '';
    document.getElementById('output').value = '';
  }