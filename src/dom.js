import clock from './images/clock.png';
import circle from './images/circle.png';
import snail from './images/snail.png';
import check from './images/check.png';

// create a button
export function createButton(cssClass, text, func, path = '') {

    const btn = document.createElement('button');
    if (cssClass != '') {
        btn.classList.add(cssClass);
    }    
    btn.textContent = text;    
    if (path != '') {
        btn.style.backgroundImage = "url('" + path + "')";
    }    
    btn.addEventListener("click", func); 

    return btn;
}

// ------------ collection area ------------

// clear collection div 
export function clearCollectionDiv(name) {
    const divs = document.querySelectorAll('.collection');
    divs.forEach(div => {
        if (div.id === name) {
            div.remove();
        }
    });
}

// picking the right icon according to to-do's priority
function priorityIcon(priority) {

    if (priority === 2) {
        return [clock, 'clock'];
    } else if (priority === 1) {
        return [circle, 'circle'];
    } else {
        return [snail, 'snail'];
    }
}

// create a to-do div
export function createTodoDiv(todo, listenerFunction) {
     
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('to-do');
     todoDiv.id = todo["subject"];

     // add priority icon according to to-do priority or
     // if to-do done, add done icon
     const prioIcon = document.createElement('div');                ;
     const icon = new Image();
     if (!todo.getStatus()) {
         const priority = priorityIcon(todo["priority"])                
         icon.src = priority[0];
         prioIcon.classList.add(priority[1]);   
     } else {
         icon.src = check;
         prioIcon.classList.add('check');
     }
     // add subject, shorten if > 50 characters & add event listener      
     const sub = document.createElement('p');
     sub.classList.add('todo-header-subject'); 
     if (todo["subject"].length > 50) {
        sub.textContent = todo.short();
     } else {
        sub.textContent = todo["subject"];
     }     
     sub.addEventListener('click', listenerFunction);

     // append elements into to-do
     prioIcon.appendChild(icon);
     todoDiv.appendChild(prioIcon);
     todoDiv.appendChild(sub);

     return todoDiv;
}

// create a div for a collection
export function createCollectionDiv(collection, listenerFunction) {

    // create div & header 
    const collectionDiv = document.createElement('div');
    collectionDiv.classList.add('collection');    
    collectionDiv.id = collection["name"];
    const collectionHeader = document.createElement('div');
    collectionHeader.classList.add('collection-header');
    collectionDiv.appendChild(collectionHeader);

    // add button and progress to header
    const headerBtn = document.createElement('button');
    headerBtn.classList.add('collection-btn');
    if (collection["name"].length > 17) {    
        headerBtn.textContent = collection.short();
    } else {
        headerBtn.textContent = collection["name"];
    }    
    headerBtn.addEventListener('click', listenerFunction);
    const progressDiv = document.createElement('div');
    progressDiv.classList.add('progress-div');
    collectionHeader.append(headerBtn, progressDiv);

    // if collection has to-dos, append to-do subjects
    // and display them under collection header
    if (collection.todos.length > 0) {
        // create container for to-do's
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        collectionDiv.appendChild(todoDiv);        
        
        // display the collections to-dos
        for (let i = 0; i < collection.todos.length; i++) {            
            todoDiv.appendChild(createTodoDiv(collection.todos[i], listenerFunction));
        }
        
        // calculate collection progress
        progressDiv.textContent = collection.progress();
        
    } else {
        // if no todos, add empty div
        collectionDiv.appendChild(addEmptyDiv());
    }
    
    return collectionDiv;
}

export function addEmptyDiv() {
        
        const div = document.createElement('div');
        div.classList.add('empty');
        div.textContent = "This collection is empty...";
        
        return div;
}

// ------------ content area ------------

// placement reference
const contentArea = document.querySelector('#content .content-container');

// clear content container
export function clearContentArea() {    
    const toClear = contentArea.querySelectorAll('.to-do-details');    
    toClear.forEach((div) => {                       
            div.remove();
    });    
}

// append to-do's details and return as a div
function todoDetails(todo) {   

    const div = document.createElement('div');
    div.classList.add('to-do-details');

    const sub = document.createElement('h2');
    sub.classList.add('to-do-subject');
    sub.textContent = todo["subject"];

    const date = document.createElement('h3');
    date.classList.add('to-do-date');
    date.textContent = 'Due date: ' + todo["date"];

    const notesHeader = document.createElement('h4');
    notesHeader.textContent = 'Notes:'
    const notes = document.createElement('p');
    notes.classList.add('to-do-notes');
    if (todo["notes"] === '') {
        notes.textContent = 'No additional information';
    } else {
        notes.textContent = todo["notes"];
    }    

    const prio = document.createElement('p');
    prio.classList.add('to-do-prio');
    
    switch (todo["priority"]) {

        case 1:
            prio.textContent = "Priority: Medium";
            prio.style.color = 'darkorange';
            break;

        case 2:
           prio.textContent = "Priority: High";
           prio.style.color = 'darkred';
           break;

        default:
            prio.textContent = "Priority: Low";
            prio.style.color = 'darkgrey';  
    }

    const status = document.createElement('p');
    status.classList.add('to-do-status'); 
    if (todo.getStatus()) {
        status.textContent = "Status: Done";
        status.style.color = "Darkgreen";
        status.style.fontWeight = '700';
        prio.style.color = 'darkgrey'; 
    } else {
        status.textContent = "Status: Not done";
        status.style.fontWeight = '400'; 
        status.style.color = (todo["priority"] === 0) ? 'darkgrey' : 'darkred';   
    }  

    div.append(sub, date, prio, status, notesHeader, notes);

    return div;
}

// open the details of to-do to content area
export function openTodo(todo) {
    clearContentArea();
    contentArea.appendChild(todoDetails(todo))
}

// open the details of collection to content area
export function openCollection(collection) {
    clearContentArea();
    for (let i = 0; i < collection.todos.length; i++) {
        contentArea.appendChild(todoDetails(collection.todos[i]));
    }
}