const form = document.getElementById("student-form");
const studentTable = document.getElementById("student-table").querySelector("tbody");

let students = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("student-name").value;
  const id = document.getElementById("student-id").value;
  const grade = document.getElementById("student-grade").value;

  const existingStudentIndex = students.findIndex((student) => student.id === id);

  if (existingStudentIndex >= 0) {
    students[existingStudentIndex] = { name, id, grade };
    alert("Student updated successfully!");
  } else {
    students.push({ name, id, grade });
    alert("Student added successfully!");
  }

  form.reset();
  renderTable();
});

function renderTable() {
  studentTable.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.grade}</td>
      <td>
        <button class="action-button edit-button" onclick="editStudent(${index})">Edit</button>
        <button class="action-button delete-button" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    studentTable.appendChild(row);
  });
}

function editStudent(index) {
  const student = students[index];

  document.getElementById("student-name").value = student.name;
  document.getElementById("student-id").value = student.id;
  document.getElementById("student-grade").value = student.grade;
}

function deleteStudent(index) {
  students.splice(index, 1);
  alert("Student deleted successfully!");
  renderTable();
}
