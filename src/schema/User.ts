import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

const LoginUserType = new GraphQLObjectType({
  name: "LoginUser",
  fields: () => ({
    user: { type: UserType },
    token: { type: GraphQLString },
  }),
});

export { UserType, LoginUserType };
