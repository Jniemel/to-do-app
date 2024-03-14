import init from './init';
import { createCollection, removeCollection, displayCollections } from './collections';
import { createTodo } from './todo';

let collections = [];

collections.push(createCollection('test1'));
collections.push(createCollection('test2'));
collections.push(createCollection('test3'));
collections.push(createCollection('test4'));



collections[0].add(createTodo("firstTodo", "25.5.2025", "Fresh"));
collections[1].add(createTodo("secondTodo", "25.5.2026", "VeryFresh"));
collections[1].add(createTodo("thirdTodo", "25.5.2027", "SuperVeryFresh"));

displayCollections(collections);

/*
collections = removeCollection("test2", collections);
console.log(collections);
displayCollections(collections, true);
*/
