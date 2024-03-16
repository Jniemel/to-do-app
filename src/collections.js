// create a to-do collection
function createCollection(collectionName) {

    let name = collectionName;
    let todos = [];   

    const addTodo = (todo) => todos.push(todo);
    const clearTodos = () => todos.length = 0;
    const short = () => name.slice(0, 17) + "...";
    function progress() {
        // calculate the collections progress from # of done to-do's
        let total = todos.length;
        let done = 0;
        for (let i = 0; i < total; i++) {
            if (todos[i].getStatus()) {
                done += 1;
            }
        }
        let percent = Math.trunc((done / total) * 100);
        return  percent + "%";
    }

    return {  name, todos, addTodo, clearTodos, short, progress };
}

export function addCollection(name, collections) {
    return collections.push(createCollection(name)); 
}

// remove a collection from array
export function removeCollection(name, collections) {
    for (let i = 0; i < collections.length; i++) {
        if (collections[i]["name"] === name) {
            collections.splice(i, 1);
            return collections;
        }
    }
}

/*
// save last clicked collection / to-do and
// show the details in content area
export let lastClicked = [];

function open(e) {
    
    // remove 'last clicked' attribute if new button is clicked
    const divs = placement.querySelectorAll('.collection button, .to-do p');
    divs.forEach((btn) => {
        if (btn.getAttribute('data') === 'last-clicked') {            
            btn.removeAttribute('data');            
        }
    });
    
    // set 'last clicked' attribute to button that was clicked
    e.target.setAttribute('data', 'last-clicked')

    // store the class and id of last clicked collection / to-do
    if (e.target.classList[0] === 'collection-btn') {          
        lastClicked[0] = e.target.parentNode.parentNode.classList[0];    
        lastClicked[1] = e.target.parentNode.parentNode.id;

    } else if (e.target.classList[0] === 'sub-txt') {        
        lastClicked[0] = e.target.parentNode.classList[0];
        lastClicked[1] = e.target.parentNode.id;
    }

    // display the collections details in content area
    clearContainer();
    collections.forEach((element) => {        
        if (element["name"] === lastClicked[1]) {            
            openCollection(element["todos"]);
        }
    });
}
*/