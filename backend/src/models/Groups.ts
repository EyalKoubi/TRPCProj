// import mongoose
import mongoose, { Schema } from "mongoose";

// export group schema
export const groupSchema = new mongoose.Schema({
  group_name: String,
  persons_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
  groups_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  have_father: Boolean,
});
