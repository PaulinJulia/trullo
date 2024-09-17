import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema"
import cors from "cors"

const app = express();
const port = process.env.PORT || 4000;
app.use(cors())

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
