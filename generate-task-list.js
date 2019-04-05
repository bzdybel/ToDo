const addTaskForm = document.querySelector('.task-form__add');
const taskList = document.querySelector('.task-list');
const addTask = event => {
	event.preventDefault();

	const taskName = document.querySelector('task-form__input', 'task-form__input--task-content').value;
	const taskDeadline = document.querySelector('task-form__input', 'task-form__input--date').value;

	const lastElementIndex = tasks.length() - 1;
	const lastElement = task[lastElementIndex];

	tasks.push({
		id: lastElement.id + 1,
		name: taskName,
		deadline: taskDeadline,
		isDone: false,
		isDeleted: false

	});

	const currentTask = document.createElement("li");
	const buttonIsDone = document.createElement("button");
	const buttonIsDeleted = document.createElement("button");
	const taskContent = document.createElement("span");
	const taskDeadlineTime = document.createElement("time");

	currentTask.classList.add('task-list__item');
	buttonIsDone.classList.add('task-list-item__button', 'task-list-item__button--is-done');
	buttonIsDeleted.classList.add('task-list-item__button', 'task-list-item__button--is-deleted');
	taskContent.classList.add('task-list-item__content');
	taskDeadlineTime.classList.add('task-list-item__deadline');

	taskContent.innerText(tasks[lastElementIndex].name, " ");
	taskDeadlineTime.innerText(tasks[lastElementIndex].deadline);

	currentTask.appendChild(buttonIsDone);
	currentTask.appendChild(taskContent);
	currentTask.appendChild(taskDeadlineTime);
	currentTask.appendChild(buttonIsDeleted);

	taskList.appendChild(currentTask);
}

addTaskForm.addEventListener('submit', addTask);