function toCamelCase(text) {
	return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function (match, p1, p2, offset) {
		if (p2) return p2.toUpperCase();
		return p1.toLowerCase();
	});
}

function camelCaseToString(str, separator) {
	separator = typeof separator === 'undefined' ? '_' : separator;

	return str
		.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
		.toLowerCase();
}

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
		name: toCamelCase(taskName),
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

	taskContent.innerText(camelCaseToString(tasks.pop().name, " "));
	taskDeadlineTime.innerText(tasks.pop().deadline);

	currentTask.appendChild(buttonIsDone);
	currentTask.appendChild(taskContent);
	currentTask.appendChild(taskDeadlineTime);
	currentTask.appendChild(buttonIsDeleted);

	taskList.appendChild(currentTask);
}

addTaskForm.addEventListener('submit', addTask);