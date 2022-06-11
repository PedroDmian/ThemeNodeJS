import { GraphQLObjectType, GraphQLSchema } from 'graphql'

import {
	TicketSchemaQuery
} from './Queries'

import {
  TicketSchemaMutation
} from './Mutations'

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: () => Object.assign(
		TicketSchemaQuery.query
	)
})

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => Object.assign(
		TicketSchemaMutation.mutation
	)
});

export const schema = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});