import {
  taskSave,
  getTasks,
  onGetTasks,
  deleteTask,
  getTask,
  updateTask,
} from "./firebase.js";
const taskForm = document.querySelector("#task-form");
const taskContainer = document.querySelector("#task-container");
let editStatus = false;
let id = "";
window.addEventListener("DOMContentLoaded", async () => {
  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const tasks = doc.data();
      taskContainer.innerHTML += `
     <div class='card card-body mt-2 border-primary'>
      <h3 class ='h5'>${tasks.title}</h3>
      <p>${tasks.description}</p>
      <div '>
      <button class='btn btn-primary  btn-delete' data-id='${doc.id}'>Delete</button>
      
      <button class='btn btn-secondary btn-edit' data-id='${doc.id}'>Edit</button>
      </div>
     
     </div>
    
    
    `;
    });

    const btnsDelete = taskContainer.querySelectorAll(".btn-delete");

    btnsDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      });
    });
    const btnsEdit = taskContainer.querySelectorAll(".btn-edit");

    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        const doc = await getTask(dataset.id);

        const task = doc.data();
        taskForm["task-title"].value = task.title;
        taskForm["task-description"].value = task.description;

        editStatus = true;
        id = doc.id;

        taskForm["btn-task-save"].innerText = "Upadate";
      });
    });
  });
});

addEventListener();

function addEventListener() {
  taskForm.addEventListener("submit", addTask);
}

function addTask(e) {
  e.preventDefault();
  const title = taskForm["task-title"].value;
  const description = document.querySelector("#task-description").value;

  if (!editStatus) {
    taskSave(title, description);
  } else {
    updateTask(id, {
      title,
      description,
    });
    editStatus = false;
  }

  taskForm.reset();
}
