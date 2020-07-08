const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Task{
        task: String
        email: String
    }

    type TaskCreated {
        message: String!
    }

    input TaskData {
        task: String!
        email: String!
    }

    type RootQuery{
        tasks(email: String!): [Task]
    }

    type RootMutation {
        addTask(taskInput: TaskData): TaskCreated!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)