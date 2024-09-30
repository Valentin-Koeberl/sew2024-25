// Beispiel: Einfache Aufgabenverwaltung

// Datenstruktur: Array von Aufgaben
let tasks = [
    { id: 1, title: "Einkaufen", completed: false },
    { id: 2, title: "Hausaufgaben", completed: true },
    { id: 3, title: "Fitnessstudio", completed: false }
];

// Funktion: Aufgabe hinzufügen
function addTask(title) {
    const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: false
    };
    tasks.push(newTask);
}

// Funktion: Aufgabe als erledigt markieren
function completeTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = true;
    } else {
        console.error(`Aufgabe mit ID ${id} nicht gefunden.`);
    }
}

// Funktion: Alle Aufgaben anzeigen
function displayTasks() {
    tasks.forEach(task => {
        console.log(`${task.id}: ${task.title} [${task.completed ? "Erledigt" : "Offen"}]`);
    });
}

// Beispiel für bedingte Anweisungen und Schleifen
function filterTasks(status) {
    return tasks.filter(task => task.completed === status);
}

// Beispiel für reguläre Ausdrücke
function searchTasks(keyword) {
    const regex = new RegExp(keyword, 'i');
    return tasks.filter(task => regex.test(task.title));
}

// Beispiel für Arrow Function und traditionelle Funktion
const arrowFunctionExample = () => console.log("Dies ist eine Arrow Function.");
function traditionalFunctionExample() {
    console.log("Dies ist eine traditionelle Funktion.");
}

// Beispiel für Fehlerbehandlung
try {
    completeTask(4); // Diese Aufgabe existiert nicht
} catch (error) {
    console.error("Fehler:", error.message);
}

// Nutzung der Funktionen
addTask("Lesen");
completeTask(1);
displayTasks();
console.log("Offene Aufgaben:", filterTasks(false));
console.log("Erledigte Aufgaben:", filterTasks(true));
console.log("Suche nach 'Haus':", searchTasks("Haus"));

// Aufruf der Funktionsbeispiele
arrowFunctionExample();
traditionalFunctionExample();
