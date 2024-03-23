import clock from './images/clock.png';
import circle from './images/circle.png';
import snail from './images/snail.png';
import check from './images/check.png';
import pen from './images/pen.png';

import { activateCollection, activateTodo, minimizeCollection , focus, overview, editTodo, changeTodoStatus } from './buttonFunc';

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
    btn.addEventListener('click', func);

    return btn;
}

// set button image
export function setButtonImage(btn, image) {

    let path;

    switch (image) {
        case 'clock':
            path = clock;
            break;    
        case 'circle':
            path = circle;
            break;
        case 'snail':
            path = snail;
            break;
        case 'check':            
            path = check;
    }

    btn.style.backgroundImage = "url('" + path + "')";
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
export function createTodoDiv(todo) {
     
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('to-do');
     todoDiv.id = todo["subject"];

     // add priority icon according to to-do priority or
     // if to-do done, add done icon
     const prioIcon = document.createElement('div');                ;
     const icon = new Image();
     if (!todo["status"]) {
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
     sub.addEventListener('click', activateTodo);

     // append elements into to-do
     prioIcon.appendChild(icon);
     todoDiv.appendChild(prioIcon);
     todoDiv.appendChild(sub);

     return todoDiv;
}

// create a collection div
export function createCollectionDiv(collection) {

    // create div & header 
    const collectionDiv = document.createElement('div');
    collectionDiv.classList.add('collection');    
    collectionDiv.id = collection["name"];
    collectionDiv.addEventListener('click', activateCollection);
    const collectionHeader = document.createElement('div');
    collectionHeader.classList.add('collection-header');
    collectionDiv.appendChild(collectionHeader);

    // add header text, progress and min/max-button to header
    const headerTxt = document.createElement('p');
    headerTxt.classList.add('collection-header-txt');
    if (collection["name"].length > 25) {    
        headerTxt.textContent = collection.short();
    } else {
        headerTxt.textContent = collection["name"];
    }    
    const progressDiv = document.createElement('div');
    progressDiv.classList.add('progress-div');
    const minMax = document.createElement('button');
    minMax.textContent = '-';
    minMax.addEventListener('click', minimizeCollection);
    collectionHeader.append(headerTxt, progressDiv, minMax);
    
    // if collection has to-dos, append to-do subjects
    // and display them under collection header
    if (collection.todos.length > 0) {
        // create container for to-do's
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        collectionDiv.appendChild(todoDiv);        
        
        // display the collections to-dos
        for (let i = 0; i < collection.todos.length; i++) {            
            todoDiv.appendChild(createTodoDiv(collection.todos[i]));
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

// add header to content-area
export function changeHeaderText(text) {  

        const p = document.querySelector('#content-area-header p');
        p.textContent = text;
}

// display 'overview'-button, which returns user to collection-view
export function displayOverviewBtn(collectionId) {

    const overviewBtn = document.querySelector('#content-area-header button');
    overviewBtn.style.display = 'flex';
    overviewBtn.setAttribute('data-return', collectionId)
    overviewBtn.addEventListener('click', () => {
        overviewBtn.style.display = 'none';
        overview(collectionId);
    })
}

// hide the overview button
export function hideOverviewBtn() {

    const overviewBtn = document.querySelector('#content-area-header button');
    overviewBtn.style.display = 'none';
    overviewBtn.removeAttribute('data-return');    
}

// clear content container
export function clearContentArea() {    
    const toClear = contentArea.querySelectorAll('.to-do-details');    
    toClear.forEach((div) => {                       
            div.remove();
    });    
}

// append to-do's details and return as a div
function todoDetails(todo, clickable) {   

    const div = document.createElement('div');
    div.classList.add('to-do-details');
    if (clickable) {
        div.addEventListener('click', focus);
    }    

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
    let btnClass;    
    status.classList.add('to-do-status'); 
    if (todo["status"]) {
        status.textContent = "Status: Done";
        status.style.color = "Darkgreen";
        status.style.fontWeight = '700';
        prio.style.color = 'darkgrey';
        btnClass = 'set-undone';        
    } else {
        status.textContent = "Status: Not done";
        status.style.fontWeight = '400'; 
        status.style.color = (todo["priority"] == 0) ? 'darkgrey' : 'darkred'; 
        btnClass = 'set-done';
    }
    
    const statusBtn = createButton(btnClass, 'Change status', changeTodoStatus);    

    div.append(sub, date, prio, status, notesHeader, notes, statusBtn);
    
    return div;
}

// open the details of to-do to content area
export function openTodo(todo) {
    clearContentArea();
    showTodoEditBtn();
    contentArea.appendChild(todoDetails(todo, false));    
}

// open the details of collection to content area
export function openCollection(collection) {
    clearContentArea();
    clearTodoEditBtn();
    for (let i = 0; i < collection.todos.length; i++) {
        contentArea.appendChild(todoDetails(collection["todos"][i], true));
    }
}

function showTodoEditBtn() {
    const container = document.querySelector('#to-do-controls');
    const btn = createButton('', '', editTodo, pen);
    btn.id = 'edit-todo-btn'
    btn.addEventListener('click', editTodo);
    container.appendChild(btn);    
}

export function clearTodoEditBtn() {    
    const btn = document.querySelector('#edit-todo-btn');
    if (btn != null) {
        btn.remove();
    }    
}

// ------------ dialogs ------------

// open dialog and set submit event listener
export function openDialog(dialogId, headerText, submitListener) {

    const dialog = document.querySelector('#' + dialogId);    
        
    const header = dialog.querySelector('h2');
    header.textContent = headerText;

    const cancelBtn = dialog.querySelector('.submit-cancel');
    cancelBtn.addEventListener('click', function(e) {
        const dialog = e.target.closest('dialog');
        const inputs = dialog.querySelectorAll('#todo-subject, #todo-notes, #todo-priority');
        inputs.forEach(input => {
            input.value = '';
        });
        const form = dialog.querySelector('form');        
        form.removeEventListener('submit', submitListener);        
        dialog.close();
    }); 

    const dialogForm = dialog.querySelector('form');    
    dialogForm.addEventListener('submit', submitListener);

    dialog.showModal();
}
