function calculate() {

    const number1 = Number(
        document.getElementById("number1").value
    );

    const number2 = Number(
        document.getElementById("number2").value
    );

    const operator = document.getElementById("operator").value;

    let result;

    if (operator === "+") {

        result = number1 + number2;

    } else if (operator === "-") {

        result = number1 - number2;

    } else if (operator === "*") {

        result = number1 * number2;

    } else if (operator === "/") {

        if (number2 === 0) {

            result = "Cannot divide by zero";

        } else {

            result = number1 / number2;

        }

    }

    document.getElementById("result").textContent =
        "Result: " + result;
}
function clearCalculator() {

    document.getElementById("number1").value = "";

    document.getElementById("number2").value = "";

    document.getElementById("result").textContent =
        "Result will appear here";
}