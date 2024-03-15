import { collections, init } from './init';
import { createCollection, removeCollection, displayCollection, lastClicked } from './collections';
import { createTodo, removeTodo } from './todo';

init()

// EXAMPLES ---------------
collections.push(createCollection('Studies'));
collections.push(createCollection('Hobbies'));
collections.push(createCollection('Work'));
collections.push(createCollection('Misc'));
collections.push(createCollection('Secret-project'));

collections[0].addTodo(createTodo("Study math test", "10.5.2024", "Calculus", 2));
collections[0].addTodo(createTodo("group project", "20.5.2024", "Finish the presentation...", 2));
collections[0].todos[0].editStatus();

collections[1].addTodo(createTodo("Learn programming", "", "Slow and steady...", 0));
collections[1].addTodo(createTodo("Get new running shoes", "", "Nikes?", 1));

collections[3].addTodo(createTodo("Car oil change", "30.3.2024", "change filters", 1));
collections[3].addTodo(createTodo("Dentist appointment", "", "", 1));
collections[3].addTodo(createTodo("Book flights, hotel, train, another hotel, villa, more flights, more hotels, motels, all around the world", "1.6.2024", "", 1));

collections[4].addTodo(createTodo("Secrets", "25.5.2025", "", 1));
// EXAMPLES ---------------

for (let i = 0; i < collections.length; i++) {
    displayCollection(collections[i]);
}

