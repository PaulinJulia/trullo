import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import cors from "cors";
import jwt from "jsonwebtoken";
// import { auth } from "./middleware/auth"; //Middleware globally

const app = express();
const port = process.env.PORT || 4000;
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP((req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    let user = null;

    if (token && process.env.JWT_SECRET) {
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
        console.error("Invalid token");
      }
    }

    return {
      schema: schema,
      graphiql: true,
      context: { req, res, user }, // Passa användardata till context
    };
  })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
