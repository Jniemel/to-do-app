import './styles.css';

// placement reference
const placement = document.querySelector('#content');

function displayTodo(todo) {
    
    const div = document.createElement('div');
    div.classList.add('to-do-content');
    const sub = document.createElement('p');
    sub.textContent = todo["subject"];   
    const date = document.createElement('p');
    date.textContent = todo["date"];         
    const notes = document.createElement('p');
    notes.textContent = todo["notes"]; 
    const prio = document.createElement('p');
    prio.textContent = todo["priority"]; 
    const status = document.createElement('p');
    status.textContent = todo["status"];

    div.append(sub, date, notes, prio, status);

    return div;
}

export function openCollection(array) {
    for (let i = 0; i < array.length; i++) {
        displayTodo(array[i]);
    }
}