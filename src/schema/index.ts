import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { UserType, UserInputType } from "./User";
import { TaskType } from "./Task";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        try {
          const task = await Task.findById(args.id);
          if (!task) {
            throw new Error(`Task with ID ${args.id} not found`);
          }
          return {
            ...task.toObject(),
            createdAt: task.createdAt.toISOString(), // Konverterar Date till ISO-sträng
          };
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error fetching task:", error.message);
          }
        }
      },
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: {
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
        sortBy: { type: GraphQLString },
        orderBy: { type: GraphQLString },
        status: { type: new GraphQLList(GraphQLString) },
        assignedTo: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const limit = args.limit || 10;
        const page = args.page || 1;
        const skip = (page - 1) * limit;
        const sortField = args.sortBy || "createdAt";
        const sortOrder = args.orderBy === "desc" ? -1 : 1; // Sort order: -1 for desc, 1 for asc

        const filter: {
          status?: { $in: string[] };
          assignedTo?: { $in: string[] };
        } = {};
        // Om title anges, använd $in för att matcha med någon av angivna genrer
        if (args.status && args.status.length > 0) {
          filter.status = { $in: args.status };
        } else if (args.assignedTo && args.assignedTo.length > 0) {
          filter.assignedTo = { $in: args.assignedTo };
        }

        try {
          const tasks = await Task.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ [sortField]: sortOrder });
          return tasks.map((task) => ({
            ...task.toObject(),
            createdAt: task.createdAt.toISOString(),
          }));
        } catch (error) {
          if (error instanceof Error) {
            console.error(
              "An error occurred while fetching tasks",
              error.message
            );
          }
        }
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args) => {
        return await User.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      args: {
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
        sortBy: { type: GraphQLString },
        orderBy: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const limit = args.limit || 10;
        const page = args.page || 1;
        const skip = (page - 1) * limit;
        const sortField = args.sortBy || "name";
        const sortOrder = args.orderBy === "desc" ? -1 : 1; // Sort order: -1 for desc, 1 for asc

        try {
          const users = await User.find()
            .skip(skip)
            .limit(limit)
            .sort({ [sortField]: sortOrder });
          return users;
        } catch (error) {
          if (error instanceof Error) {
            console.error(
              "An error occurred while fetching users",
              error.message
            );
          }
        }
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        assignedTo: { type: GraphQLID },
        finishedBy: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        try {
          const task = new Task({
            title: args.title,
            description: args.description,
            status: args.status || "to-do",
            assignedTo: args.assignedTo || null,
            createdAt: new Date(),
            finishedBy: args.finishedBy || null,
          });
          return await task.save();
        } catch (error) {
          if (error instanceof Error) {
            console.error("Error to add task:", error.message);
          }
        }
      },
    },
    updateTask: {
      type: TaskType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        assignedTo: { type: UserInputType },
        finishedBy: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const updatedTask = await Task.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              status: args.status,
              assignedTo: args.assignedTo,
              finishedBy: args.finishedBy,
            },
          },
          { new: true } // This option returns the updated document
        );
        return updatedTask;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
