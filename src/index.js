import './styles.css';
import { collectionsContainer, collections, open, init } from './init';
import { addCollection } from './collections';
import { createTodo } from './todo';
import { createCollectionDiv } from './dom';

init()

// EXAMPLES ---------------
addCollection('Studies', collections);
addCollection('Hobbies', collections);
addCollection('Work', collections);
addCollection('Misc', collections);
addCollection('Secret-project', collections);
collections[0].addTodo(createTodo("Study math test", "10.5.2024", "Calculus", 2));
collections[0].addTodo(createTodo("group project", "20.5.2024", "Finish the presentation...", 2));
collections[0].todos[0].editStatus();
collections[1].addTodo(createTodo("Learn programming", "", "Slow and steady...", 0));
collections[1].addTodo(createTodo("Get new running shoes", "", "Nikes?", 1));
collections[3].addTodo(createTodo("Car oil change", "30.3.2024", "change filters", 1));
collections[3].addTodo(createTodo("Dentist appointment", "", "", 1));
collections[3].todos[1].editStatus();
collections[3].addTodo(createTodo("Book flights, hotel, train, another hotel, villa, more flights, more hotels, motels, all around the world", "1.6.2024", "", 1));
collections[4].addTodo(createTodo("Secrets", "25.5.2025", "", 1));

for (let i = 0; i < collections.length; i++) {
    collectionsContainer.appendChild(createCollectionDiv(collections[i], open));
}
// EXAMPLES ---------------
