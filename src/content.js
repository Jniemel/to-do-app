import './styles.css';

// placement reference
const placement = document.querySelector('#content .content-container');

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

export function clearContainer() {    
    const toClear = placement.querySelectorAll('.to-do-content');    
    toClear.forEach((div) => {
            console.log(div);            
            div.remove();
    });    
}


export function openCollection(array) {

    for (let i = 0; i < array.length; i++) {
        placement.appendChild(displayTodo(array[i]));
    }
}