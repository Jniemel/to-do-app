export function createTodo(todoSubject, todoDueDate, todoNotes, todoPriority = 0) {

    if (todoSubject.length === '') {
        alert('Please add subject!');
    } else { 
        let subject = todoSubject;
        let date = todoDueDate.length != 0 ? todoDueDate: 'no date set';        
        let notes = todoNotes;
        let priority = todoPriority;
        let status = false;
        const getStatus = () => status;
        const editStatus = () => status = status ? false : true;
        const short = () => subject.slice(0, 50) + "...";

        return { subject, date, notes, priority, getStatus, editStatus, short };
    }
}

/*
// append to-do's details
function todoDetails(todo) {   

    const div = document.createElement('div');
    div.classList.add('to-do-details');
    const sub = document.createElement('p');
    sub.textContent = todo["subject"];   
    const date = document.createElement('p');
    date.textContent = todo["date"];         
    const notes = document.createElement('p');
    notes.textContent = todo["notes"]; 
    const prio = document.createElement('p');
    prio.textContent = todo["priority"]; 
    const status = document.createElement('p');
    status.textContent = todo["status"];

    div.append(sub, date, notes, prio, status);

    return div;
}


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