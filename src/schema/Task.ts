import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";
import { UserType } from "./User";


const TaskType = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    assignedTo: { type: UserType },
    createdAt: { type: GraphQLString },
    finishedBy: { type: GraphQLString },
  }),
});

export { TaskType }