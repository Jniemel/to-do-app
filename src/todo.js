import './styles.css';

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

export function removeTodo(toRemove, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].subject === toRemove) {
            array.splice(i, 1);
            return array;
        }
    }
    alert('No such to-do found');
}
