// QUERY GRAPHQL

// ----GET TASK BY ID----
// query {task(id: "66e805d7e65f70271aa2c2df"){
//   title description status assignedTo {
//     _id name email
//   } createdAt finishedBy}}

// ----GET ALL TASKS----
// query {tasks{title description status assignedTo{_id name email} createdAt finishedBy }}

// ----GET USER BY ID----
// query{user(id: "66e7ffa5e65f70271aa2c2d5") {
//   _id
//   name
//   email
// }}

// ----GET ALL USERS----
// query {users{_id name email password}}

// MUTATION GRAPHQL

// ----ADD TASK-----
// mutation {
//   addTask(
//     title: "Tidsbokning",
//     description: "Boka tid",
//     assignedTo: "66e7ffa5e65f70271aa2c2d5",
//   ) {
//     _id
//     title
//     description
//     status
//     assignedTo {
//     _id
//       name
//       email
//     }
//     createdAt
//     finishedBy
//   }
// }

// ----UPDATE TASK---
// mutation {
//   updateTask(
//     id: "66e7fbf29856e1e0ba9cac41",
//     title: "Jobba"
//     description: "jobba mycket"
//     assignedTo: "66e7ff8ee65f70271aa2c2d3"

//   ) {
//     title
//     description
//     status
//     assignedTo {_id name email}
//     createdAt
//     finishedBy
//   }
// }

// ----DELETE TASK----
// mutation {deleteTask(id: "66e7fbbf9856e1e0ba9cac3f"){title description}}

// ----CREATE USER----
// mutation {addUser(name: "Henry", email: "Henry@henry.se", password: "Henry123") {
//   _id
//   name
//   email
// }}

// ----UPDATE USER----
// mutation {
//   updateUser(
//     id: "66e7ff6ce65f70271aa2c2d1",
//     name: "Gustaf"
//     email: "gurra@gurra.com",
//     password: "gurra123",
//   ) {
// name email password
//   }
// }

// ----DELETE USER----
// mutation {deleteUser(id: "66e409df6b51d88765fd78d8"){name email}}
