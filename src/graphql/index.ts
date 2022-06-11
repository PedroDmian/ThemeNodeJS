import R from 'ramda';
import { Application, Express } from 'express';
import { graphqlHTTP } from 'express-graphql';


import { NODE_ENV } from '../config';
import { schema } from './Schema';


export function createServerGraphql(expressApp: Express) {
  let graphql = graphqlHTTP({
    schema,
    graphiql: R.includes(NODE_ENV, ["", "LOCAL", "development"])
  });

  expressApp.use('/graphql', graphql);

  return expressApp;
}