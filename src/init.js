import './styles.css';
import plus from './plus.png';
import minus from './minus.png';
import { createCollection, removeCollection, clearCollectionDiv, displayCollection, lastClicked } from './collections';

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

// placement reference 
const collectionControls = document.querySelector('#collection-controls');

// create a button
function createButton(cssClass, text, func, path = '') {

    const btn = document.createElement('button');
    btn.classList.add(cssClass);
    btn.textContent = text;    
    if (path.length != 0) {
        btn.style.backgroundImage = "url('" + path + "')";
    }    
    btn.addEventListener("click", func); 

    return btn;
}


export let collections = [];

export function createNewCollection() {
    let input = prompt('Name of the new collection:');
    if (input != null) {
        if (input.trim().length === 0) {
            alert('Name was left blank!');
        } else {
            collections.push(createCollection(input.trim()));            
            displayCollection(collections[collections.length - 1]);            
        }   
    } 
}

function deleteCollection() {
    if (lastClicked[1] === undefined) {
        alert('No collection selected!');
    } else {
        const confirm = prompt('Are you sure you want to delete the collection named: "' + lastClicked[1] + '"?\nConfirm by writing "yes"');
        
        if (confirm != undefined && confirm != null) {
            if (confirm.toLocaleLowerCase() === 'yes') {
                removeCollection(lastClicked[1], collections);
                clearCollectionDiv(lastClicked[1]);
                
            } else {
                alert('Confirmation did not match!');
            }
        }


        /*
        switch (confirm) {
            case undefined, null:
                alert('Confirmation was left blank');
                break;
            case confirm.toLocaleLowerCase() = 'yes':
                alert('DELETED');
                break;
            default:
                alert('Deletion cancelled');
        }
        
        
        
        if (confirm === undefined)
        if (confirm.toLowerCase() === 'yes') {
            collections = removeCollection(lastClicked[1], collections);
            clearCollectionsDiv();
            displayCollection(collections);
        } else {
            alert('Collection was not removed');
        }*/
    }
}

function editTodo() {
    let toEdit = prompt('To-do to edit:');
}

function editCollection() {
    let toEdit = prompt('Collection to edit:');

}

export function init() {
    /*
    // collection control buttons    
    const addCollectionBtn = collectionControls.querySelector('.collection-control-btn:first-child');
    const rmCollectionBtn = collectionControls.querySelector('.collection-control-btn:nth-child(2)');
    // add image and event listener to buttons
    addCollectionBtn.style.backgroundImage = "url('" + plus + "')";
    addCollectionBtn.addEventListener("click", createNewCollection);
    rmCollectionBtn.style.backgroundImage = "url('" + minus + "')";
    rmCollectionBtn.addEventListener("click", createNewCollection);
    */

    collectionControls.append(createButton('collection-control-btn', '', createNewCollection, plus), createButton('collection-control-btn', '', deleteCollection, minus));
    
    
    
    /*
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
    */
}
