const userData = require("../MOCK_DATA.json");
const graphql = require("graphql") ;
const { 
	GraphQLObjectType, 
	GraphQLSchema, 
	GraphQLInt,
	GraphQLString,
	GraphQLList
} = graphql;



const UserType = require("./TypeDefs/UserType");

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		getAllUsers: {
			type: new GraphQLList(UserType),
			args:{ id: { type: GraphQLInt }},
			resolve(parent, args) {
				return userData
			}
		}
	}
})

const Mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		createUser: {
			type: UserType,
			args: {
				firstName: { type: GraphQLString },
				lastName: { type: GraphQLString },
				email: { type: GraphQLString },
				password: { type: GraphQLString },
			},
			resolve(parent, args) {
				// Usually where you put db logic such as INSERT INTO
				userData.push({
					id: userData.length+1,
					firstName: args.firstName,
					lastName: args.lastName,
					email: args.email,
					password: args.password
				})

				return args
			}
		}
	}
})

// Schema is a combination between mutation and queries
// Queries = database, grab data from db - GET
// Mutation = try to update,create,delete data - UPDATE
const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation})

module.exports = schema;





