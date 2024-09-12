import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";


const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    assignedTo: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    finishedBy: { type: GraphQLString },
  }),
});

export { TaskType }