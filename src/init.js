import plus from './images/plus.png';
import minus from './images/minus.png';
import { addCollection } from './collections';
import { addTodo } from './todo';
import { createNewCollection, deleteCollection, activateCollection, createNewTodo, deleteTodo, activateTodo, minimizeCollection } from './buttonFunc';
import { createButton, createCollectionDiv } from './dom';
import { storageAvailable, storageInit, storageFetchData, storageSaveData } from './storage';

// init array for collections
export let collections = [];

export function init() {

    if (storageAvailable("localStorage")) {     

        if (!localStorage.getItem("collections")) {            
            storageInit(); 
        } else {

            collections = storageFetchData(collections);
            for (let i = 0; i < collections.length; i++) {
                const collectionsContainer = document.querySelector('#collections');    
                collectionsContainer.appendChild(createCollectionDiv(collections[i]));
            }            
        }

    } else {        
         alert("No local storage available!\nCollections and to-do's cannot be saved!");
    }

    // add & remove collection buttons
    const collectionControls = document.querySelector('#collection-controls');
    const addCollectionBtn = collectionControls.appendChild(createButton('collection-control-btn', '', createNewCollection, plus));
    const removeCollectionBtn = collectionControls.appendChild(createButton('collection-control-btn', '', deleteCollection, minus))

    // to-do controls
    const todoControls = document.querySelector('#to-do-controls');
    todoControls.appendChild(createButton('', '', createNewTodo, plus));
    todoControls.appendChild(createButton('', '', deleteTodo, minus));
}
