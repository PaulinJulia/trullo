import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from "graphql";
import { TaskType } from "./Task";

const BoardType = new GraphQLObjectType({
  name: "Board",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    tasks: { type: new GraphQLList(TaskType) },
    background: { type: GraphQLString },
  }),
});

export { BoardType };
