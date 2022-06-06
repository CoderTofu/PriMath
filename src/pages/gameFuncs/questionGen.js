import getRandomInt from "./randomInt";

export default function generateQuestions(challenges) {
    let questionType = challenges[Math.floor(Math.random() * challenges.length)];
    let operation = questionType.name;
    let firstValue = getRandomInt(questionType.min_val, questionType.max_val);
    let secondValue = getRandomInt(questionType.min_val, questionType.max_val);
    let answer, symbol, type_multiplier, range_multiplier;

    // Set keys for important and specific to type questions
    if (operation === "Addition") {
        answer = genChallengeAddition(firstValue, secondValue);
        symbol = "+";
        type_multiplier = 1;
    } else if (operation === "Subtraction") {
        answer = genChallengeSubtraction(firstValue, secondValue);
        symbol = "-";
        type_multiplier = 1.2;
    } else if (operation === "Multiplication") {
        answer = genChallengeMultiplication(firstValue, secondValue);
        symbol = "x";
        type_multiplier = 1.5;
    } else if (operation === "Division") {
        answer = genChallengeDivision(firstValue, secondValue);
        symbol = "/";
        type_multiplier = 1.7;
    }

    // Set additional points multiplier for value range
    let valueDifference = Math.abs(firstValue, secondValue);
    if (valueDifference <= 5) {
        range_multiplier = 1.5;
    } else if (valueDifference <= 20) {
        range_multiplier = 2;
    } else if (valueDifference <= 50) {
        range_multiplier = 2.5;
    } else if (valueDifference <= 100) {
        range_multiplier = 3;
    } else if (valueDifference <= 500) {
        range_multiplier = 3.5;
    } else if (valueDifference <= 1000) {
        range_multiplier = 4;
    }

    const question = {
        type: operation,
        first_value: firstValue,
        second_value: secondValue,
        symbol: symbol,
        answer: roundToTwo(answer),
        type_multiplier,
        range_multiplier
    }

    return question
}

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

// Basic Arithmetic Functions
function genChallengeAddition(value1, value2) {
    return value1 + value2
}

function genChallengeSubtraction(value1, value2) {
    return value1 - value2
}

function genChallengeMultiplication(value1, value2) {
    return value1 * value2
}

function genChallengeDivision(value1, value2) {
    return value1 / value2
}
    //