import express from "express";
import yarnRouter from "./routers/yarn-router.js";
import errorHandlingMiddleware from "./error-handling-middleware.js";


const app = express();
app.use(express.json());
app.use(yarnRouter);
app.use(errorHandlingMiddleware);



app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
