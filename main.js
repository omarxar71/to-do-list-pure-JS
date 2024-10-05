let inputBox = document.getElementById("input-box");
let listBox = document.getElementById("list-container");

// Load tasks from localStorage on page load
window.onload = function () {
    listBox.innerHTML = localStorage.getItem("tasks") || ''; // Load saved tasks, or an empty string if none
};

function AddTask() {
    if (inputBox.value == '') {
        alert('You must enter a value');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listBox.appendChild(li);
        saveTasks(); // Save tasks after adding
    }  
    inputBox.value = "";
}

// Event listener to handle task clicks (check/uncheck and delete)
listBox.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked');
        saveTasks(); // Save tasks after toggling checked status
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTasks(); // Save tasks after deleting
    }
});

// Event listener for editing tasks
listBox.addEventListener("dblclick", function (e) {
    if (e.target.tagName === "LI") {
        let currentText = e.target.firstChild.textContent; // Get the current task text
        let editedText = prompt("Edit task:", currentText); // Prompt user to edit task
        if (editedText !== null && editedText.trim() !== "") {
            e.target.firstChild.textContent = editedText; // Update the task with new text
            saveTasks(); // Save tasks after editing
        }
    }
});

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem("tasks", listBox.innerHTML); // Save the entire inner HTML of the task list
}
