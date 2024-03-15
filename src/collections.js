import './styles.css';
import clock from './clock.png';
import circle from './circle.png';
import snail from './snail.png';
import check from './check.png';
import { openCollection } from './content';

// reference to placement of collections
const placement = document.querySelector('#collections');

// create a to-do collection
export function createCollection(collectionName) {

    let name = collectionName;
    let todos = [];   

    const addTodo = (todo) => todos.push(todo);
    const clearTodos = () => todos.length = 0;
    const short = () => name.slice(0, 17) + "...";
    function progress() {
        // calculate the collections progress from # of done to-do's
        let total = todos.length;
        let done = 0;
        for (let i = 0; i < total; i++) {
            if (todos[i].getStatus()) {
                done += 1;
            }
        }
        let percent = Math.trunc((done / total) * 100);
        return  percent + "%";
    }

    return {  name, todos, addTodo, clearTodos, short, progress };
}

// remove a collection from array
export function removeCollection(toRemove, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]["name"] === toRemove) {
            array.splice(i, 1);
            return array;
        }
    }
}

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

function displayTodo(todo) {
     // create a div for to-do
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('to-do');
     todoDiv.id = todo['subject'];

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
     // create add subject, shorten subject if > 50 characters
     const sub = document.createElement('p');
     sub.classList.add('sub-txt'); 
     if (todo["subject"].length > 50) {
        sub.textContent = todo.short();
     } else {
        sub.textContent = todo["subject"];
     }     
     sub.addEventListener('click', highlight);

     // append elements into to-do
     prioIcon.appendChild(icon);
     todoDiv.appendChild(prioIcon);
     todoDiv.appendChild(sub);

     return todoDiv;
}

// display collection on page
export function displayCollection(collection) {

    // create collection div & header for collection
    const collectionDiv = document.createElement('div');
    collectionDiv.classList.add('collection');
    collectionDiv.id = collection["name"];
    const collectionHeader = document.createElement('div');
    collectionHeader.classList.add('collection-header');
    collectionDiv.appendChild(collectionHeader);

    // add button and progress div to header
    const headerBtn = document.createElement('button');
    headerBtn.classList.add('collection-btn');
    if (collection["name"].length > 17) {
        console.log('here');
        headerBtn.textContent = collection.short();
    } else {
        headerBtn.textContent = collection["name"];
    }    
    headerBtn.addEventListener('click', highlight);
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
            todoDiv.appendChild(displayTodo(collection.todos[i]));
        }
        
        // calculate collection progress
        progressDiv.textContent = collection.progress();
        
    } else {

        // if no todos, add empty text
        const empty = document.createElement('div');
        empty.classList.add('empty');
        empty.textContent = "This collection is empty...";
        collectionDiv.appendChild(empty);
    }
    
    // append to collections div
    placement.appendChild(collectionDiv);
            
}

// highlight and save last clicked collection / to-do
export let lastClicked = [];

function highlight(e) {
    
    // remove 'last clicked' attribute if new button is clicked
    const divs = placement.querySelectorAll('.collection button, .to-do p');
    divs.forEach((btn) => {
        if (btn.getAttribute('data') === 'last-clicked') {            
            btn.removeAttribute('data');            
        }
    });
    
    // set 'last clicked' attribute to button that was clicked
    e.target.setAttribute('data', 'last-clicked')

    // store the class and id of last clicked collection / to-do
    if (e.target.classList[0] === 'collection-btn') {
          
        lastClicked[0] = e.target.parentNode.parentNode.classList[0];    
        lastClicked[1] = e.target.parentNode.parentNode.id;

    } else if (e.target.classList[0] === 'sub-txt') {
        
        lastClicked[0] = e.target.parentNode.classList[0];
        lastClicked[1] = e.target.parentNode.id;
    }
}