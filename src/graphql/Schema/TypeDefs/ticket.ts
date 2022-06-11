import { 
	GraphQLFloat,
	GraphQLID,
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString
} from 'graphql'

export const TicketInput = new GraphQLInputObjectType({
	name: 'TicketInput',
	fields: () => ({
		id: { type: GraphQLID },
		subtotal: { type: new GraphQLNonNull(GraphQLFloat) },
		total: { type: new GraphQLNonNull(GraphQLFloat) }
	})
})

export const ticketType = new GraphQLObjectType({
	name: 'Ticket',
	description: 'ticket description',
	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'The id',
		},
		subtotal: {
			type: GraphQLFloat,
			description: 'The subtotal',
		},
		total: {
			type: GraphQLString,
			description: 'The total',
		},
		active: {
			type: GraphQLInt,
			description: 'The Active',
		},
		created_at: {
			type: GraphQLString,
			description: 'The created_at',
		},
		updated_at: {
			type: GraphQLString,
			description: 'The updated_at',
		},
		deleted_at: {
			type: GraphQLString,
			description: 'The deleted_at',
		}
	})
});