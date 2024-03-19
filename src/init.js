import plus from './images/plus.png';
import minus from './images/minus.png';
import { addCollection, removeCollection } from './collections';
import { addTodo } from './todo';
import { createNewCollection, deleteCollection, activateCollection, createNewTodo, deleteTodo, activateTodo, minimizeCollection } from './buttonFunc';
import { createButton, createCollectionDiv } from './dom';


// init array for collections
export let collections = [];

export function init() {

    // add & remove collection buttons
    const collectionControls = document.querySelector('#collection-controls');
    const addCollectionBtn = collectionControls.appendChild(createButton('collection-control-btn', '', createNewCollection, plus));
    const removeCollectionBtn = collectionControls.appendChild(createButton('collection-control-btn', '', deleteCollection, minus))

    // to-do controls
    const todoControls = document.querySelector('#to-do-controls');
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
    const collectionsContainer = document.querySelector('#collections');    
    collectionsContainer.appendChild(createCollectionDiv(collections[i], activateCollection, activateTodo, minimizeCollection));
}
// EXAMPLES ---------------
