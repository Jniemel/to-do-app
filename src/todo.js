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

        return { subject, date, notes, priority, getStatus, editStatus };

        //const getSubject = () => subject;
        //const editSubject = (newSubject) => subject = newSubject;
        //const getDate = () => date;
        //const editDate = (newDate) => due = newDate;
        //const getNotes = () => notes;
        //const editNotes = (newNotes) => notes = newNotes;
        //const getPriority = () => prio;
        //const editPriority = (newPriority) => prio = newPriority;
        //const getStatus = () => status;


        

        /* 15.3
        return { getSubject, editSubject, getDate, editDate, getNotes, editNotes, getPriority, changePriority, getStatus, changeStatus };
        */
    }
}

export function removeTodo(toRemove, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].subject === toRemove) {
            array.splice(i, 1);
            return array;
        }
    }
}
