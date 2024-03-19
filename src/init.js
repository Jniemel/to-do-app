import plus from './images/plus.png';
import minus from './images/minus.png';
//import { addCollection, removeCollection } from './collections';
import { addCollection } from './collections';
//import { addTodo, removeTodo } from './todo';
import { addTodo } from './todo';
//import { validateInput } from './validate';
// import { createButton, clearCollectionDiv, createTodoDiv, createCollectionDiv, addEmptyDiv, openTodo, openCollection, clearContentArea, openNewTodoDialog } from './dom';
import { createNewCollection, deleteCollection, activateCollection, createNewTodo, deleteTodo, activateTodo, minimizeCollection } from './buttonFunc';
import { createButton, createCollectionDiv } from './dom';

// references
//const collectionControls = document.querySelector('#collection-controls');
//const collectionsContainer = document.querySelector('#collections');
//const todoControls = document.querySelector('#to-do-controls');


// init array for collections
export let collections = [];

/*
// button function: create a new collection and display it on the page
function createNewCollection() {

    let input = prompt('Name of the new collection:');
    let validation = validateInput(input, collections, "name");
    
    if (validation === 'valid') {
        addCollection(input.trim(), collections)             
        collectionsContainer.appendChild(createCollectionDiv(collections[collections.length - 1], open));
    } else if (validation != 'valid' && validation != 'null') {
        alert('Adding the new collection failed.\nreason: ' + validation);
    }
}

let lastClickedCollection = '';
let lastClickedTodo = '';

// activate collection
function activateCollection(e) {    
    
    // check if different collection clicked
    const clicked = e.target.closest('.collection');
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

// activate to-do
function activateTodo(e) {

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

// button function: delete collection
function deleteCollection() {
    
    // check if active collection exists
    if (lastClickedCollection != '') {

        // confirmation, has to match "yes", no case sensitivity
        const confirm = prompt('Are you sure you want to delete the collection named: "' + lastClickedCollection + '"?\nConfirm by writing "yes"');
        if (confirm != undefined && confirm != null) {

            // check confirmation, proceed to remove the collection
            if (confirm.toLocaleLowerCase() === 'yes') {
                removeCollection(lastClickedId, collections);
                clearCollectionDiv(lastClickedId);                
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

// button function: create a new to do and add it to active (lastClicked) collection
function createNewTodo() {

    if (lastClickedCollection.length != 0) {
        
        // find the last clicked collection which will hold the new to-do
        let collection = collections.find(element => element["name"] === lastClickedCollection);
        
        openNewTodoDialog();

        
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
             
    }
}

// button function: delete active (last clicked) to-do
function deleteTodo() {

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
*/

// init page
export function init() {

    // add & remove collection buttons
    const collectionControls = document.querySelector('#collection-controls');
    const addCollectionBtn = collectionControls.appendChild(createButton('collection-control-btn', '', plus));
    addCollectionBtn.addEventListener('click', (e) => {
        console.log('ok');
    });

    collectionControls.appendChild(createButton('collection-control-btn', '', minus))

    // to-do controls
    const todoControls = document.querySelector('#to-do-controls');
    todoControls.appendChild(createButton('', '', plus));
    todoControls.appendChild(createButton('', '', minus));
    
}

let lorem = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.';

// EXAMPLES ---------------
addCollection('Studies', collections);
addCollection('Hobbies', collections);
addCollection('Work', collections);
addCollection('Misc', collections);
addCollection('Secret-project', collections);

addTodo(collections[0], ["Study to math test", "10.5.2024", "Calculus", 1]);
addTodo(collections[0], ["group project", "20.5.2024", "Finish the presentation...", 2]);
addTodo(collections[0], ["Learn programming", "", lorem, 0]);
collections[0].todos[0].editStatus();

/*
collections[1].addTodo(createTodo("Get new running shoes", "", "Nikes?", 1));
collections[3].addTodo(createTodo("Car oil change", "30.3.2024", "change filters", 1));
collections[3].addTodo(createTodo("Dentist appointment", "", "", 1));
collections[3].todos[1].editStatus();
collections[3].addTodo(createTodo("Book flights, hotel, train, another hotel, villa, more flights, more hotels, motels, all around the world", "1.6.2024", "", 1));
collections[4].addTodo(createTodo("Secrets", "25.5.2025", "", 1));
*/
for (let i = 0; i < collections.length; i++) {
    const collectionsContainer = document.querySelector('#collections');    
    collectionsContainer.appendChild(createCollectionDiv(collections[i], activateCollection, activateTodo, minimizeCollection));
}
// EXAMPLES ---------------
/*
const min = document.createElement('button');
min.textContent = '-';
min.addEventListener('click', stopPropagationTest);
const minPlace = document.querySelector('#Studies .collection-header');
minPlace.appendChild(min);

function stopPropagationTest(e) {    
    e.stopImmediatePropagation();

}
*/