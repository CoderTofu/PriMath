export default function checkVals(selected) {
    // This function is to check whether the values given are appropriate
    let problemList = [];
    for (let i = 0; i < selected.length; i++) {
        const VALID_OPERATIONS = ["Addition", "Subtraction", "Multiplication", "Division"]
        let value = selected[i];
        let value_name = value.name;
        let maximum_value = value.max_val;
        let minimum_value = value.min_val;

        // Check if min val is greater than max val
        if (minimum_value > maximum_value) {
            problemList.push(`In ${value_name} challenge: The minimum value can't be greater than maximum value.`)
        }

        // Check if max val has value greater than 1000
        if (maximum_value > 1000) {
            problemList.push(`In ${value_name} challenge: The maximum value can't be greater than 1000.`)
        }

        if (minimum_value > 1000) {
            problemList.push(`In ${value_name} challenge: The minimum value can't be greater than 1000.`)
        }

        // Going below 1 for min value
        if (minimum_value < 1) {
            problemList.push(`In ${value_name} challenge: The minimum value can't be lower than 1.`)
        }

        if (maximum_value < 1) {
            problemList.push(`In ${value_name} challenge: The maximum value can't be lower than 1.`)
        }

        // Having null or empty strings for input
        if (minimum_value === "" || maximum_value === "" || isNaN(minimum_value) || isNaN(maximum_value)) {
            problemList.push(`In ${value_name} challenge: Values can't be empty.`)
        }

        if (VALID_OPERATIONS.includes(value_name)) {
            problemList.push(`TypeError: ${value_name} operation not recognized`)
        }
    }

    if (problemList.length === 0) {
        return true
    } else {
        return problemList
    }
}