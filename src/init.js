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
    
    // storage test buttons
    const body = document.querySelector('body');
    const fetchBtn = document.createElement('button');
    fetchBtn.textContent = 'fetch';
    fetchBtn.addEventListener('click', () => {
        console.log(storageFetchData(collections));
    });
    body.appendChild(fetchBtn);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'save';
    saveBtn.addEventListener('click', () => {
        storageSaveData(collections);
    });
    body.appendChild(saveBtn);

}

let lorem = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.';

/*
// EXAMPLES ---------------
addCollection('Studies', collections);
addCollection('Hobbies', collections);
addCollection('Work', collections);
addCollection('Misc', collections);
addCollection('Secret-project', collections);
addTodo(collections[0], ["Study to math test", "10.5.2024", "Calculus", 1]);
addTodo(collections[0], ["group project", "20.5.2024", "Finish the presentation...", 2]);
addTodo(collections[0], ["Learn programming", "", lorem, 0]);
collections[0].todos[0]["status"] = true;
// EXAMPLES ---------------
*/