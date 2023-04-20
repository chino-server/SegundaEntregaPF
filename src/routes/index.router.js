import { Router } from "express";
import products from "./products.router.js";
import carts from "./carts.router.js";
import router from "./products.router.js";
import views from "./views.router.js";

const rounter = Router();

rounter.use("/api", products);
rounter.use("/api", carts);
rounter.use("/views", views);

export default rounter;
