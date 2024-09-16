import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export { UserType };