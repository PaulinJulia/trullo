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
import { LoginUserType, UserType } from "./User";
import { TaskType } from "./Task";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args, context) => {
        try {
          if (!context.user) {
            throw new Error("You must be authenticated");
          }
          const task = await Task.findById(args.id).populate("assignedTo");
          if (!task) {
            throw new Error(`Task with ID ${args.id} not found`);
          }
          return {
            ...task.toObject(),
            createdAt: task.createdAt.toISOString(), // Konverterar Date till ISO-sträng
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error fetching task: ${error.message}`);
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
      resolve: async (parent, args, context) => {
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
          if (!context.user) {
            throw new Error("You must be authenticated");
          }
          const tasks = await Task.find(filter)
            .populate("assignedTo")
            .skip(skip)
            .limit(limit)
            .sort({ [sortField]: sortOrder });
          return tasks.map((task) => ({
            ...task.toObject(),
            createdAt: task.createdAt.toISOString(),
          }));
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(
              `An error occurred while fetching tasks: ${error.message}`
            );
          }
        }
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args, context) => {
        try {
          if (!context.user) {
            throw new Error("You must be authenticated");
          }
          return await User.findById(args.id);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error fetching user: ${error.message}`);
          }
        }
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
      resolve: async (parent, args, context) => {
        const limit = args.limit || 10;
        const page = args.page || 1;
        const skip = (page - 1) * limit;
        const sortField = args.sortBy || "name";
        const sortOrder = args.orderBy === "desc" ? -1 : 1; // Sort order: -1 for desc, 1 for asc

        try {
          if (!context.user) {
            throw new Error("You must be authenticated");
          }
          const users = await User.find()
            .skip(skip)
            .limit(limit)
            .sort({ [sortField]: sortOrder });
          return users;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(
              `An error occurred while fetching users: ${error.message}`
            );
          }
        }
      },
    },
    login: {
      type: LoginUserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        const { email, password } = args;
        const userInContext = context.user;
        if (userInContext) {
          throw new Error("You are already logged in");
        }
        try {
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error(`User ${user} not found`);
          }
          //Är lösenordet som användaren har skrivit in detsamma som har hittats på användaren i databasen
          const validPassword = await bcrypt.compare(password, user.password);

          if (!validPassword) {
            throw new Error("Password do not match!");
          }
          if (!process.env.JWT_SECRET) {
            throw new Error(
              "JWT_SECRET is not defined in environment variables."
            );
          }
          //Användaren är betrodd. email finns i db och matchar lösenordet
          //Skapa vårt token med vårt hemliga ord (JWT_SECRET)
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          return { user, token };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error fetching user: ${error.message}`);
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
      resolve: async (parent, args, context) => {
        try {
          if (!context.user) {
            throw new Error("You must be authenticated");
          }
          const task = new Task({
            title: args.title,
            description: args.description,
            status: args.status || "to-do",
            assignedTo: args.assignedTo || null,
            createdAt: new Date(),
            finishedBy:
              args.finishedBy ||
              (() => {
                const fiveDaysLater = new Date();
                fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
                return fiveDaysLater.toISOString();
              })(),
          });
          const createdTask = await task.save();
          const populatedTask = await Task.findById(createdTask._id).populate(
            "assignedTo"
          );
          if (!populatedTask) {
            throw new Error(`Task with ID ${createdTask.id} not found`);
          }
          return {
            ...populatedTask.toObject(),
            createdAt: populatedTask.createdAt.toISOString(), // Konverterar Date till ISO-sträng
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error to add task: ${error.message}`);
          }
        }
      },
    },
    updateTask: {
      type: TaskType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        assignedTo: { type: GraphQLString },
        finishedBy: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        try {
          if (!context.user) {
            throw new Error("You must be authenticated");
          }
          const updatedTask = await Task.findByIdAndUpdate(args.id, {
            $set: {
              title: args.title,
              description: args.description,
              status: args.status,
              assignedTo: args.assignedTo,
              finishedBy: args.finishedBy,
            },
          }).populate("assignedTo");
          if (!updatedTask) {
            throw new Error(`Task with ID ${args.id} not found`);
          }
          return {
            ...updatedTask.toObject(),
            createdAt: updatedTask.createdAt.toISOString(), // Konverterar Date till ISO-sträng
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error to update task: ${error.message}`);
          }
        }
      },
    },
    deleteTask: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args, context) => {
        try {
          if (!context.user) {
            throw new Error("You must be authenticated");
          }
          const deletedTask = await Task.findByIdAndDelete(args.id);
          if (!deletedTask) {
            throw new Error(`Task with ID ${args.id} not found`);
          }
          return deletedTask;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error to delete task: ${error.message}`);
          }
        }
      },
    },
    register: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(args.password, saltRounds);

        try {
          const user = new User({
            name: args.name,
            email: args.email,
            password: hashedPassword,
          });
          return await user.save();
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error to create user: ${error.message}`);
          }
        }
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args, context) => {
        try {
          if (!context.user) {
            throw new Error("You must be authenticated");
          }
          return await User.findByIdAndUpdate(
            args.id,
            {
              $set: {
                name: args.name,
                email: args.email,
                password: args.password,
              },
            },
            { new: true } // This option returns the updated document
          );
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error to update task: ${error.message}`);
          }
        }
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: async (parent, args, context) => {
        try {
          if (!context.user) {
            throw new Error("You must be authenticated");
          }
          const deletedUser = await User.findByIdAndDelete(args.id);
          if (!deletedUser) {
            throw new Error(`User with ID ${args.id} not found`);
          }
          await Task.updateMany(
            {
              assignedTo: args.id,
            },
            { $set: { assignedTo: null } }
          );
          return deletedUser;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(`Error to delete user: ${error.message}`);
          }
        }
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
