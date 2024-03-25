import { addCollection } from "./collections";
import { addTodo } from "./todo";

// from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// checked: 20.3.2024
export function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
}
  
// init collections to localstorage
export function storageInit() {
    localStorage.setItem("collections", []);
}

// save collections to localstorage
export function storageSaveCollections(collections) {
    localStorage.setItem("collections", JSON.stringify(collections));
}

// fetch collections from localstorage
export function storageFetchCollections(collections) {

    collections = [];
    const data = JSON.parse(localStorage.getItem("collections"));    

    for (let i = 0; i < data.length; i++) {
        
        addCollection(data[i]["name"], collections);

        if (data[i]["todos"].length != 0) {
            for (let j = 0; j < data[i]["todos"].length; j++) {

                const todo = [
                    data[i]["todos"][j]["subject"], 
                    data[i]["todos"][j]["date"], 
                    data[i]["todos"][j]["notes"],
                    data[i]["todos"][j]["priority"],
                    data[i]["todos"][j]["status"]
                ]
                addTodo(collections[collections.length - 1], todo)
            }
        }        
    }    

    return collections;
}

export function saveActiveCollection(id) {
    sessionStorage.setItem("activeCollection", id);
    localStorage.setItem("lastActiveCollection", id);
}

export function fetchActiveCollection() {
    if (!sessionStorage.getItem("activeCollection") || sessionStorage.getItem("activeCollection") === '') {
        if (!localStorage.getItem("lastActiveCollection") || localStorage.getItem("lastActiveCollection") === '') {
            return 'empty';
        } else {
            return localStorage.getItem("lastActiveCollection");
        }
    } else {
        return sessionStorage.getItem("activeCollection");
    }    
}

export function saveActiveTodo(id) {
    sessionStorage.setItem("activeTodo", id);
}

export function fetchActiveTodo() {
    if (!sessionStorage.getItem("activeTodo") || sessionStorage.getItem("activeTodo") === '') {
        return 'empty';
    } else {
        return sessionStorage.getItem("activeTodo");
    }
}
