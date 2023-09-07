// import mongoose
import mongoose, { ObjectId, Schema } from "mongoose";
// const mongoose = require("mongoose");

// define person schema
export const personSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  age: Number,
  belongs_to: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
});
