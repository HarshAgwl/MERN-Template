const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

const root = require('path').join(__dirname, '../client', 'build');

app.use(express.static(root));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//       'Access-Control-Allow-Methods',
//       'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if (req.method === 'OPTIONS') {
//       return res.sendStatus(200);
//     }
//     next();
//   });

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

const port = 8011;
app.listen(port);