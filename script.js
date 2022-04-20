// console.log("ahmad");
//function

//open and close modal
const toggleModal = function () {
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
};

//show task list
const showtask = function (allTask, id = 0) {
  //   console.log(allTask);
  taksList.innerHTML = "";
  if (allTask.length > 0) {
    // console.log("yes");
    taskOpen.classList.remove("hidden");
    allTask.forEach((task, i) => {
      const taskEl = `<div class="task_list_task" id=${i} style="background-color:${
        task.taskColor
      }">
          <p>
            <span class="task_name">${task.taskName} ${
        task.isCompleted ? "✅" : ""
      }</span>
          </p>
        </div>`;

      //   console.log(taksList);
      taksList.insertAdjacentHTML("afterbegin", taskEl);

      //add event to task list item
      document
        .querySelector(".task_list_task")
        .addEventListener("click", function () {
          //  get task list id
          const id = this.getAttribute("id");

          //get task list from local storage
          const taskDetail = JSON.parse(storage.getItem("tasks"))[id];

          //update task list content
          taskOpenName.textContent = taskDetail.taskName;
          taskOpendes.textContent = taskDetail.taskDescription;
          taskCompleted.textContent = taskDetail.isCompleted
            ? "Un-Completed"
            : "Completed";

          //   console.log(taskDetail);

          //set the id to remove and completed button
          taskCompleted.setAttribute("id", id);
          taskRemove.setAttribute("id", id);
        });
    });
    //always show first to do item content

    //get first to do item index that shown in UI
    let index = JSON.parse(storage.getItem("tasks")).length - 1;
    if (id) {
      index = id;
      // console.log("yes");
    }

    const taskDetail = JSON.parse(storage.getItem("tasks"))[index];
    taskOpenName.textContent = taskDetail.taskName;
    taskOpendes.textContent = taskDetail.taskDescription;
    taskCompleted.textContent = taskDetail.isCompleted
      ? "Un-Completed"
      : "Completed";

    taskCompleted.setAttribute("id", index);
    taskRemove.setAttribute("id", index);
  } else {
    // console.log("no");
    taskOpen.classList.add("hidden");
  }

  //   taksListTask = document.querySelector(".task_list_task");
  //   console.log(taksListTask);
};

//dom element
const overlay = document.querySelector(".overlay");
// console.log(overlay);
const modal = document.querySelector(".modal");
// console.log(modal);
const closeModal = document.querySelector(".close");
// console.log(closeModal);
const inputColor = document.querySelector(".input_task_color");
// console.log(inputColor);
const inputName = document.querySelector(".input_task_name");
// console.log(inputName);
const textDescription = document.querySelector(".input_task_des");
// console.log(textDescription);
const inputTaskAdd = document.querySelector(".input_task_add");
// console.log(inputTaskAdd);
const btnAdd = document.querySelector(".add");
// console.log(btnAdd);

const taksList = document.querySelector(".task_list");
// console.log(taksList);

const taskOpenName = document.querySelector(".task_open_n");
// console.log(taskOpenName);

const taskOpendes = document.querySelector(".task_open_des");
// console.log(taskOpendes);

const taskOpen = document.querySelector(".task_open");

const taskCompleted = document.querySelector(".complete");
// console.log(taskCompleted);

const taskRemove = document.querySelector(".remove");
// console.log(taskRemove);

//evnet
btnAdd.addEventListener("click", toggleModal);

closeModal.addEventListener("click", function () {
  toggleModal();
  inputName.value = textDescription.value = "";
  inputColor.value = "#000000";
});

inputTaskAdd.addEventListener("click", function (e) {
  e.preventDefault();
  //   console.log("yes clicked");

  //get all form element
  const taskName = inputName.value;
  const taskDescription = textDescription.value;
  const taskColor = inputColor.value;
  //   console.log(Boolean(taskName), taskDescription, taskColor);

  if (taskName && taskDescription && taskColor) {
    //create new task object
    const newTask = {
      taskName,
      taskDescription,
      taskColor,
      isCompleted: false,
    };

    //add newtask object in front of array
    // console.log("before", allTask);
    allTask.push(newTask);
    // console.log("after", allTask);

    //store new task object in local storage
    storage.setItem("tasks", JSON.stringify(allTask));
    // console.log(storage.getItem("tasks"));

    //show all task list from local storage
    showtask(JSON.parse(storage.getItem("tasks")));
    // console.log(newTask);

    //close model
    toggleModal();

    //reset input
    inputName.value = textDescription.value = "";
    inputColor.value = "#000000";
  } else {
    alert("Please Enter Correct Input!");
  }
});

taskRemove.addEventListener("click", function () {
  const index = this.getAttribute("id");
  // console.log(index);
  allTask.splice(index, 1);
  // console.log(allTask);
  //store new task object in local storage
  storage.setItem("tasks", JSON.stringify(allTask));
  // console.log(storage.getItem("tasks"));

  //show all task list from local storage
  showtask(JSON.parse(storage.getItem("tasks")));
});

taskCompleted.addEventListener("click", function () {
  // console.log("compelted");
  const index = this.getAttribute("id");
  // console.log(index);
  // console.log(allTask);
  allTask[index].isCompleted = !allTask[index].isCompleted;
  //store new task object in local storage
  storage.setItem("tasks", JSON.stringify(allTask));
  // console.log(storage.getItem("tasks"));

  //show all task list from local storage
  showtask(JSON.parse(storage.getItem("tasks")), index);
});

//variables
const storage = localStorage;
const allTask = JSON.parse(storage.getItem("tasks"))
  ? JSON.parse(storage.getItem("tasks"))
  : [];

// console.log(storage.length);
// storage.setItem("tasks", JSON.stringify(allTask));
// console.log(storage);
// console.log(JSON.parse(storage.getItem("tasks")));
// storage.clear();

showtask(JSON.parse(storage.getItem("tasks")));

// console.log(storage.getItem("tasks"));
