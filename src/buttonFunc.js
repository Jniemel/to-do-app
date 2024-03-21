import { addCollection, removeCollection } from "./collections";
import { addTodo, removeTodo } from "./todo";
import { createCollectionDiv, clearContentArea, clearCollectionDiv, openCollection, addEmptyDiv, openTodo, openDialog, changeHeaderText, displayOverviewBtn, hideOverviewBtn } from "./dom";
import { validateInput } from "./validate";
import { collections } from "./init";
import { storageSaveData } from "./storage";

const collectionsContainer = document.querySelector('#collections');

// finding collection from collections 
function findElement(key, value, array) {     
     return array.find(element => element[key] === value);
}

function findElementIndex(key, value, array) {
    return array.findIndex(element => element[key] === value);
}

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
                storageSaveData(collections);
                clearContentArea();
                changeHeaderText('');
                clearTodoEditBtn();
                hideOverviewBtn();
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

    // clear overview button
    hideOverviewBtn();
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
        const collection = findElement("name", minimize.id);        
        progressDiv.textContent = collection.progress();
        minButton.textContent = '-';
    }
}

// activate to-do
export function activateTodo(e) {

    e.stopImmediatePropagation();
    // activate the collection which holds the selected to-do also
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
    // display 'overview'-button so user can quickly return to collection-view
    displayOverviewBtn(lastClickedCollection);    
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
    // display 'overview'-button so user can quickly return to collection-view    
    displayOverviewBtn(lastClickedCollection);
}

// return user to collection view when 'overview'-button is pressed
export function overview(collectionId) {

    let collection = findElement("name", collectionId, collections);
    openCollection(collection);
    lastClickedTodo = '';
    
    // clear 'last clicked' attribute from to-do
    const divs = document.querySelectorAll('.to-do');
    divs.forEach((div) => {
        if (div.getAttribute('data') === 'last-clicked-todo') {            
            div.removeAttribute('data');            
        }
    });
}

// open the dialog for creating a new to-do
export function createNewTodo() {

    if (lastClickedCollection.length != 0) {        
        openDialog("dialog-todo", 'New to-do', submitNewTodo);       
    } else {
        alert('No collection selected!');
    }
}

// submit the new to-do
function submitNewTodo(e) { 

    // find the last clicked collection which will hold the new to-do
    let collection =  findElement("name", lastClickedCollection, collections);;
    
    // validate the new to-dos subject
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
        alert('Editing the to-do failed.\nreason: ' + validation);
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
                const collection = findElement("name", lastClickedCollection, collections);;
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

// edit the active to-do
export function editTodo() {

    openDialog("dialog-todo", 'Edit to-do', submitEditedTodo);
    const dialog = document.querySelector('#dialog-todo');    
    const todoDetails = document.querySelector('.content-container .to-do-details');

    // get initial values from the to-do into the dialogs inputs
    const inputSubject = dialog.querySelector('#todo-subject');    
    inputSubject.value = todoDetails.querySelector('.to-do-subject').textContent;

    const inputNotes = dialog.querySelector('#todo-notes');
    inputNotes.textContent = todoDetails.querySelector('.to-do-notes').textContent;

    const inputPriority = dialog.querySelector('#todo-priority');
    switch (todoDetails.querySelector('.to-do-prio').textContent) {
        case 'Priority: Low':
            inputPriority.value = 'Low';
            break;
        case 'Priority: Medium':
            inputPriority.value = 'Medium';
            break;
        case 'Priority: High':
            inputPriority.value = 'High';
            break;
    }
}

// submit the edited to-do
function submitEditedTodo(e) {

    // get the active collection which holds the to be edited to-do
    // and the to be edited to-do
    //let collection =  findCollection(lastClickedCollection);   
    //let old = findTodo(lastClickedTodo, collection["todos"]);
    //let collection = findElement("name", lastClickedCollection, collections);
    let collectionIndex = findElementIndex("name", lastClickedCollection, collections);
    let todoIndex = findElementIndex("subject", lastClickedTodo, collections[collectionIndex]["todos"]);
    
    //console.log(collection["todos"][0]);
    // check if subject changed
    const formData = new FormData(e.target);    
    const subject = formData.get("todo-subject");
    const old = collections[collectionIndex]["todos"][todoIndex]["subject"];
    let validation = 'default';
    let noChange = false;
    
    if (subject != old) {
        validation = validateInput(subject, collections[collectionIndex]["todos"], "subject");        
    } else {
        noChange = true;
    }

    if (validation === 'valid' || noChange) {
        collections[collectionIndex]["todos"][todoIndex]["subject"] = subject;
        collections[collectionIndex]["todos"][todoIndex]["notes"] = formData.get("todo-notes");                      
        const str = formData.get("todo-priority");        
        let priority = 0;
        switch (str) {
            case 'Low':
                priority = 0;
                break;
            case 'Medium':
                priority = 1;
                break;
            case 'High':
                priority = 2;
        } 
        collections[collectionIndex]["todos"][todoIndex]["priority"] = priority;
        storageSaveData(collections);
    } else if (validation != 'valid' && validation != 'null' && validation != 'default') {
        alert('Adding the new to-do failed.\nreason: ' + validation);
    }
    /*
    // check if subject changed
    const formData = new FormData(e.target);    
    const subject = formData.get("todo-subject");
    let validation = 'default';
    let noChange = false;
    if (subject != old["subject"]) {
        validation = validateInput(subject, collection["todos"], "subject");        
    } else {
        noChange = true;
    }

    // if name valid or same, proceed
    if (validation === 'valid' || noChange) {     
        console.log('Yo!!');
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
        


        storageSaveData(collections); 

    } else if (validation != 'valid' && validation != 'null' && validation != 'default') {
        alert('Adding the new to-do failed.\nreason: ' + validation);
    }      
    */
}

// wip
function editCollection() {
    let toEdit = prompt('Collection to edit:');

}

// open to-dos based on priority


