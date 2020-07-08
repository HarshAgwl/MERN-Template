const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const Task = require('./models/task')

const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

const root = require('path').join(__dirname, '../client', 'build');

app.use(express.static(root));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/', require('./routes'));

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
}))

app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

mongoose.connect(config.mongoDbUrl);

const db = mongoose.connection;

db.on('error', function (err) { console.log(err.message); });

db.once('open', () => {
    console.log("Successfully connected to the database");
});

const task = new Task({
    email: "itsharshag@gmail.com",
    task: "Get a haricut done"
});

task.save();

const port = 8011;
app.listen(port);