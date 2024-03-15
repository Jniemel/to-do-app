import './styles.css';
import clock from './clock.png';
import circle from './circle.png';
import snail from './snail.png';
import check from './check.png';

// reference to placement of collections
const placement = document.querySelector('#collections');

// create a to-do collection
export function createCollection(collectionName) {

    let name = collectionName;
    let todos = [];   

    const addTodo = (todo) => todos.push(todo);
    const clearTodos = () => todos.length = 0;
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

    return {  name, todos, addTodo, clearTodos, progress };
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

// clear collections from page 
export function clearCollectionsDiv() {
    const toClear = placement.querySelectorAll('.collection');
    toClear.forEach(div => {
        div.remove();
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

// display collection on page
export function displayCollectionDiv(collection) {

    // create collection div & header for collection
    const collectionDiv = document.createElement('div');
    collectionDiv.classList.add('collection');
    const collectionHeader = document.createElement('div')
    collectionHeader.classList.add('collection-header')
    collectionDiv.appendChild(collectionHeader);

    // add button and progress div to header
    const headerBtn = document.createElement('button');
    headerBtn.classList.add('collection-btn')
    headerBtn.textContent = collection["name"];
    headerBtn.addEventListener('click', highlight);
    const progressDiv = document.createElement('div');
    progressDiv.classList.add('progress-div');
    collectionHeader.append(headerBtn, progressDiv);

    // if collection has to-dos, append to-do subjects
    // and display them under collection header
    if (collection.todos.length > 0) {

        //create container for to-do's
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');
        collectionDiv.appendChild(todoDiv);
        

        for (let i = 0; i < collection.todos.length; i++) {
            
            // create a div for a to-do
            const todo = document.createElement('div');
            todo.classList.add('to-do');

            // add priority icon according to to-do priority
            // if to-do done, add done icon
            const prioIcon = document.createElement('div');                ;
            const icon = new Image();
            if (!collection.todos[i].getStatus()) {
                const priority = priorityIcon(collection.todos[i]["priority"])                
                icon.src = priority[0];
                prioIcon.classList.add(priority[1]);   
            } else {
                icon.src = check;
                prioIcon.classList.add('check');
            }
            
            const sub = document.createElement('p');                
            sub.textContent = collection.todos[i]["subject"];

            // append to-do into collection div
            prioIcon.appendChild(icon);
            todo.appendChild(prioIcon);
            todo.appendChild(sub);
            todoDiv.appendChild(todo);
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
    
    // append to page
    placement.appendChild(collectionDiv);
            
}

// highlight and save last clicked collection
export let lastClicked = '';

function highlight(e) {
    const divs = placement.querySelectorAll('.collection button');
    console.log(divs);    
    divs.forEach((btn) => {
        if (btn.id === 'last-clicked') {            
            btn.removeAttribute('id');
        }
    });    
    e.target.id = "last-clicked";
    lastClicked = e.target.innerText;
}