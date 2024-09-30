function rot13(text) {
    text = String(text);

    let encryptedString = text.replace(/[a-zA-Z]/g, encrypt)
    return encryptedString;
}

function encrypt(char) {
    const start = char <= 'Z' ? 65 : 97;
    const charCode = char.charCodeAt(0);
    const newCharCode = start + (charCode - start + 13) % 26;
    return String.fromCharCode(newCharCode);
}

let encrypted = rot13("Hello, World!");
console.log(encrypted);

let decrypted = rot13(encrypted);
console.log(decrypted);

let encrypted_2 = rot13("Valentin");
console.log(encrypted_2);

let decrypted_2 = rot13(encrypted_2);
console.log(decrypted_2);

let encryped_test = rot13(123);
console.log(rot13(encryped_test));