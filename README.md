# Trullo

Trullo is a project management API that allows users to register, log in, and create project boards to manage tasks. Users can organize their projects by creating boards, where each board contains tasks with attributes like title, description, status, assigned user, and tags.  
The application uses a NoSQL database(MongoDB), since I was curious to explore how a document-based database works and wanted to learn more about the NoSQL approach, as opposed to a traditional relational database.

## How to install

node.js - https://nodejs.org/en/download  
npm - https://www.npmjs.com/

```
git clone https://github.com/PaulinJulia/trullo.git
cd trullo
npm install

Create a .env file in the root directory and add the following variables:
MONGODB_URI=<your-connection>
JWT_SECRET=<your-key>

npm run dev
```

## Dependencies and Tools

#### Authentication and HTTP Handling

- bcrypt - Used for hashing and verifying passwords securely.
- jsonwebtoken - Used for creating and verifying JSON Web Tokens (JWT), typically used for authentication and authorization.
- cors - Middleware to enable Cross-Origin Resource Sharing (CORS) in your Express app, allowing your API to handle requests from different domains.
- express - A minimalist web framework for Node.js, used for creating the backend server and handling HTTP requests.

#### GraphQL and Database Interaction

- graphql - A JavaScript implementation of GraphQL, a query language for APIs.
- express-graphql - Middleware to handle GraphQL queries and mutations in an Express server.
- mongoose - An Object Data Modeling (ODM) library for MongoDB, providing schema-based solutions for application data.

#### Environment Variables Management

- dotenv - Loads environment variables from a .env file into process.env, for securely managing sensitive configuration data.

#### Development and Typescript

- typescript- The TypeScript compiler, used to transpile TypeScript code to JavaScript for production.
- tsx - A TypeScript execution engine for Node.js that allows running .ts and .tsx files directly without prior compilation.
- nodemon - A development tool that automatically restarts the server when file changes are detected, improving development workflow.

#### Development and Typescript

- vercel - A platform for hosting serverless functions and static sites, used to deploy and host.

## Usage

https://trullo-alpha.vercel.app/graphql

For example:  
mutation {register(name: "Sam", email: "Sam@Sam.se", password: "123Sam") {
\_id
name
email
password
}}

query{login(email: "Sam@Sam.se", password: "123Sam") {
user{name}
token
}}

## About

The project was carried out by one person for the purpose of learing and consolidate knowledge during a course in Backend. This project has no intention of continuing.

## Support

email: julia.paulin@chasacademy.se
