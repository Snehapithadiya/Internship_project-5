document.addEventListener('DOMContentLoaded', () => {
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescInput = document.getElementById('taskDesc');
    const taskImageInput = document.getElementById('taskImage');
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');
    const addTaskBtn = document.getElementById('addTaskBtn');

    // Add Task
    addTaskBtn.addEventListener('click', () => {
        const taskTitle = taskTitleInput.value.trim();
        const taskDesc = taskDescInput.value.trim();
        const taskImage = taskImageInput.files[0];

        if (taskTitle === '') {
            alert('Please enter a task title.');
            return;
        }

        const taskItem = document.createElement('li');
        
        // Format the date and time
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('default', {
            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        taskItem.innerHTML = `
            <div>
                <strong>${taskTitle}</strong>
                <p class="task-meta">${taskDesc}</p>
                <p class="task-date">Added on: ${formattedDate}</p>
            </div>
        `;

        if (taskImage) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Task Image';
                img.classList.add('task-image');
                taskItem.appendChild(img);
            };
            reader.readAsDataURL(taskImage);
        }

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => {
            completeTask(taskItem);
        });

        taskItem.appendChild(completeBtn);
        pendingTasksList.appendChild(taskItem);

        // Clear inputs after adding the task
        taskTitleInput.value = '';
        taskDescInput.value = '';
        taskImageInput.value = '';
    });

    // Complete Task Function
    function completeTask(taskItem) {
        taskItem.classList.add('completed');
        taskItem.querySelector('.complete-btn').remove();

        // Add Edit and Delete buttons
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
            editTask(taskItem);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteTask(taskItem);
        });

        // Create a container for the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        taskItem.appendChild(buttonContainer);

        completedTasksList.appendChild(taskItem);
    }

    // Edit Task Function
    function editTask(taskItem) {
        const newTitle = prompt("Edit task title:", taskItem.querySelector('strong').textContent);
        const newDesc = prompt("Edit task description:", taskItem.querySelector('.task-meta').textContent);

        if (newTitle !== null) {
            taskItem.querySelector('strong').textContent = newTitle;
        }
        if (newDesc !== null) {
            taskItem.querySelector('.task-meta').textContent = newDesc;
        }
    }

    // Delete Task Function
    function deleteTask(taskItem) {
        if (confirm("Are you sure you want to delete this task?")) {
            taskItem.remove();
        }
    }
});
