function rot13(text) {
    // Sicherstellen, dass das Argument ein String ist
    text = String(text);

    // ROT13-Transformation
    return text.replace(/[a-zA-Z]/g, function(char) {
        const start = char <= 'Z' ? 65 : 97; // ASCII-Wert für 'A' oder 'a'
        return String.fromCharCode(start + (char.charCodeAt(0) - start + 13) % 26);
    });
}

// Beispielaufrufe
let encrypted = rot13("Hello, World!");
console.log(encrypted); // Uryyb, Jbeyq!

let decrypted = rot13(encrypted);
console.log(decrypted); // Hello, World!
