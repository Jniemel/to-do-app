import './styles.css';

export function createTodo(todoSubject, dueDate, todoNotes) {

    let subject = todoSubject;
    let due = dueDate;
    let notes = todoNotes;

    const editSubject = (newSubject) => subject = newSubject;
    const editDate = (newDate) => due = newDate;
    const editNotes = (newNotes) => notes = newNotes;

    return { subject, due, notes, editSubject, editDate, editNotes};
}

