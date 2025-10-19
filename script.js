// script.js

// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements exactly as required
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory array holding tasks (keeps sync with localStorage)
    let tasks = [];

    /**
     * Create a task <li> element with a remove button and append it to the DOM.
     * @param {string} taskText - The text of the task to create.
     */
    function createTaskElement(taskText) {
        // Create list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button and style/class it as required
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Assign onclick to remove the li from the DOM and update localStorage
        removeBtn.onclick = () => {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove from tasks array (remove first matching occurrence)
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                // Persist updated tasks array to localStorage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };

        // Append remove button to the list item, then append li to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    /**
     * Add a new task.
     * If taskText parameter is provided, use it; otherwise read from the input.
     * @param {string} [taskTextParam] - Optional. If provided, adds this text instead of reading input.
     * @param {boolean} [save=true] - Whether to save the task to localStorage (set false when loading existing tasks).
     */
    function addTask(taskTextParam, save = true) {
        // Determine source of task text (input or passed parameter)
        const taskText = (typeof taskTextParam === 'string')
            ? taskTextParam.trim()
            : taskInput.value.trim();

        // Validate non-empty input
        if (taskText === '') {
            // Only alert if the user manually tried to add via UI (i.e., when no param was provided)
            if (typeof taskTextParam === 'undefined') {
                alert('Please enter a task.');
            }
            return;
        }

        // Create and append the task element to the DOM
        createTaskElement(taskText);

        // Update tasks array and localStorage if requested
        if (save) {
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear the input field for the next task
        taskInput.value = '';
    }

    /**
     * Load tasks from localStorage and populate the DOM.
     * This will call addTask with save=false to avoid duplication in localStorage.
     */
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = storedTasks.slice(); // initialize in-memory tasks array
        storedTasks.forEach(taskText => {
            // call addTask with save = false so it doesn't write back to localStorage again
            addTask(taskText, false);
        });
    }

    // Attach event listeners as specified
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks from localStorage when the page loads
    loadTasks();
});
