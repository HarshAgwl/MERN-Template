const { buildSchema } = require('graphql');

// module.exports = buildSchema(`
//     type TestData{
//         text: String!
//         views: Int!
//     }

//     type RootQuery{
//         hello: TestData!
//     }

//     schema{
//         query: RootQuery
//     }
// `);

module.exports = buildSchema(`
    type TaskCreated {
        message: String!
    }

    input TaskData {
        task: String!
        email: String!
    }

    type TaskMutation {
        addTask(task: TaskData): TaskCreated!
    }

    schema {
        mutation: TaskMutation
    }
`)