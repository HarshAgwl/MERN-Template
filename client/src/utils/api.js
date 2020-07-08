import axios from 'axios'

export const addTask = (task, email) => {
  return axios.post("/graphql", {
    query: `mutation{
          addTask(taskInput: {
            task: "${task}",
            email: "${email}"
          }) {
            message
          }
        }`
  })
}

export const fetchTasks = (task, email) => {
  return axios.post("/graphql", {
    query: `{
      tasks(email: "harsh51000@gmail.com") {
        task
      }
    }`
  })
}