import { addCollection, removeCollection } from "./collections";
import { removeTodo } from "./todo";
import { createCollectionDiv, clearContentArea, clearCollectionDiv, openCollection, addEmptyDiv, openTodo } from "./dom";
import { validateInput } from "./validate";
import { collections } from "./init";



const collectionsContainer = document.querySelector('#collections');

// create a new collection and display it on the page
export function createNewCollection() {

    let input = prompt('Name of the new collection:');
    let validation = validateInput(input, collections, "name");
    
    if (validation === 'valid') {
        addCollection(input.trim(), collections)             
        collectionsContainer.appendChild(createCollectionDiv(collections[collections.length - 1], activateCollection, activateTodo, minimizeCollection));
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
                lastClickedCollection = '';
                lastClickedTodo = '';                
                clearContentArea();
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
        collections.forEach((collection) => {
            if (collection["name"] === lastClickedCollection) {                
                openCollection(collection);
            }
        });              

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
}

// minimize collection
export function minimizeCollection(e) {

    e.stopImmediatePropagation();    
    const minimize = e.target.closest('.collection');
    const progressDiv = minimize.querySelector('.collection-header .progress-div');
    
    // check if collection is minimized
    if (minimize.getAttribute('minimize') != 'yes') {
        minimize.setAttribute('minimize', 'yes');

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
    }
}

// activate to-do
export function activateTodo(e) {

    let collectionActivationDelay = 50;
    setTimeout(function() {
        
        // check if different to-do clicked
        const clicked = e.target.closest('.to-do');          
        if (clicked.id != lastClickedTodo) {
                
            // save and open the clicked to-do
            lastClickedTodo = clicked.id;
            collections.forEach((collection) => {
                if (collection["name"] === lastClickedCollection) {                
                    collection.todos.forEach((todo) => {
                        if (todo["subject"] === lastClickedTodo) {
                            openTodo(todo);
                        }
                    });                
                }
            });
            
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
    }, collectionActivationDelay);    
}

// button function: create a new to do and add it to active (lastClicked) collection
export function createNewTodo() {

    if (lastClickedCollection.length != 0) {
        
        // find the last clicked collection which will hold the new to-do
        let collection = collections.find(element => element["name"] === lastClickedCollection);
        
        openNewTodoDialog();

        /*
        // prompt & validate the new to-dos subject
        const input = prompt('Subject of the new to-do: ');
        const validation = validateInput(input, collection["todos"], "subject");
        
        if (validation === 'valid') {            
            // init a new to-do and add into collection  
            let todo = Array(4).fill('');                  
            todo[0] = input.trim()                        
            addTodo(collection, todo);

            const appendTo = collectionsContainer.querySelector('#' + lastClickedCollection);            
            // remove the empty div if collection was empty
            const divs = appendTo.querySelectorAll('div');        
            divs.forEach((div) => {            
                if (div.getAttribute('class') === 'empty') {
                    div.remove();
                }
            });
    
            // create the div-element for the new to-do and append
            appendTo.appendChild(createTodoDiv(collection["todos"][collection["todos"].length - 1], open))
            // refresh content area
            openCollection(collection);
            // refresh progress
            const progressDiv = appendTo.querySelector('.collection-header .progress-div');
            progressDiv.textContent = collection.progress();

        } else if (validation != 'valid' && validation != 'null') {
            alert('Adding the new to-do failed.\nreason: ' + validation);
        }
        */       
    }
}

// button function: delete active (last clicked) to-do
export function deleteTodo(collections) {

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
                lastClickedTodo = ''; 

                // refrest content area
                openCollection(collection);

                // refresh progress
                const progressDiv = collectionDiv.querySelector('.collection-header .progress-div');
                progressDiv.textContent = collection.progress();
                
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

