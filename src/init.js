import plus from './images/plus.png';
import minus from './images/minus.png';
import { addCollection } from './collections';
import { createNewCollection, deleteCollection, createNewTodo, deleteTodo, getTodosByPeriod, getTodosByPriority, getDone } from './buttonFunc';
import { changeHeaderText, createButton, createCollectionDiv, openCollection, setButtonImage } from './dom';
import { storageAvailable, storageInit, storageFetchCollections, storageSaveCollections, fetchActiveCollection } from './storage';
import { addTodo } from './todo';

// init array for collections
export let collections = [];

export function init() {

    if (storageAvailable("localStorage")) {
        if (!localStorage.getItem("collections")) {
            storageInit(); 
            // add some default collections
            addCollection('Credits', collections);
            addTodo(collections[0], [
                'Credits',
                '',
                'Credits....',
                0
                ]
            )
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

    // period buttons 
    const periodBtns = document.querySelectorAll('.period-btn');
    periodBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const period = e.target.textContent;
            getTodosByPeriod(period);
        })
    });

    // priority buttons
    const prioBtns = document.querySelectorAll('.prio-btn');
    setButtonImage(prioBtns[0], 'clock');
    prioBtns[0].id = 'High';    
    setButtonImage(prioBtns[1], 'circle');
    prioBtns[1].id = 'Medium';
    setButtonImage(prioBtns[2], 'snail');
    prioBtns[2].id = 'Low';
    setButtonImage(prioBtns[3], 'check');
    prioBtns[3].id = 'Done';

    prioBtns.forEach(btn => {
        if (btn.id != 'Done') {
            btn.addEventListener('click', function(e) {
                const prio = e.target.id;                
                getTodosByPriority(prio);
            })
        } else {
            btn.addEventListener('click', getDone);
        }  
    });

    // add & remove collection buttons
    const collectionControls = document.querySelector('#collection-controls');
    const addCollectionBtn = collectionControls.appendChild(createButton('collection-control-btn', '', createNewCollection, plus));
    const removeCollectionBtn = collectionControls.appendChild(createButton('collection-control-btn', '', deleteCollection, minus))

    // to-do controls
    const todoControls = document.querySelector('#to-do-controls');
    todoControls.appendChild(createButton('', '', createNewTodo, plus));
    todoControls.appendChild(createButton('', '', deleteTodo, minus));

    // open the last activated collection/period/priority when loading/refreshing page
    switch (fetchActiveCollection().toLocaleLowerCase()) {
        case 'today':            
        case 'week':
        case 'month':
        case 'no date set':
            getTodosByPeriod(fetchActiveCollection().toLocaleLowerCase());
            break;

        case 'high':
        case 'medium':
        case 'low':
            getTodosByPriority(fetchActiveCollection().toLocaleLowerCase());
            break;

        case 'done':
            getDone();
            break;

        case 'empty':           
            break;

        default:
            const collection = collections.find(collection => collection["name"] === localStorage.getItem("lastActiveCollection"));        
            const collectionDivs = document.querySelectorAll('.collection');
            collectionDivs.forEach(div => {
                if (div.id === localStorage.getItem("lastActiveCollection")) {
                    div.setAttribute('data', 'last-clicked-collection');
                }            
            });
            openCollection(collection);
            changeHeaderText(localStorage.getItem("lastActiveCollection"));
            break;
    }
}
