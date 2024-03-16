import plus from './images/plus.png';
import minus from './images/minus.png';
import { addCollection, removeCollection } from './collections';
import { createButton, clearCollectionDiv, createTodoDiv, createCollectionDiv, openTodo, openCollection  } from './dom';

// references
const collectionControls = document.querySelector('#collection-controls');
export const collectionsContainer = document.querySelector('#collections');

// init array for collections
export let collections = [];

// create a new collection and display it on the page
function createNewCollection() {

    let input = prompt('Name of the new collection:');

    if (input != null) {
        // check if input was left empty
        if (input.trim().length === 0) {
            alert('Name was left blank!');            
        } else {
            // check if name already exists
            let duplicate = false;
            collections.forEach((collection) => {
                if (collection["name"].toLocaleLowerCase() === input.trim().toLocaleLowerCase()) {
                    alert('Collection with that name already exists!');
                    duplicate = true;             
                }
            });
            // if not duplicate, add new collection and display it
            if (!duplicate) {
                addCollection(input.trim(), collections)             
                collectionsContainer.appendChild(createCollectionDiv(collections[collections.length - 1], open));
            }
                                            
        }
    }           
} 

// save last clicked collection / to-do and
// show the details in content area
export let lastClickedId = '';
export let todoParent = '';

export function open(e) {    
    
    let changeLastClicked = false;

    // if a collection is clicked
    if (e.target.classList[0] === 'collection-btn' && e.target.parentNode.parentNode.id != lastClickedId) {        
        
        lastClickedId = e.target.closest('.collection').id;        
        changeLastClicked = true;

        // open the clicked collection
        collections.forEach((collection) => {
            if (collection["name"] === lastClickedId) {                
                openCollection(collection);
            }
        });              
        
    // if a to-do is clicked
    } else if (e.target.classList[0] === 'sub-txt' && e.target.parentNode.id != lastClickedId) {        
        
        todoParent = e.target.closest('.collection');        
        lastClickedId = e.target.closest('.to-do').id;        
        changeLastClicked = true;        
        
        // open the clicked to-do
        collections.forEach((collection) => {
            if (collection["name"] === todoParent.id) {                
                collection.todos.forEach((todo) => {
                    if (todo["subject"] === lastClickedId) {
                        openTodo(todo);
                    }
                });                
            }
        }); 
        
        /*
        const todos = todoParent.querySelectorAll('.todo-div .to-do');
        todos.forEach((todo) => {
            if (todo.id === lastClickedId) {
                console.log(todo);
            }
        });     
        */
        //console.log(document.querySelector('#' + lastClickedId + ' .to-do'));
        //openTodo(document.querySelector('to-do p #' + lastClickedId));
        
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
    } 
}

// delete collection
function deleteCollection() {

    if (lastClicked[0] === 'collection' && lastClicked[0].length != 0  && lastClicked[0].length != 0 && lastClicked[1] != null && lastClicked[1] != undefined) {

        const confirm = prompt('Are you sure you want to delete the collection named: "' + lastClicked[1] + '"?\nConfirm by writing "yes"');
        
        if (confirm != undefined && confirm != null) {
            if (confirm.toLocaleLowerCase() === 'yes') {
                removeCollection(lastClicked[1], collections);
                clearCollectionDiv(lastClicked[1]);
                lastClicked[0] = '';
                lastClicked[1] = '';
            } else {
                alert('Confirmation did not match!');
            }
        }
    } else {
        alert('No collection selected!');
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

    
}
