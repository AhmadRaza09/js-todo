// console.log("ahmad");
//function

//open and close modal
const toggleModal = function () {
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
};

//show task list
const showtask = function (allTask) {
  //   console.log(allTask);
  taksList.innerHTML = "";
  if (allTask) {
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
          //   console.log(taskDetail);
        });

      //always show first to do item content

      //get first to do item index that shown in UI
      const index = JSON.parse(storage.getItem("tasks")).length - 1;

      const taskDetail = JSON.parse(storage.getItem("tasks"))[index];
      taskOpenName.textContent = taskDetail.taskName;
      taskOpendes.textContent = taskDetail.taskDescription;
    });
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

//evnet
btnAdd.addEventListener("click", toggleModal);

closeModal.addEventListener("click", toggleModal);

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
    inputName.value = "";
    textDescription.value = "";
    inputColor.value = "#000000";
  } else {
    alert("Please Enter Correct Input!");
  }
});

//variables
const storage = localStorage;
const allTask = JSON.parse(storage.getItem("tasks"));

// console.log(storage.length);
// storage.setItem("tasks", JSON.stringify(allTask));
// console.log(storage);
// console.log(JSON.parse(storage.getItem("tasks")));
// storage.clear();

showtask(JSON.parse(storage.getItem("tasks")));

// console.log(storage.getItem("tasks"));
