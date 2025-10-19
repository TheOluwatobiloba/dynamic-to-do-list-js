// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask(taskTextParam, save = true) {
        // Get and trim the input value (or use passed text when loading)
        const taskText = (typeof taskTextParam === 'string')
            ? taskTextParam.trim()
            : taskInput.value.trim();

        // Check if input is empty
        if (taskText === "") {
            if (typeof taskTextParam === 'undefined') {
                alert("Please enter a task.");
            }
            return;
        }

        // === Task Creation ===
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        // ✅ Use classList.add (required by ALX)
        removeBtn.classList.add('remove-btn');

        // === Task Removal ===
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            // Remove from Local Storage
            let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks = tasks.filter(task => task !== taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        // Append button and li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save task to Local Storage
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear input field
        taskInput.value = "";
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(task => addTask(task, false));
    }

    // === Attach Event Listeners ===
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when page loads
    loadTasks();
});
