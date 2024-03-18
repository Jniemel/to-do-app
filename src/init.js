import plus from './images/plus.png';
import minus from './images/minus.png';
import { addCollection, removeCollection } from './collections';
import { addTodo, removeTodo } from './todo';
import { validateInput } from './validate';
import { createButton, clearCollectionDiv, createTodoDiv, createCollectionDiv, openTodo, openCollection, clearContentArea  } from './dom';

// references
const collectionControls = document.querySelector('#collection-controls');
export const collectionsContainer = document.querySelector('#collections');
const todoControls = document.querySelector('#to-do-controls');

// init array for collections
export let collections = [];

// create a new collection and display it on the page
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

export function open(e) {    
    
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
            if (collection["name"] === lastClickedCollection.id) {                
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

// delete collection
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

// creat a new to do and add it to active (lastClicked) collection
function createNewTodo() {

    if (lastClickedCollection.length != 0) {
        
        // find the last clicked collection which will hold the new to-do
        let collection = collections.find(element => element["name"] === lastClickedCollection);
        
        // prompt & validate the new to-dos subject
        let input = prompt('Subject of the new to-do: ');
        let validation = validateInput(input, collection["todos"], "subject");
        
        if (validation === 'valid') {            
            // init a new to-do and add into collection  
            let todo = Array(4).fill('');                  
            todo[0] = input.trim()
            console.log(todo[0]);            
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

        } else if (validation != 'valid' && validation != 'null') {
            alert('Adding the new to-do failed.\nreason: ' + validation);
        }       
    }
}

function deleteTodo() {
    if (lastClickedClass === 'todo-header-subject') {
        
        // find the last clicked collection which the to-do is to be removed from
        let collection = collections.find(element => element["name"] === lastClickedCollection);

        // get the div that holds the to-do 
        let toDelete = document.querySelector('.todo-header-subject[data="last-clicked"]').closest('.to-do');
        
        // remove to-do from collection and page
        removeTodo(lastClickedId, collection["todos"]);
        toDelete.remove()

        // refrest content area
        openCollection(collection);
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
