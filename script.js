//function

//open and close modal
const toggleModal = function () {
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
};

const showTaskDetail = function (index) {
  const taskDetail = JSON.parse(storage.getItem("tasks"))[index];
  taskOpenName.textContent = taskDetail.taskName;
  taskOpendes.textContent = taskDetail.taskDescription;
  taskCompleted.textContent = taskDetail.isCompleted
    ? "Un-Completed"
    : "Completed";

  taskCompleted.setAttribute("id", index);
  taskRemove.setAttribute("id", index);
};

const resetFormInput = function () {
  inputName.value = textDescription.value = "";
  inputColor.value = "#000000";
};

const storeAndShowTask = function (allTask, index = 0) {
  // store new task object in local storage
  storage.setItem("tasks", JSON.stringify(allTask));
  //show all task list from local storage
  showtask(JSON.parse(storage.getItem("tasks")), index);
};

//show task list
const showtask = function (allTask, id = 0) {
  taksList.innerHTML = "";
  let isremoveHiddenClass = false;

  if (allTask.length > 0) {
    //remove hidden class from task Open element
    if (!isremoveHiddenClass) {
      taskOpen.classList.remove("hidden");
    }

    //show all task list
    allTask.forEach((task, i) => {
      //make task
      const taskEl = `<div class="task_list_task" id=${i} style="background-color:${
        task.taskColor
      }">
          <p>
            <span class="task_name">${task.taskName} ${
        task.isCompleted ? "✅" : ""
      }</span>
          </p>
        </div>`;

      //add task to dom
      taksList.insertAdjacentHTML("afterbegin", taskEl);

      //add event to task list item
      document
        .querySelector(".task_list_task")
        .addEventListener("click", function () {
          //  get task list id
          const index = this.getAttribute("id");

          showTaskDetail(index);
        });
    });
    //always show first to do item content

    //get first to do item index that shown in UI
    let index = JSON.parse(storage.getItem("tasks")).length - 1;
    if (id) {
      index = id;
    }

    showTaskDetail(index);
  } else {
    //when there is no task
    taskOpen.classList.add("hidden");
  }
};

//dom element
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");
const inputColor = document.querySelector(".input_task_color");
const inputName = document.querySelector(".input_task_name");
const textDescription = document.querySelector(".input_task_des");
const inputTaskAdd = document.querySelector(".input_task_add");
const btnAdd = document.querySelector(".add");
const taksList = document.querySelector(".task_list");
const taskOpenName = document.querySelector(".task_open_n");
const taskOpendes = document.querySelector(".task_open_des");
const taskOpen = document.querySelector(".task_open");
const taskCompleted = document.querySelector(".complete");
const taskRemove = document.querySelector(".remove");

//evnet
btnAdd.addEventListener("click", toggleModal);

closeModal.addEventListener("click", function () {
  toggleModal();
  resetFormInput();
});

inputTaskAdd.addEventListener("click", function (e) {
  e.preventDefault();

  //get all form element
  const taskName = inputName.value;
  const taskDescription = textDescription.value;
  const taskColor = inputColor.value;

  if (taskName && taskDescription && taskColor) {
    //create new task object
    const newTask = {
      taskName,
      taskDescription,
      taskColor,
      isCompleted: false,
    };

    //add newtask object in the task array
    allTask.push(newTask);

    storeAndShowTask(allTask);

    toggleModal();

    //reset input
    resetFormInput();
  } else {
    alert("Please Enter Correct Input!");
  }
});

taskRemove.addEventListener("click", function () {
  const index = this.getAttribute("id");

  allTask.splice(index, 1);

  storeAndShowTask(allTask);
});

taskCompleted.addEventListener("click", function () {
  const index = this.getAttribute("id");

  //if compeleted then un-completed and vice-versa
  allTask[index].isCompleted = !allTask[index].isCompleted;

  storeAndShowTask(allTask, index);
});

//variables
const storage = localStorage;
const allTask = JSON.parse(storage.getItem("tasks"))
  ? JSON.parse(storage.getItem("tasks"))
  : [];

showtask(JSON.parse(storage.getItem("tasks")));
