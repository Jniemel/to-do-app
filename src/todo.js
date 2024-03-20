export function createTodo(todoSubject, todoDueDate, todoNotes, todoPriority = 0) {

    let subject = todoSubject;
    let date = todoDueDate.length != 0 ? todoDueDate : 'no date set';        
    let notes = todoNotes;
    let priority = todoPriority;
    let status = false;    
    const short = () => subject.slice(0, 50) + "...";

    return { subject, date, notes, priority, status, short };
    
}

export function addTodo(collection, todo = { subject: '', date: '', notes: '', priority: 0}) {
    collection.todos.push(createTodo(todo[0], todo[1], todo[2], todo[3]))
}

export function removeTodo(toRemove, todos) {
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].subject === toRemove) {
            todos.splice(i, 1);
            return todos;
        }
    }
    alert('No such to-do found');
}
