document.getElementById('task-form').addEventListener('submit', addTask);

function addTask(e) {
  e.preventDefault();
  
  // Get input values
  const taskName = document.getElementById('task-name').value;
  const taskDescription = document.getElementById('task-description').value;
  const taskReminderDate = document.getElementById('task-reminder-date').value;
  const taskReminderTime = document.getElementById('task-reminder-time').value;

  // Combine date and time values into a single reminder string
  const taskReminder = taskReminderDate + ' ' + taskReminderTime;

  // Create task item
  const taskItem = document.createElement('li');
  taskItem.className = 'list-group-item task-item';
  taskItem.innerHTML = `
    <h5>${taskName}</h5>
    <p>${taskDescription}</p>
    <p class="task-reminder">${formatReminder(taskReminder)}</p>
    <div>
      <button class="btn btn-danger btn-sm" onclick="deleteTask(this)">Delete</button>
      <button class="btn btn-secondary btn-sm" onclick="updateTask(this)">Update</button>
    </div>
  `;

  // Add task to the list
  document.getElementById('task-list').appendChild(taskItem);

  // Clear form inputs
  document.getElementById('task-name').value = '';
  document.getElementById('task-description').value = '';
  document.getElementById('task-reminder-date').value = '';
  document.getElementById('task-reminder-time').value = '';
}

function formatReminder(reminder) {
  if (!reminder) {
    return '';
  }
  const formattedReminder = new Date(reminder).toLocaleString();
  return `Reminder: ${formattedReminder}`;
}

function deleteTask(taskBtn) {
  const taskItem = taskBtn.closest('.task-item');
  taskItem.remove();
}

function updateTask(taskBtn) {
  const taskItem = taskBtn.closest('.task-item');
  const taskNameElement = taskItem.querySelector('h5');
  const taskDescriptionElement = taskItem.querySelector('p');
  const taskReminderElement = taskItem.querySelector('.task-reminder');

  const newTaskName = prompt('Enter new task name:', taskNameElement.textContent);
  const newTaskDescription = prompt('Enter new task description:', taskDescriptionElement.textContent);
  const newTaskReminder = prompt('Enter new task reminder (YYYY-MM-DD HH:MM):', taskReminderElement.textContent);

  taskNameElement.textContent = newTaskName;
  taskDescriptionElement.textContent = newTaskDescription;
  taskReminderElement.textContent = formatReminder(newTaskReminder);
}