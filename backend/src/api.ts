import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { PORT } from "./config";
import mongoose from "mongoose";
import { Persons, Groups } from "./models";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/trpc", createExpressMiddleware({ router: appRouter }));

export type AppRouter = typeof appRouter;

// define function for connect
// to the Data Base
export const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/myDB");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:");
  }
};

// define function for create indexes
// for the relations and for aggretion
const indexes = () => {
  Persons.collection.createIndex({ first_name: 1 });
  Persons.collection.createIndex({ last_name: 1 });
  Groups.collection.createIndex({ group_name: 1 });
};

// define main function
// for activate the app
const main = () => {
  connectToDb();
  indexes();

  app.listen(PORT, () =>
    console.log(`Server is now listening on port ${PORT}`)
  );
};

// activate the app
main();
