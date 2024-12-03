window.addEventListener("load", () => {
  getUsers()
})

function getUsers(){

  fetch("http://localhost:3000/students", { mode: "cors" })
 .then((response) => response.json())

 .then((data) => {
  const tableBody = document.querySelector("#studentTable");

  if (!tableBody) {
   console.error('Element with ID "studentTable" (tbody) not found.');
   return;
  }
  tableBody.innerHTML = "";

  data.forEach((student) => {
   const row = document.createElement("tr");

   const idCell = document.createElement("td");
   idCell.textContent = student.id;
   row.appendChild(idCell);

   const nameCell = document.createElement("td");
   nameCell.textContent = student.name;
   row.appendChild(nameCell);

   const emailCell = document.createElement("td");
   emailCell.textContent = student.email;
   row.appendChild(emailCell);

   const gradeCell = document.createElement("td");
   gradeCell.textContent = student.grade;
   row.appendChild(gradeCell);

   const actionCell = document.createElement("td")
   actionCell.innerHTML = `
            <button class="fa fa-edit " onClick ="editMember(${student.id})"></button>
            <button class="fa fa-trash " onClick ="deleteMember(${student.id})"></button>
            `
   row.appendChild(actionCell)

   tableBody.appendChild(row);

  });
 })

 .catch((error) => console.error("Error fetching students:", error));

}





const addBtn = document.querySelector("#submitBtn");

addBtn.addEventListener("click", () => {
 let name = document.getElementById("name").value;
 let email = document.getElementById("email").value;
 let grade = document.getElementById("grade").value;
 let newStudent = { name, email, grade };

 fetch("http://localhost:3000/students/", {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(newStudent),
 })
  .then((response) => {
   if (response.ok) {
    alert("Student added successfully!");

    location.reload();
   } else {
    throw new Error("Error creating student");
   }
  })


  .catch((error) => console.error("Error creating student:", error));
});

deleteMember = (id) => {
    let newStudent={id}
    if (confirm("Are you sure you want to delete this user?")) {
    fetch("http://localhost:3000/students", {
      method: "DELETE",
      body: JSON.stringify(newStudent),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.text())
    alert(`Deleted user with ID: ${id}`)
    .then(response => console.log(response))
    .catch(error => console.log(error))
    
  }
  location.reload()
}


const update = document.querySelector("#updateBtn");

function editMember(id){
  fetch(`http://localhost:3000/students/${id}`)

  .then(response => response.json())
  .then(data => {
  document.querySelector("#name").value = data[0].name
  document.querySelector("#email").value = data[0].email
  document.querySelector("#grade").value = data[0].grade
  document.querySelector('#ID').value =  data[0].id
  })
  .catch(error => console.log(error))
}

update.addEventListener(`click`, ()=>{

  let name =document.querySelector("#name").value; 
  let email=document.querySelector("#email").value;
  let grade=document.querySelector("#grade").value;
  let id= document.querySelector('#ID').value; 

  let formData={name, email, grade, id}
  fetch("http://localhost:3000/students",{
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
          'Content-Type': 'application/json'
      }
  }).catch(error => console.log(error));
  alert("Successfully edited!");
  location.reload();
})
