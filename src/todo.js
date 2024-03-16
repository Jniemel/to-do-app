export function createTodo(todoSubject, todoDueDate, todoNotes, todoPriority = 0) {

    let subject = todoSubject;
    let date = todoDueDate.length != 0 ? todoDueDate : 'no date set';        
    let notes = todoNotes;
    let priority = todoPriority;
    let status = false;
    const getStatus = () => status;
    const editStatus = () => status = status ? false : true;
    const short = () => subject.slice(0, 50) + "...";

    return { subject, date, notes, priority, getStatus, editStatus, short };
    
}

export function addTodo(collection, todo = { subject: '', date: '', notes: '', priority: 0}) {
    if (todo[0].trim() === 0) {
        alert("Please add subject!");
    } else {
        collection.todos.push(createTodo(todo[0], todo[1], todo[2], todo[3]))
    }
}

/*

export function removeTodo(toRemove, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].subject === toRemove) {
            array.splice(i, 1);
            return array;
        }
    }
    alert('No such to-do found');
}
*/