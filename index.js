import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import schema from './schema';

const GRAPHQL_PORT = 8080;
const GRAPHQL_PATH = '/graphql';

const app = express();

app.use(GRAPHQL_PATH, bodyParser.json(), graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(GRAPHQL_PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}${GRAPHQL_PATH}`); // eslint-disable-line no-console
});
