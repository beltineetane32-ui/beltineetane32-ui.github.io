function calculateGrade() {

    const name = document.getElementById("name").value;

    const math = Number(
        document.getElementById("math").value
    );

    const english = Number(
        document.getElementById("english").value
    );

    const computer = Number(
        document.getElementById("computer").value
    );

    const science = Number(
        document.getElementById("science").value
    );


    const total = math + english + computer + science;

    const average = total / 4;


    let grade;


    if (average >= 70) {

        grade = "A";

    } else if (average >= 60) {

        grade = "B";

    } else if (average >= 50) {

        grade = "C";

    } else if (average >= 45) {

        grade = "D";

    } else if (average >= 40) {

        grade = "E";

    } else {

        grade = "F";

    }
if (average >= 40) {

    remark = "PASS";

} else {

    remark = "FAIL";

}

    document.getElementById("result").innerHTML =

        "<strong>Student:</strong> " + name + "<br>" +

        "<strong>Total Score:</strong> " + total + "<br>" +

        "<strong>Average:</strong> " + average.toFixed(2) + "<br>" +

        "<strong>Grade:</strong> " + grade + "<br>" +
        "<strong>Remark:</strong> " + remark;
}