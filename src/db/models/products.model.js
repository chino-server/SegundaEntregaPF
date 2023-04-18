import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new mongoose.Schema({
  code: { type: String, unique: true, require: true },
  status: { type: Boolean, require: true },
  title: { type: String, require: true },
  price: { type: Number, require: true },
  thumbnail: { type: String },
  category: { type: String, require: true },
  stock: { type: Number, require: true },
});

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model("Products", productsSchema);
