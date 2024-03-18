import plus from './images/plus.png';
import minus from './images/minus.png';
import { addCollection, removeCollection } from './collections';
import { addTodo, removeTodo } from './todo';
import { validateInput } from './validate';
import { createButton, clearCollectionDiv, createTodoDiv, createCollectionDiv, addEmptyDiv, openTodo, openCollection, clearContentArea  } from './dom';

// references
const collectionControls = document.querySelector('#collection-controls');
const collectionsContainer = document.querySelector('#collections');
const todoControls = document.querySelector('#to-do-controls');

// init array for collections
export let collections = [];

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

// save last clicked collection / to-do and
// show the details in content area
export let lastClickedId = '';
export let lastClickedCollection = '';
export let lastClickedClass = '';

// button function: open collection / to-do
function open(e) {    
    
    let changeLastClicked = false;

    // if a collection is clicked
    if (e.target.classList[0] === 'collection-btn' && e.target.parentNode.parentNode.id != lastClickedId) {
        
        lastClickedCollection = lastClickedId = e.target.closest('.collection').id;        
        changeLastClicked = true;

        // open the clicked collection
        collections.forEach((collection) => {
            if (collection["name"] === lastClickedId) {                
                openCollection(collection);
            }
        });              
        
    // if a to-do is clicked
    } else if (e.target.classList[0] === 'todo-header-subject' && e.target.parentNode.id != lastClickedId) { 
        
        lastClickedCollection = e.target.closest('.collection').id;                
        lastClickedId = e.target.closest('.to-do').id;        
        changeLastClicked = true;        
        
        // open the clicked to-do
        collections.forEach((collection) => {
            if (collection["name"] === lastClickedCollection) {                
                collection.todos.forEach((todo) => {
                    if (todo["subject"] === lastClickedId) {
                        openTodo(todo);
                    }
                });                
            }
        });       
    }
    
    if (changeLastClicked) {
        // remove 'last clicked' attribute if new button is clicked
        const divs = collectionsContainer.querySelectorAll('.collection button, .to-do p');
        divs.forEach((btn) => {
            if (btn.getAttribute('data') === 'last-clicked') {            
                btn.removeAttribute('data');            
            }
        });
        // set 'last clicked' attribute to button that was clicked
        e.target.setAttribute('data', 'last-clicked')
        lastClickedClass = e.target.classList[0];
    } 
}

// button function: delete collection
function deleteCollection() {
    
    // check if collection was last clicked element
    if (lastClickedClass === 'collection-btn' && lastClickedId.length != 0 && lastClickedId != null && lastClickedId != undefined) {

        // confirmation, has to match "yes", no case sensitivity
        const confirm = prompt('Are you sure you want to delete the collection named: "' + lastClickedId + '"?\nConfirm by writing "yes"');
        
        if (confirm != undefined && confirm != null) {
            if (confirm.toLocaleLowerCase() === 'yes') {
                removeCollection(lastClickedId, collections);
                clearCollectionDiv(lastClickedId);
                lastClickedClass = '';
                lastClickedCollection = '';
                lastClickedId = '';
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
    if (lastClickedClass === 'todo-header-subject') {
        // confirmation, has to match "yes", no case sensitivity
        const confirm = prompt('Are you sure you want to delete the to-do named: "' + lastClickedId + '"?\nConfirm by writing "yes"');
        
        if (confirm != undefined && confirm != null) {
            if (confirm.toLocaleLowerCase() === 'yes') {
                // find the last clicked collection which the to-do is to be removed from
                const collection = collections.find(element => element["name"] === lastClickedCollection);
                const collectionDiv = document.querySelector('.collection#' + lastClickedCollection);

                // get the div that holds the to-do 
                const toDelete = document.querySelector('.todo-header-subject[data="last-clicked"]').closest('.to-do');
                
                // remove to-do from collection and page
                removeTodo(lastClickedId, collection["todos"]);
                toDelete.remove()
                lastClickedCollection = '';
                lastClickedClass = '';
                lastClickedId = '';

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

// init page
export function init() {

    // add & remove collection buttons
    collectionControls.appendChild(createButton('collection-control-btn', '', createNewCollection, plus));
    collectionControls.appendChild(createButton('collection-control-btn', '', deleteCollection, minus))

    // to-do controls
    todoControls.appendChild(createButton('', '', createNewTodo, plus));
    todoControls.appendChild(createButton('', '', deleteTodo, minus));
    
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
    collectionsContainer.appendChild(createCollectionDiv(collections[i], open));
}
// EXAMPLES ---------------

