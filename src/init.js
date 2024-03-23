import plus from './images/plus.png';
import minus from './images/minus.png';
import { addCollection } from './collections';
import { createNewCollection, deleteCollection, activateCollection, createNewTodo, deleteTodo, activateTodo, minimizeCollection } from './buttonFunc';
import { changeHeaderText, createButton, createCollectionDiv, openCollection, setButtonImage } from './dom';
import { storageAvailable, storageInit, storageFetchCollections, storageSaveCollections, fetchActiveCollection } from './storage';

// init array for collections
export let collections = [];

export function init() {

    if (storageAvailable("localStorage")) {     

        if (!localStorage.getItem("collections")) {    

            storageInit(); 
            // add some default collections
            addCollection('Work', collections);
            addCollection('Studies', collections);
            addCollection('Hobbies', collections);
            addCollection('Projects', collections);
            addCollection('Misc', collections);
            storageSaveCollections(collections);
        } else {
            collections = storageFetchCollections(collections);
        }
                
        for (let i = 0; i < collections.length; i++) {
            const collectionsContainer = document.querySelector('#collections');    
            collectionsContainer.appendChild(createCollectionDiv(collections[i]));
        }            
        

    } else {        
         alert("No local storage available!\nCollections and to-do's cannot be saved!");
    }


    // priority buttons
    const prioBtns = document.querySelectorAll('.prio-btn');
    setButtonImage(prioBtns[0], 'clock');
    setButtonImage(prioBtns[1], 'circle');
    setButtonImage(prioBtns[2], 'snail');
    setButtonImage(prioBtns[3], 'check');

    // add & remove collection buttons
    const collectionControls = document.querySelector('#collection-controls');
    const addCollectionBtn = collectionControls.appendChild(createButton('collection-control-btn', '', createNewCollection, plus));
    const removeCollectionBtn = collectionControls.appendChild(createButton('collection-control-btn', '', deleteCollection, minus))

    // to-do controls
    const todoControls = document.querySelector('#to-do-controls');
    todoControls.appendChild(createButton('', '', createNewTodo, plus));
    todoControls.appendChild(createButton('', '', deleteTodo, minus));

    // open the last activated collection when loading/refreshing page
    if (localStorage.getItem("lastActiveCollection")) {        
        const collection = collections.find(collection => collection["name"] === localStorage.getItem("lastActiveCollection"));        
        const collectionDivs = document.querySelectorAll('.collection');
        collectionDivs.forEach(div => {
            if (div.id === localStorage.getItem("lastActiveCollection")) {
                div.setAttribute('data', 'last-clicked-collection');
            }            
        });
        openCollection(collection);
        changeHeaderText(localStorage.getItem("lastActiveCollection"));
    }
}
