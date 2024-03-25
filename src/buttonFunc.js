import { addCollection, removeCollection } from "./collections";
import { addTodo, removeTodo } from "./todo";
import { createCollectionDiv, clearContentArea, clearCollectionDiv, openCollection, addEmptyDiv, openTodo, openDialog, changeHeaderText, displayOverviewBtn, hideOverviewBtn, clearTodoEditBtn, openTodoArray } from "./dom";
import { validateInput } from "./validate";
import { collections } from "./init";
import { storageSaveCollections, storageFetchCollections, fetchActiveCollection, fetchActiveTodo, saveActiveCollection, saveActiveTodo } from "./storage";

const collectionsContainer = document.querySelector('#collections');

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
        storageSaveCollections(collections);
    } else if (validation != 'valid' && validation != 'null') {
        alert('Adding the new collection failed.\nreason: ' + validation);
    }
}

// delete collection
export function deleteCollection() {
    
    // check if active collection exists        
    if (fetchActiveCollection() != 'empty' ) {

        // confirmation, has to match "yes", no case sensitivity        
        const confirm = prompt('Are you sure you want to delete the collection named: "' + fetchActiveCollection() + '"?\nConfirm by writing "yes"');

        if (confirm != undefined && confirm != null) {

            // check confirmation, proceed to remove the collection
            if (confirm.toLocaleLowerCase() === 'yes') {

                removeCollection(fetchActiveCollection(), collections);
                clearCollectionDiv(fetchActiveCollection());
                storageSaveCollections(collections);
                clearContentArea();
                changeHeaderText('');                
                hideOverviewBtn();
                clearTodoEditBtn();
                saveActiveCollection('');
                saveActiveTodo('');

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
    if (clicked.getAttribute('data') != 'last-clicked-collection') {
        
        // save and open the clicked collection
        saveActiveCollection(clicked.id);        

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
    changeHeaderText(fetchActiveCollection());
    collections.forEach((collection) => {
        if (collection["name"] === fetchActiveCollection()) {                
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
    saveActiveTodo('');

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
        const collection = findElement("name", minimize.id, collections);        
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
    if (clicked.getAttribute('data') != 'last-clicked-todo') {
            
        // save and open the clicked to-do
        saveActiveTodo(clicked.id);
        
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
        if (collection["name"] === fetchActiveCollection()) {                
            collection.todos.forEach((todo) => {
                if (todo["subject"] === fetchActiveTodo()) {
                    openTodo(todo);
                }
            });                
        }
    });
    // display 'overview'-button so user can quickly return to collection-view
    displayOverviewBtn(fetchActiveCollection());    
}

export function focus(e) {
    
    const clicked = e.target.closest('.to-do-details');    
    saveActiveTodo(clicked.querySelector('.to-do-subject').textContent);

    const collectionDiv = document.querySelector('[data="last-clicked-collection"]');
    const divs = collectionDiv.querySelectorAll('.todo-div .to-do');
    let todoDiv;
    divs.forEach(div => {
        if (div.id === fetchActiveTodo()) {
            todoDiv = div;
        }
    });

    // set 'last clicked' attribute to todo that was clicked
    todoDiv.setAttribute('data', 'last-clicked-todo');     

    // open the to-do details to content area    
    collections.forEach((collection) => {
        if (collection["name"] === fetchActiveCollection()) {                         
            collection.todos.forEach((todo) => {
                if (todo["subject"] === fetchActiveTodo()) {
                    openTodo(todo);
                }
            });                
        }
    });
    // display 'overview'-button so user can quickly return to collection-view    
    displayOverviewBtn(fetchActiveCollection());    
}

// return user to collection view when 'overview'-button is pressed
export function overview(collectionId) {

    let collection = findElement("name", collectionId, collections);
    openCollection(collection);
    saveActiveTodo('');
    
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

    if (fetchActiveCollection() != 'empty') {        
        openDialog("dialog-todo", 'New to-do', submitNewTodo);       
    } else {
        alert('No collection selected!');
    }
}

// submit the new to-do
function submitNewTodo(e) {

    e.preventDefault();

    // find the last clicked collection which will hold the new to-do
    let collection =  findElement("name", fetchActiveCollection(), collections);;
    
    // validate the new to-dos subject
    const formData = new FormData(e.target);    
    const subject = formData.get("todo-subject");
    const validation = validateInput(subject, collection["todos"], "subject");

    // if name valid, proceed to create the to-do
    if (validation === 'valid') {

        const due = formData.get("todo-date");        
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
            due,            
            notes,
            priority,
        ]
        addTodo(collection, todo);
        storageSaveCollections(collections); 
        location.reload();

    } else if (validation != 'valid' && validation != 'null') {
        alert('Editing the to-do failed.\nreason: ' + validation);
    }      
}

// delete active (last clicked) to-do
export function deleteTodo() {

    // check if active to-do exists
    if (fetchActiveTodo() != 'empty') {

        // confirmation, has to match "yes", no case sensitivity
        const confirm = prompt('Are you sure you want to delete the to-do named: "' + fetchActiveTodo() + '"?\nConfirm by writing "yes"');    
        if (confirm != undefined && confirm != null) {

            // check confirmation, proceed to remove to-do
            if (confirm.toLocaleLowerCase() === 'yes') {

                // find the last clicked collection which the to-do is to be removed from
                const collection = findElement("name", fetchActiveCollection(), collections);;
                const collectionDiv = document.querySelector('.collection#' + fetchActiveCollection());

                // get the div that holds the to-do 
                const toDelete = document.querySelector('[data=last-clicked-todo]');                
                
                // remove to-do from collection and page
                removeTodo(fetchActiveTodo(), collection["todos"]);
                toDelete.remove();
                storageSaveCollections(collections);                
                saveActiveTodo('');

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

// open editing dialog for a to-do
export function editTodo() {

    openDialog("dialog-todo", 'Edit to-do', submitEditedTodo);
    const dialog = document.querySelector('#dialog-todo');    
    const todoDetails = document.querySelector('.content-container .to-do-details');

    // get initial values from the to-do into the dialogs inputs
    const inputSubject = dialog.querySelector('#todo-subject');    
    inputSubject.value = todoDetails.querySelector('.to-do-subject').textContent;

    const inputDate = dialog.querySelector('#todo-date');
    console.log(inputDate);
    
    if (todoDetails.querySelector('.to-do-subject').textContent.toLocaleLowerCase() === 'no date set') {
        inputDate.value = '';
    } else {
        console.log('here');
        inputDate.value = todoDetails.querySelector('.to-do-subject').value;
    }  

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

    // find the position of the to-be-edited to-do
    let collectionIndex = findElementIndex("name", fetchActiveCollection(), collections);
    let todoIndex = findElementIndex("subject", fetchActiveTodo(), collections[collectionIndex]["todos"]);
    
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
        collections[collectionIndex]["todos"][todoIndex]["date"] = formData.get("todo-date");
        collections[collectionIndex]["todos"][todoIndex]["notes"] = formData.get("todo-notes");                      
        const str = formData.get("todo-priority");        
        let priority = 0;
        switch (str) {
            case 'Medium':
                priority = 1;
                break;
            case 'High':
                priority = 2;
        }       
        storageSaveCollections(collections);
        location.reload();

    } else if (validation != 'valid' && validation != 'null' && validation != 'default') {
        alert('Adding the new to-do failed.\nreason: ' + validation);
    }    
}

// invert the to-dos status (done, not done)
export function changeTodoStatus(e) {
    
    e.stopImmediatePropagation()    
    
    const todoDetails = e.target.closest('.to-do-details')     
    if (!fetchActiveTodo() || fetchActiveTodo() != todoDetails.querySelector('.to-do-subject').textContent) {
        saveActiveTodo(todoDetails.querySelector('.to-do-subject').textContent);
    }    
    
    switch (fetchActiveCollection().toLocaleLowerCase()) {
        case 'today': 
        case 'this week': 
        case 'this month':
        case 'no date set':            
            saveActiveCollection(todoDetails.querySelector('h1').textContent);;
            break;

        default:
            break;
    }

    // find the position of the to-be-edited to-do
    let collectionIndex = findElementIndex("name", fetchActiveCollection(), collections);
    let todoIndex = findElementIndex("subject", fetchActiveTodo(), collections[collectionIndex]["todos"]);

    // invert status
    if (collections[collectionIndex]["todos"][todoIndex]["status"]) {
        collections[collectionIndex]["todos"][todoIndex]["status"] = false;        
    } else {
        collections[collectionIndex]["todos"][todoIndex]["status"] = true;
    }

    // save and refresh page
    storageSaveCollections(collections);
    location.reload();
        
}

function findTodosByTime(array, currentDate, period) {
    let todos = [];    
    if (period === 'today') {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i]["todos"].length; j++) {
                const d = new Date(collections[i]["todos"][j]["date"]);
                // trim off hours, minutes and seconds from the date value
                const str = "'" + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + "'"
                const t = new Date(str).getTime();                
                if (currentDate === t) {
                    let entry = {
                        "collection": array[i]["name"], 
                        "todo": array[i]["todos"][j]
                    }                                                          
                    todos.push(entry);
                }
            }
        }
    }

    return todos;
}

// open to-dos based on period
export function getTodosByPeriod(timePeriod) {
    
    const period = timePeriod.toLocaleLowerCase();
    saveActiveCollection(period);
    saveActiveTodo('');

    // current date as ms
    const today = new Date();
    const str = "'" + today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate() + "'"
    const time = new Date(str).getTime();    

    const array = findTodosByTime(collections, time, period);
    console.log(array);
    
    changeHeaderText(period);
    openTodoArray(array);

}

