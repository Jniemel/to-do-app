import plus from './images/plus.png';
import minus from './images/minus.png';
import { addCollection, removeCollection } from './collections';
import { addTodo } from './todo';
import { createButton, clearCollectionDiv, createTodoDiv, createCollectionDiv, openTodo, openCollection  } from './dom';

// references
const collectionControls = document.querySelector('#collection-controls');
export const collectionsContainer = document.querySelector('#collections');
const rightSide = document.querySelector('#right-side');

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
export let lastClickedClass = '';
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
                lastClickedId = '';
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

    if (lastClickedId.length != 0) {

        let todo = Array(4).fill('');
        let collection = collections.find(element => element["name"] === lastClickedId);    
        todo[0] = prompt('name');
        addTodo(collection, todo);
        const appendTo = collectionsContainer.querySelector('#' + lastClickedId);
        const divs = appendTo.querySelectorAll('div');
        divs.forEach((div) => {
            //console.log(div.getAttribute('class'));
            if (div.getAttribute('class') === 'empty') {
                div.remove();
            }
        });

        console.log(collection["todos"][collection["todos"].length - 1]["subject"].length);
        appendTo.appendChild(createTodoDiv(collection["todos"][collection["todos"].length - 1], open))
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
    rightSide.appendChild(createButton('test-btn', 'add-todo', createNewTodo));

    
}
