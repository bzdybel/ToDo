## Testing API

###### GET /tasks

`$ http GET localhost:3006/tasks`

###### POST /task

Valid request:
`$ http POST localhost:3006/task content="Get rich" deadline="02-02-2019"`

Invalid request (deadline field is missing):
`$ http POST localhost:3006/task content="Die trying"`
