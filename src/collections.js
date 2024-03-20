// create a to-do collection
function createCollection(collectionName) {

    let name = collectionName;
    let todos = [];   

    //const addTodo = (todo) => todos.push(todo);
    const clearTodos = () => todos.length = 0;
    const short = () => name.slice(0, 17) + "...";
    function progress() {
        // calculate the collections progress from # of done to-do's
        let total = todos.length;
        if (total != 0) {
            let done = 0;
            for (let i = 0; i < total; i++) {
                if (todos[i]["status"]) {
                    done += 1;
                }
            }
            let percent = Math.trunc((done / total) * 100);
            return  percent + '%';
        } else {
            return '';
        }

    }

    return {  name, todos, clearTodos, short, progress };
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
