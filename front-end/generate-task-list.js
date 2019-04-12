const addTaskForm = document.querySelector('.task-form')
const taskList = document.querySelector('.task-list')
const tasks = []

const STATUSES = {
	NEW: 'NEW',
	DELETED: 'DELETED',
	DONE: 'DONE',
}

const renderTaskList = event => {
	taskList.innerHTML = ''

	tasks.forEach(function(task) {
		const currentTask = document.createElement('li')
		const buttonIsDone = document.createElement('button')
		const buttonIsDeleted = document.createElement('button')
		const taskContent = document.createElement('span')
		const taskDeadlineTime = document.createElement('time')

		currentTask.classList.add('task-list__item')
		buttonIsDone.classList.add('task-list-item__button', 'task-list-item__button--is-done')
		buttonIsDeleted.classList.add('task-list-item__button', 'task-list-item__button--is-deleted')
		taskContent.classList.add('task-list-item__content')
		taskDeadlineTime.classList.add('task-list-item__deadline')

		taskContent.innerText = task.name
		taskDeadlineTime.innerText = task.deadline

		buttonIsDone.innerHTML = '&#10003;'
		buttonIsDeleted.innerHTML = '&#10060;'

		currentTask.appendChild(buttonIsDone)
		currentTask.appendChild(taskContent)
		currentTask.appendChild(taskDeadlineTime)
		currentTask.appendChild(buttonIsDeleted)

		taskList.appendChild(currentTask)

		document.querySelector('.task-form').reset()

		const changeStatus = event => {
			task.status = STATUSES.DONE
			addDoneTask()
			removeFromTaskList(task.id)
		}
		buttonIsDone.addEventListener('click', changeStatus)
	})
}

const addTask = event => {
	event.preventDefault()

	const taskName = document.querySelector('.task-form__input--task-content').value
	const taskDeadline = document.querySelector('.task-form__input--date').value

	tasks.push({
		id: uuid(),
		name: taskName,
		deadline: taskDeadline,
		status: STATUSES.NEW,
	})
	renderTaskList()
}

addTaskForm.addEventListener('submit', addTask)
