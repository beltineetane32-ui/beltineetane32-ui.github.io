// ==========================================
// STUDENT MANAGER
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // GET HTML ELEMENTS
    // ==========================================

    const studentForm = document.getElementById("studentForm");
    const nameInput = document.getElementById("name");
    const classInput = document.getElementById("className");
    const subjectInput = document.getElementById("subject");
    const scoreInput = document.getElementById("score");

    const submitButton = document.getElementById("submitButton");
    const resetButton = document.getElementById("resetButton");
    const clearStudentsButton =
        document.getElementById("clearStudentsButton");

    const studentTableBody =
        document.getElementById("studentTableBody");

    const message = document.getElementById("message");
    const formTitle = document.getElementById("formTitle");

    const totalStudents =
        document.getElementById("totalStudents");

    const averageScore =
        document.getElementById("averageScore");

    const highestScore =
        document.getElementById("highestScore");

    const passedStudents =
        document.getElementById("passedStudents");


    // ==========================================
    // CHECK THAT HTML ELEMENTS EXIST
    // ==========================================

    if (
        !studentForm ||
        !nameInput ||
        !classInput ||
        !subjectInput ||
        !scoreInput ||
        !submitButton ||
        !resetButton ||
        !clearStudentsButton ||
        !studentTableBody
    ) {
        console.error(
            "Some HTML elements could not be found."
        );

        return;
    }


    // ==========================================
    // LOAD STUDENTS FROM LOCAL STORAGE
    // ==========================================

    let students = [];

    const savedStudents =
        localStorage.getItem("students");


    if (savedStudents) {

        try {

            students =
                JSON.parse(savedStudents);

            if (!Array.isArray(students)) {
                students = [];
            }

        } catch (error) {

            console.error(
                "Error loading students:",
                error
            );

            students = [];
        }
    }


    // ==========================================
    // EDITING STATE
    // ==========================================

    let editingIndex = null;


    // ==========================================
    // SAVE STUDENTS
    // ==========================================

    function saveStudents() {

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

    }


    // ==========================================
    // GENERATE STUDENT ID
    // ==========================================

    function generateStudentId() {

        return "STD-" + Date.now();

    }


    // ==========================================
    // GET GRADE
    // ==========================================

    function getGrade(score) {

        score = Number(score);

        if (score >= 70) {
            return "A";
        }

        if (score >= 60) {
            return "B";
        }

        if (score >= 50) {
            return "C";
        }

        if (score >= 45) {
            return "D";
        }

        if (score >= 40) {
            return "E";
        }

        return "F";
    }


    // ==========================================
    // DISPLAY STUDENTS
    // ==========================================

    function displayStudents() {

        // Clear existing rows
        studentTableBody.innerHTML = "";


        // No students
        if (students.length === 0) {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td colspan="7" style="text-align: center;">
                    No students found.
                </td>
            `;

            studentTableBody.appendChild(row);

            return;
        }


        // Display each student
        students.forEach(function (student, index) {

            const row =
                document.createElement("tr");


            const grade =
                getGrade(student.score);


            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.className}</td>
                <td>${student.subject}</td>
                <td>${student.score}</td>
                <td>${grade}</td>
                <td>
                    <button
                        type="button"
                        class="edit-btn"
                        data-index="${index}"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="delete-btn"
                        data-index="${index}"
                    >
                        Delete
                    </button>
                </td>
            `;


            studentTableBody.appendChild(row);

        });


        // ==========================================
        // EDIT BUTTONS
        // ==========================================

        const editButtons =
            document.querySelectorAll(".edit-btn");


        editButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(button.dataset.index);

                    editStudent(index);

                }
            );

        });


        // ==========================================
        // DELETE BUTTONS
        // ==========================================

        const deleteButtons =
            document.querySelectorAll(".delete-btn");


        deleteButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(button.dataset.index);

                    deleteStudent(index);

                }
            );

        });

    }


    // ==========================================
    // UPDATE SUMMARY
    // ==========================================

    function updateSummary() {

        const total =
            students.length;


        totalStudents.textContent =
            total;


        if (total === 0) {

            averageScore.textContent = "0";

            highestScore.textContent = "0";

            passedStudents.textContent = "0";

            return;
        }


        let totalScore = 0;

        let highest = 0;

        let passed = 0;


        students.forEach(function (student) {

            const score =
                Number(student.score);


            totalScore += score;


            if (score > highest) {

                highest = score;

            }


            if (score >= 40) {

                passed++;

            }

        });


        const average =
            totalScore / total;


        averageScore.textContent =
            average.toFixed(2);

        highestScore.textContent =
            highest;

        passedStudents.textContent =
            passed;

    }


    // ==========================================
    // RESET FORM
    // ==========================================

    function resetForm() {

        studentForm.reset();

        editingIndex = null;

        submitButton.textContent =
            "Add Student";

        formTitle.textContent =
            "Add Student";

    }


    // ==========================================
    // SHOW MESSAGE
    // ==========================================

    function showMessage(text) {

        message.textContent =
            text;

    }


    // ==========================================
    // ADD / UPDATE STUDENT
    // ==========================================

    studentForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // Get form values
            const name =
                nameInput.value.trim();

            const className =
                classInput.value.trim();

            const subject =
                subjectInput.value.trim();

            const score =
                Number(scoreInput.value);


            // ==========================================
            // VALIDATION
            // ==========================================

            if (
                name === "" ||
                className === "" ||
                subject === ""
            ) {

                showMessage(
                    "Please fill in all fields."
                );

                return;
            }


            if (
                scoreInput.value === "" ||
                isNaN(score) ||
                score < 0 ||
                score > 100
            ) {

                showMessage(
                    "Please enter a score between 0 and 100."
                );

                return;
            }


            // ==========================================
            // ADD NEW STUDENT
            // ==========================================

            if (editingIndex === null) {

                const newStudent = {

                    id: generateStudentId(),

                    name: name,

                    className: className,

                    subject: subject,

                    score: score

                };


                students.push(newStudent);


                showMessage(
                    "Student added successfully."
                );

            }


            // ==========================================
            // UPDATE EXISTING STUDENT
            // ==========================================

            else {

                const existingId =
                    students[editingIndex].id;


                students[editingIndex] = {

                    id: existingId,

                    name: name,

                    className: className,

                    subject: subject,

                    score: score

                };


                showMessage(
                    "Student updated successfully."
                );

            }


            // ==========================================
            // SAVE TO LOCAL STORAGE
            // ==========================================

            saveStudents();


            // ==========================================
            // UPDATE TABLE
            // ==========================================

            displayStudents();


            // ==========================================
            // UPDATE SUMMARY
            // ==========================================

            updateSummary();


            // ==========================================
            // RESET FORM
            // ==========================================

            resetForm();

        }
    );


    // ==========================================
    // EDIT STUDENT
    // ==========================================

    function editStudent(index) {

        const student =
            students[index];


        if (!student) {

            return;

        }


        nameInput.value =
            student.name;

        classInput.value =
            student.className;

        subjectInput.value =
            student.subject;

        scoreInput.value =
            student.score;


        editingIndex =
            index;


        submitButton.textContent =
            "Update Student";

        formTitle.textContent =
            "Edit Student";


        showMessage(
            "Editing " + student.name
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // ==========================================
    // DELETE STUDENT
    // ==========================================

    function deleteStudent(index) {

        const student =
            students[index];


        if (!student) {

            return;

        }


        const shouldDelete =
            confirm(
                "Are you sure you want to delete " +
                student.name +
                "?"
            );


        if (!shouldDelete) {

            return;

        }


        students.splice(index, 1);


        // Save updated array
        saveStudents();


        // Reset editing if necessary
        if (editingIndex === index) {

            resetForm();

        }


        // Refresh table
        displayStudents();


        // Refresh summary
        updateSummary();


        showMessage(
            "Student deleted successfully."
        );

    }


    // ==========================================
    // RESET BUTTON
    // ==========================================

    resetButton.addEventListener(
        "click",
        function () {

            resetForm();

            showMessage(
                "Form has been reset."
            );

        }
    );


    // ==========================================
    // CLEAR ALL STUDENTS
    // ==========================================

    clearStudentsButton.addEventListener(
        "click",
        function () {

            if (students.length === 0) {

                showMessage(
                    "There are no students to clear."
                );

                return;
            }


            const shouldClear =
                confirm(
                    "Are you sure you want to delete ALL students?"
                );


            if (!shouldClear) {

                return;

            }


            // Empty array
            students = [];


            // Update localStorage
            saveStudents();


            // Reset form
            resetForm();


            // Refresh table
            displayStudents();


            // Refresh summary
            updateSummary();


            showMessage(
                "All students have been removed."
            );

        }
    );


    // ==========================================
    // INITIAL DISPLAY
    // ==========================================

    displayStudents();

    updateSummary();

});
