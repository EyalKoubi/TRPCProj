"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDb = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_2 = require("@trpc/server/adapters/express");
const routers_1 = require("./routers");
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
app.use("/trpc", (0, express_2.createExpressMiddleware)({ router: routers_1.appRouter }));
// define function for connect
// to the Data Base
const connectToDb = async () => {
    try {
        await mongoose_1.default.connect("mongodb://127.0.0.1/myDB");
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log("Error connecting to MongoDB:");
    }
};
exports.connectToDb = connectToDb;
// define function for create indexes
// for the relations and for aggretion
const indexes = () => {
    models_1.Persons.collection.createIndex({ first_name: 1 });
    models_1.Persons.collection.createIndex({ last_name: 1 });
    models_1.Groups.collection.createIndex({ group_name: 1 });
};
// define main function
// for activate the app
const main = () => {
    (0, exports.connectToDb)();
    indexes();
    app.listen(config_1.PORT, () => console.log(`Server is now listening on port ${config_1.PORT}`));
};
// activate the app
main();
