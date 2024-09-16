// QUERY GRAPHQL

// ----GET TASK BY ID----
// query {task(id: "66e33b67295b9e361ee9ac9b"){
//   title description status assignedTo{name} createdAt finishedBy}}

// ----GET ALL TASKS----
// query {tasks{title description status assignedTo{name} createdAt finishedBy }}

// ----GET USER BY ID----
// query{user(id: "66e40d422417259d1649f844") {
//   id
//   name
//   email
// }}

// ----GET ALL TASKS----
// query {users{id name email password}}

// MUTATION GRAPHQL

// ----ADD TASK-----
// mutation {
//   addTask(
//     title: "Middag",
//     description: "Handla mat",
//   ) {
//     id
//     title
//     description
//     status
//     assignedTo {
//       id
//       name
//     }
//     createdAt
//     finishedBy
//   }
// }

// ----UPDATE TASK---
// mutation {
//   updateTask(
//     id: "66e339b99f30c26db07d2b34",
//     title: "Köpa"
//     description: "Handla blomma",
//     status: "in progress",
//     assignedTo: "66e3ea44897b49c2bd64a1f8",
//     finishedBy: "Onsdag"

//   ) {
//     id
//     title
//     description
//     status
//     assignedTo {
//       id
//       name
//     }
//     createdAt
//     finishedBy
//   }
// }

// ----DELETE TASK----
// mutation {deleteTask(id: "66e33a879f30c26db07d2b36"){title}}

// ----CREATE USER----
// mutation {addUser(name: "Julia", email: "hej@hej.se", password: "123hej") {
//   id
//   name
//   email
// }}

// ----UPDATE USER----
// mutation {
//   updateUser(
//     id: "66e40d602417259d1649f846",
//     name: "Maya"
//     email: "Handla blomma",
//     password: "mayahej12",

//   ) {
// name email password
//   }
// }

// ----DELETE USER----
// mutation {deleteUser(id: "66e409df6b51d88765fd78d8"){name email}}
