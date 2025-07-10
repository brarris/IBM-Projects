// Select the necessary elements from the DOM
const taskInput = document.querySelector("#newtask input");
const addButton = document.querySelector("#push");
const tasksSection = document.querySelector(".tasks");

// Function to create a new task
function createTask() {
  // Check if the input field is empty (after trimming whitespace)
  if (taskInput.value.trim().length === 0) {
    alert("The task field is blank. Enter a task name and try again.");
    return; // Stop the function if input is empty
  }

  // Create the HTML for the new task
  tasksSection.innerHTML += `
    <div class="task">
        <label>
            <input type="checkbox" onclick="updateTask(this)" id="check-task">
            <p>${taskInput.value}</p>
        </label>
        <button class="delete">
            <i class="uil uil-trash"></i>
        </button>
    </div>`;

  // Add event listeners to all delete buttons
  var current_tasks = document.querySelectorAll(".delete");
  for (var i = 0; i < current_tasks.length; i++) {
    current_tasks[i].onclick = function () {
      this.parentNode.remove();
      // After removing, check for overflow again
      checkOverflow();
    };
  }

  // Check if the task list needs a scrollbar
  checkOverflow();

  // Clear the input field for the next task
  taskInput.value = "";
}

// Function to update a task's style when checkbox is clicked
function updateTask(taskCheckbox) {
  let taskText = taskCheckbox.nextElementSibling; // The <p> element
  if (taskCheckbox.checked) {
    taskText.classList.add("checked");
  } else {
    taskText.classList.remove("checked");
  }
}

// Function to add or remove the overflow class for scrolling
function checkOverflow() {
  if (tasksSection.offsetHeight >= 300) {
    tasksSection.classList.add("overflow");
  } else {
    tasksSection.classList.remove("overflow");
  }
}

// Add event listener for the 'Add' button click
addButton.onclick = function () {
  createTask();
};

// Add event listener for the 'Enter' key press in the input field
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    createTask();
  }
});
