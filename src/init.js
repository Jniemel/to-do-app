import './styles.css';
import plus from './plus.png';
import minus from './minus.png';
import { createCollection, removeCollection } from './collections';

/*
// create dialog for adding collection
const addDialog = document.createElement('dialog');
const cancelAddBtn = document.createElement('button');
cancelAddBtn.classList.add('cancel-btn');
cancelAddBtn.textContent = 'Cancel';
const confirmAddBtn = document.createElement('button');
confirmAddBtn.classList.add('add-btn');
confirmAddBtn.textContent = 'Add collection';
*/

export let collections = [];

function createNewCollection() {
    let input = prompt('Name of the new collection:');
    if (input.trim().length === 0) {
        alert('Name was left blank!');
    } else {
        createCollection(input.trim())       
    }    
}

function editTodo() {
    let toEdit = prompt('To-do to edit:');
}

function editCollection() {
    let toEdit = prompt('Collection to edit:');
        
}

export function init() {
    // collection control buttons
    const collectionControls = document.querySelector('#collection-controls');
    const addCollectionBtn = collectionControls.querySelector('.collection-control-btn:first-child');
    const rmCollectionBtn = collectionControls.querySelector('.collection-control-btn:nth-child(2)');
    // add image and event listener to buttons
    addCollectionBtn.style.backgroundImage = "url('" + plus + "')";
    addCollectionBtn.addEventListener("click", createNewCollection);
    rmCollectionBtn.style.backgroundImage = "url('" + minus + "')";
    rmCollectionBtn.addEventListener("click", createNewCollection);


    // add test buttons
    // edit todo
    const editTodoBtn = document.createElement('button');
    editTodoBtn.classList.add('test-btn')
    editTodoBtn.textContent = "editTodo";
    editTodoBtn.addEventListener('click', editTodo)
    collectionControls.append(editTodoBtn);

    // edit collection 
    const editCollectionBtn = document.createElement('button');
    editCollectionBtn.classList.add('test-btn')
    editCollectionBtn.textContent = "editCollection";
    editCollectionBtn.addEventListener('click', editCollection)
    collectionControls.append(editCollectionBtn);


}
