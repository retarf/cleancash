export const AmountReducer = (state, action) => {
    let child = state.child;
    let salary = state.salary;
    let checked = state.checked;
    let sum = 0;
    switch (action.type) {
        case "setChild": {
            child = action.child;
            break;
        }
        case "setSalary": {
            salary = action.salary;
            break;
        }
        case "setChecked": {
            checked = action.checked;
            break;
        }
        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
    if (child !== undefined && salary !== undefined) {
        let fieldValue = (salary.value / child.fields.length).toFixed(2);
        sum = fieldValue * checked.length;
    }
    return {
        child: child,
        salary: salary,
        checked: checked,
        sum: sum,
    };
};