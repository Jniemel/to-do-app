import './styles.css';
import star from './star.png';

// create a to-do collection
export function createCollection(collectionName) {

    const name = collectionName;
    let todos = [];    
    
    const add = (todo) => todos.push(todo);

    const clear = () => todos.length = 0;

    return { name, todos, add, clear };
}

// remove a to-do collection from array
export function removeCollection(toRemove, collectionArray) {
    for (let i = 0; i < collectionArray.length; i++) {
        if (collectionArray[i]["name"] === toRemove) {
            collectionArray.splice(i, 1);
            return collectionArray;
        }
    }}

// display to-do collections on page
// if trigClear = true, clear collections
// (use when removing a collection or todo)
export function displayCollections(collectionArr, trigClear = false) {

    const placement = document.querySelector('#collections');

    // clear collections 
    if (trigClear) {
        const toClear = placement.querySelectorAll('.collection');
        toClear.forEach(div => {
            div.remove();
        });
    }

    // display the collections
    for (let i = 0; i < collectionArr.length; i++) {

        // create placement reference and collection header
        const collection = document.createElement('div');
        collection.classList.add('collection');
        let header = document.createElement('button');
        header.classList.add('collection-btn')
        header.textContent = collectionArr[i]["name"];
        
        collection.appendChild(header);

        // if collection has to-dos, append subject and display
        if (collectionArr[i].todos.length > 0) {
            for (let j = 0; j < collectionArr[i].todos.length; j++) {
                
                const todo = document.createElement('div');
                todo.classList.add('to-do');
                const prioIcon = document.createElement('div');
                prioIcon.classList.add('priority-icon-container');
                const icon = new Image();
                icon.src = star;
                const sub = document.createElement('h4');
                sub.textContent = collectionArr[i].todos[j][0];

                prioIcon.appendChild(icon);
                todo.appendChild(prioIcon);
                todo.appendChild(sub);
                collection.appendChild(todo);
            }            
        }

        placement.appendChild(collection);
    }
}
