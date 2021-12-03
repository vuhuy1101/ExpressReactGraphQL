const express = require("express");

const cors = require('cors');

const PORT = process.env.HTTP_PORT || 6969; // In real life, this should be where you handle and get data from your database

const {
  graphqlHTTP
} = require('express-graphql');

const schema = require("./Schemas");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}.`);
});
