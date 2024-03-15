import './styles.css';
import plus from './plus.png';
import minus from './minus.png';
import { createCollection, removeCollection, clearCollectionDiv, displayCollection, lastClicked } from './collections';

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

// init array for collections
export let collections = [];

// create a new collection and display it on the page
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

    collectionControls.append(createButton('collection-control-btn', '', createNewCollection, plus), createButton('collection-control-btn', '', deleteCollection, minus));
    
}
