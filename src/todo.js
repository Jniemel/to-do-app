import './styles.css';

export function createTodo(todoSubject = '', dueDate = 'No date set', todoNotes = '', priority = 0) {

    /*
    let subject = todoSubject;
    let due = dueDate;
    let notes = todoNotes;

    const editSubject = (newSubject) => subject = newSubject;
    const editDate = (newDate) => due = newDate;
    const editNotes = (newNotes) => notes = newNotes;

    return { subject, due, notes, editSubject, editDate, editNotes};
    */
    if (todoSubject.length === 0) {
        alert('Please add subject!');
    } else {
        let todo = [todoSubject, dueDate, todoNotes, priority];
        return todo;
    }
}
