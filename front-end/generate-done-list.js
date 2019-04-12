taskListDone = document.querySelector('.task-list__performed-activities--is-done')

const addDoneTask = event => {
	tasks.forEach(function(task) {
		if (task.status === STATUSES.DONE) {
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
		}
	})
}

const removeFromTaskList = idValue => {
	tasks.splice(
		tasks.findIndex(function(i) {
			return i.id === idValue
		}),
		1
	)
}
