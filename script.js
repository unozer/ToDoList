// chiave per accedere al localStorage
const localStorageKey = 'taskList';

// recupero gli elementi dal DOM (pagina HTML)
const msgListaVuota = document.querySelector('.msg-lista-vuota');
const toDoList = document.querySelector('.todo-list');
const addTaskButton = document.querySelector('button');
const taskInput = document.querySelector('input'); 

// recupero i task e li salvo in una variabile
let activities = initActivities();
// mostro il contenuto della lista
showContent();
// attacco listener per l'evento click al bottone
addTaskButton.addEventListener('click', addActivity);

function initActivities() {
    const storage = localStorage.getItem(localStorageKey);

    console.log(storage);

    // controllo se ci sono elementi salvati nel localStorage
    if (storage) {
        // localStorage è pieno, trasformo il json in un array
        return JSON.parse(storage);
    } else {
        // localStorage è vuoto, torno array vuoto
        return [];
    }
}

function showContent() {
    // pulisco la lista dei task
    toDoList.innerText = '';

    if (activities.length == 0) {
        // se non ci sono task, mostro il messaggio lista vuota
        msgListaVuota.style.display = 'block';   
    } else {
        // se ci sono task, nascondo il messaggio lista vuota
        msgListaVuota.style.display = 'none';   
        // ciclo per ogni task e lo inserisco nella toDoList 
        activities.forEach(function(activity) {
            toDoList.innerHTML += 
            `<li class="todo-item">
                <div class="todo-check">
                    <img src="assets/check.svg">
                </div>
                <p class="todo-text">${activity}</p>
            </li>`;
        });
        // attivo le checkbox
        enableCheckbox();
    }
}

function addActivity() {
    const inputText = taskInput.value.trim();

    console.log(inputText);

    // controllo se il campo di input è vuoto
    if (inputText.length > 0) {
        // controllo se l'activity esiste già nella lista
        if (activities.includes(inputText)) {
            alert('Attività già presente!');
            return;
        }
        // aggiungo attività alla lista
        activities.push(inputText);
        // aggiorno il localStorage
        localStorage.setItem(localStorageKey, JSON.stringify(activities));
        // aggiorno contenuto della lista
        showContent();
        // pulisco il campo di input
        taskInput.value = '';
    }
}

function enableCheckbox() {
    // recupero tutti gli elementi checkbox
    const checkboxes = document.querySelectorAll(".todo-check");
    
    // su ogni elemento checkbox
    checkboxes.forEach(function (checkbox, index) {
        console.log(checkbox);
        console.log(index);

        // attivo il listener per l'evento click
        checkbox.addEventListener('click', function(){
            activities.splice(index, 1);
            localStorage.setItem(localStorageKey, JSON.stringify(activities));
            showContent();
        });
    });
}