// QUERY GRAPHQL

// ----GET BOARD BY ID----
// query{board(id: "66f147f57d4628244989e150"){_id title  tasks{title description status assignedTo{ _id name email} createdAt finishedBy tags}}}

// ----GET BOARDS----
// query{boards{_id title tasks{_id title description status assignedTo{_id name email role} createdAt finishedBy tags} background}}

// ----GET TASK BY ID----
// query {task(id: "66e3e86be6b407307b3ddf1d"){
//   title description status assignedTo {
//     _id name email
//   } createdAt finishedBy}}

// ----GET ALL TASKS----
// query{tasks{_id title description status assignedTo{_id name email role} createdAt finishedBy tags}}

// ----GET USER BY ID----
// query{user(id: "66e7ff8ee65f70271aa2c2d3") {
//   _id
//   name
//   email
// }}

// ----GET ALL USERS----
// query {users{_id name email password role}}

// ----SIGN IN----
// query{login(email: "Johannes@Johannes.se", password: "123Johannes") {
// user{name}
//   token
// }}

// MUTATION GRAPHQL

// ----ADD BOARD-----
// mutation {
//   addBoard(
//     title: "Kiwi Board",
//     tasks: ["66f14588577640464b234675", "66f13c1b8800ab863497f381"],
//     background: "orange"
//   ) {
//     _id
//     title
//     background
//     tasks {
//       _id
//       title
//       description
//       status
//       assignedTo{name email role}
//       createdAt
//       finishedBy
//       tags
//     }
//   }
// }

// ----UPDATE BOARD----
// mutation {
//   updateBoard( id: "66f147f57d4628244989e150"
//     title: "Semester",
//     tasks: [ "66e805d7e65f70271aa2c2df", "66e8064be65f70271aa2c2e3", "66f13192a95b6770b433434c" "66edc6a7e6dc68d05ef9010b"],
//     background: "blue"
//   ) {
//     _id
//     title
//     background
//     tasks {
//       _id
//       title
//       description
//       status
//       assignedTo{_id name email role}
//       createdAt
//       finishedBy
//     }
//   }
// }

// ----DELETE BOARD----
// mutation{deleteBoard(id: "66edcc762a72294986f0432f") {_id title}}

// ----ADD TASK-----
// mutation {
//   addTask(
//     title: "Gris",
//     description: "Gris",
//     assignedTo: "66ebcab447531db6fc3acf41",
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
//     id: "66edc147287b1f75ad8a5fd0",
//     assignedTo: "66ed1e8821ccb186940d7df1"

//   ) {
//     _id
//     title
//     description
//     status
//     assignedTo {_id name}
//     createdAt
//     finishedBy
//   }
// }

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
// mutation {deleteTask(id: "66e7fcc213077aa4e6af9d66"){_id title description}}

// ----REGISTER USER----
// mutation {register(name: "Maya", email: "Maya@Maya.se", password: "123Maya") {
//   _id
//   name
//   email
//   password
// }}

// ----UPDATE USER----
// mutation {
//   updateUser(
//     id: "66f16cc2afb58eb371ca201b",
//     name: "Maya Svenssson"
//     email: "maya@svensson.com",
//     password: "123Maya",
//   ) {
// name email password
//   }
// }

// ----DELETE USER----
// mutation {deleteUser(id: "66ed1edd4ae92974c593aa21"){ _id name}}
