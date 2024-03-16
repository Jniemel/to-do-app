// placement reference
const placement = document.querySelector('#content .content-container');

// clear content container
function clearContainer() {    
    const toClear = placement.querySelectorAll('.to-do-content');    
    toClear.forEach((div) => {
            console.log(div);            
            div.remove();
    });    
}

// append to-do's details and return as a div
function todoDetails(todo) {   

    const div = document.createElement('div');
    div.classList.add('to-do-details');
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

// open the details of to-do to content area
export function openTodo(todo) {
    clearContainer();
    placement.appendChild(todoDetails(todo))
}

// open the details of collection to content area
export function openCollection(array) {
    clearContainer();
    for (let i = 0; i < array.length; i++) {
        placement.appendChild(todoDetails(array[i]));
    }
}