// check input is not null, undefined or empty and is not duplicate
// if array and key parameters left empty, no duplicate check
export function validateInput(input, array = [], key = '') {

    if (input === null) {
        return 'null';
    } else if (input === undefined) {
        return 'undefined';
    } else {        
        if (input.length === 0) {
            return 'empty';            
        } else if (input.length != 0 && input.trim().length === 0) {
            return 'whitespace'
        } else {            
            // check if name already exists
            let duplicate = false;
            if (array != [] && key != '') {
                array.forEach((element) => {
                    if (element[key].toLocaleLowerCase() === input.trim().toLocaleLowerCase()) {
                        duplicate = true;                            
                    }           
                });
            }            
            if (duplicate) {
                return 'duplicate';
            } else {
                return 'valid';
            }
        }          
    }
}
