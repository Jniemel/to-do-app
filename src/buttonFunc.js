import { addCollection, removeCollection } from "./collections";
import { addTodo, removeTodo } from "./todo";
import { createCollectionDiv, clearContentArea, clearCollectionDiv, openCollection, addEmptyDiv, openTodo, openDialog, changeHeaderText} from "./dom";
import { validateInput } from "./validate";
import { collections } from "./init";
import { storageSaveData } from "./storage";

const collectionsContainer = document.querySelector('#collections');

// create a new collection and display it on the page
export function createNewCollection() {

    let input = prompt('Name of the new collection:');
    let validation = validateInput(input, collections, "name");
    
    if (validation === 'valid') {
        addCollection(input.trim(), collections);                     
        collectionsContainer.appendChild(createCollectionDiv(collections[collections.length - 1]));
        storageSaveData(collections);
    } else if (validation != 'valid' && validation != 'null') {
        alert('Adding the new collection failed.\nreason: ' + validation);
    }
}

let lastClickedCollection = '';
let lastClickedTodo = '';

// delete collection
export function deleteCollection() {
    
    // check if active collection exists
    if (lastClickedCollection != '') {

        // confirmation, has to match "yes", no case sensitivity
        const confirm = prompt('Are you sure you want to delete the collection named: "' + lastClickedCollection + '"?\nConfirm by writing "yes"');
        if (confirm != undefined && confirm != null) {

            // check confirmation, proceed to remove the collection
            if (confirm.toLocaleLowerCase() === 'yes') {

                removeCollection(lastClickedCollection, collections);
                clearCollectionDiv(lastClickedCollection);
                clearContentArea();
                storageSaveData(collections);
                lastClickedCollection = '';
                lastClickedTodo = '';

            } else {
                alert('Confirmation did not match!');
            }
        }
    } else {
        alert('No collection selected!');
    } 
}

// activate collection
export function activateCollection(e) {    
    
    // check if different collection clicked
    const clicked = e.target.closest('.collection')    
    if (clicked.id != lastClickedCollection) {
        
        // save and open the clicked collection
        lastClickedCollection = clicked.id;
        lastClickedTodo = '';

        // remove 'last clicked' attribute from previously active collection & to-do
        const divs = document.querySelectorAll('.collection, .to-do');
        divs.forEach((div) => {
            if (div.getAttribute('data') === 'last-clicked-collection' || div.getAttribute('data') === 'last-clicked-todo') {            
                div.removeAttribute('data');            
            }
        });

        // set 'last clicked' attribute to collection that was clicked
        clicked.setAttribute('data', 'last-clicked-collection')                      
    }

    
    // open collection to content area
    changeHeaderText(lastClickedCollection);
    collections.forEach((collection) => {
        if (collection["name"] === lastClickedCollection) {                
            openCollection(collection);
        }
    });    

    // clear lastclicked attribute from last clicked to-do
    const divs = document.querySelectorAll('.to-do');
    divs.forEach((div) => {
        if (div.getAttribute('data') === 'last-clicked-collection' || div.getAttribute('data') === 'last-clicked-todo') {            
            div.removeAttribute('data');            
        }
    });
    lastClickedTodo = '';
}

// minimize collection
export function minimizeCollection(e) {

    e.stopImmediatePropagation();      
    const minimize = e.target.closest('.collection');
    const progressDiv = minimize.querySelector('.collection-header .progress-div');
    const minButton = minimize.querySelector('.collection-header button');

    // check if collection is minimized
    if (minimize.getAttribute('minimize') != 'yes') {
        minimize.setAttribute('minimize', 'yes');
        const minButton = minimize.querySelector('.collection-header button');
        minButton.textContent = '+';

        // display amount of hidden and completed todos in header
        // if collection is not empty
        const hiddenTodos = minimize.querySelectorAll('.todo-div .to-do');
        if (hiddenTodos.length != 0) {
            const numOfTodos = hiddenTodos.length;
            let doneTodos = 0;
            hiddenTodos.forEach(todo => {
                const div = todo.querySelector('div');
                if (div.classList.contains('check')) {
                    doneTodos += 1;
                }
            });
            const str = doneTodos + '/' + numOfTodos;
            const progressDiv = minimize.querySelector('.collection-header .progress-div');
            progressDiv.textContent = str;
        }
    } else {        
        minimize.removeAttribute('minimize');
        const collection = collections.find(element => element["name"] === minimize.id);
        progressDiv.textContent = collection.progress();
        minButton.textContent = '-';
    }
}

// activate to-do
export function activateTodo(e) {

    e.stopImmediatePropagation();
    activateCollection(e);  

    // check if different to-do clicked
    const clicked = e.target.closest('.to-do');          
    if (clicked.id != lastClickedTodo) {
            
        // save and open the clicked to-do
        lastClickedTodo = clicked.id;
        
        // remove 'last clicked' attribute if new button is clicked
        const divs = document.querySelectorAll('.to-do');
        divs.forEach((div) => {
            if (div.getAttribute('data') === 'last-clicked-todo') {            
                div.removeAttribute('data');            
            }
        });

        // set 'last clicked' attribute to todo that was clicked
        clicked.setAttribute('data', 'last-clicked-todo')    
    }
    
    // open the to-do details to content area
    collections.forEach((collection) => {
        if (collection["name"] === lastClickedCollection) {                
            collection.todos.forEach((todo) => {
                if (todo["subject"] === lastClickedTodo) {
                    openTodo(todo);
                }
            });                
        }
    });
}

export function focus(e) {
    
    const clicked = e.target.closest('.to-do-details');    
    lastClickedTodo = clicked.querySelector('.to-do-subject').textContent;
    const divs = document.querySelectorAll('.to-do');
    let todoDiv;
    divs.forEach(div => {
        if (div.id === lastClickedTodo) {
            todoDiv = div;
        }
    });

    // set 'last clicked' attribute to todo that was clicked
    todoDiv.setAttribute('data', 'last-clicked-todo');   
    
    // open the to-do details to content area
    collections.forEach((collection) => {
        if (collection["name"] === lastClickedCollection) {                
            collection.todos.forEach((todo) => {
                if (todo["subject"] === lastClickedTodo) {
                    openTodo(todo);
                }
            });                
        }
    });
}

// open the dialog for creating a new to-do
export function createNewTodo() {

    if (lastClickedCollection.length != 0) {        
        openDialog("dialog-new-todo", submitNewTodo);       
    } else {
        alert('No collection selected!');
    }
}

// submit the new to-do
function submitNewTodo(e) { 

    // find the last clicked collection which will hold the new to-do
    let collection = collections.find(element => element["name"] === lastClickedCollection);
    
    // prompt & validate the new to-dos subject
    const formData = new FormData(e.target);    
    const subject = formData.get("todo-subject");
    const validation = validateInput(subject, collection["todos"], "subject");

    // if name valid, proceed to create the to-do
    if (validation === 'valid') {

        const notes = formData.get("todo-notes");        
        const prioStr = formData.get("todo-priority");        
        let priority = 0;

        switch (prioStr) {
            case 'Low':
                priority = 0;
                break;
            case 'Medium':
                priority = 1;
                break;
            case 'High':
                priority = 2; 
        }

        const todo = [
            subject,
            '',            
            notes,
            priority,
        ]
        addTodo(collection, todo);
        storageSaveData(collections); 

    } else if (validation != 'valid' && validation != 'null') {
        alert('Adding the new to-do failed.\nreason: ' + validation);
    }      
}

// delete active (last clicked) to-do
export function deleteTodo() {

    // check if active to-do exists
    if (lastClickedTodo != '') {

        // confirmation, has to match "yes", no case sensitivity
        const confirm = prompt('Are you sure you want to delete the to-do named: "' + lastClickedTodo + '"?\nConfirm by writing "yes"');    
        if (confirm != undefined && confirm != null) {

            // check confirmation, proceed to remove to-do
            if (confirm.toLocaleLowerCase() === 'yes') {

                // find the last clicked collection which the to-do is to be removed from
                const collection = collections.find(element => element["name"] === lastClickedCollection);
                const collectionDiv = document.querySelector('.collection#' + lastClickedCollection);

                // get the div that holds the to-do 
                const toDelete = document.querySelector('[data=last-clicked-todo]');                
                
                // remove to-do from collection and page
                removeTodo(lastClickedTodo, collection["todos"]);
                toDelete.remove();
                storageSaveData(collections);                
                lastClickedTodo = ''; 

                // refrest content area
                openCollection(collection);

                // refresh progress
                if (collectionDiv.getAttribute('minimize') != 'yes') {
                    const progressDiv = collectionDiv.querySelector('.collection-header .progress-div');
                    progressDiv.textContent = collection.progress();
                }
                
                // if collection is left empty, add empty text
                if (collection["todos"].length === 0) {
                    collectionDiv.appendChild(addEmptyDiv());
                }
            } else {
                alert('Confirmation did not match!');
            }
        }
    } else {
        alert('No to-do selected!');
    } 
}

// wip
function editTodo() {
    let toEdit = prompt('To-do to edit:');
}

// wip
function editCollection() {
    let toEdit = prompt('Collection to edit:');

}

// open to-dos based on priority

