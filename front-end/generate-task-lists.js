const addTaskForm = document.querySelector('.task-form')
const taskList = document.querySelector('.task-list')

const tasks = []
axios.get('/tasks')
  .then(function (response) {
    console.log(response.Content);
    console.log(response.Deadline);
    console.log(response.status);
  });
const STATUSES = {
	NEW: 'NEW',
	DELETED: 'DELETED',
	DONE: 'DONE',
}

const renderTaskList = event => {
	taskList.innerHTML = ''

	tasks
		.filter(task => task.status === STATUSES.NEW)
		.forEach(task => {
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

			const markTaskAsDone = event => {
				task.status = STATUSES.DONE
				renderDoneList()
				renderTaskList()
			}
			const markTaskAsDelete = event => {
				task.status = STATUSES.DELETED
				renderDeletedList()
				renderTaskList()
			}

			buttonIsDone.addEventListener('click', markTaskAsDone)
			buttonIsDeleted.addEventListener('click', markTaskAsDelete)
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

	return axios
		.post('/addname', {
			Content: taskName,
			Deadline: taskDeadline,
			status: STATUSES.NEW,
		})
		.then(function(response) {
			console.log(response)
		})
		.catch(function(error) {
			console.log(error)
		})
}

addTaskForm.addEventListener('submit', addTask)

const taskListDone = document.querySelector('.task-list__performed-activities--is-done')
const taskListDeleted = document.querySelector('.task-list__performed-activities--is-deleted')

const renderDoneList = event => {
	taskListDone.innerHTML = ''

	tasks
		.filter(task => task.status === STATUSES.DONE)
		.forEach(task => {
			const currentTask = document.createElement('li')
			const taskIcon = document.createElement('i')
			const taskContent = document.createElement('span')

			currentTask.classList.add('task-list__item')
			taskContent.classList.add('task-list-item__content')
			taskIcon.classList.add('task-list-item__icon', 'task-list-item__icon--done')

			taskIcon.innerHTML = '&#10003;'
			taskContent.innerText = task.name

			currentTask.appendChild(taskIcon)
			currentTask.appendChild(taskContent)

			taskListDone.appendChild(currentTask)
		})
}

const renderDeletedList = event => {
	taskListDeleted.innerHTML = ''

	tasks
		.filter(task => task.status === STATUSES.DELETED)
		.forEach(task => {
			const currentTask = document.createElement('li')
			const taskIcon = document.createElement('i')
			const taskContent = document.createElement('span')

			currentTask.classList.add('task-list__item')
			taskContent.classList.add('task-list-item__content')
			taskIcon.classList.add('task-list-item__icon')

			taskIcon.innerHTML = '&#10060;'
			taskContent.innerText = task.name

			currentTask.appendChild(taskIcon)
			currentTask.appendChild(taskContent)

			taskListDeleted.appendChild(currentTask)
		})
}
