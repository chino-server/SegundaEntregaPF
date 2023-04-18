import { Router } from "express";
import CartManager from "../dao/cartManagerMongo.js";


const router = Router();
const cartManager = new CartManager();
const notFound = { error: "Cart not found" };

router.post("/carts", async (req, res) => {
  await cartManager.createCart();
  res.status(201).json({ mensaje: "Carrito creado con exito" });
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getById(cid);
  !cart ? res.status(404).json(notFound) : res.status(200).json(cart);
});

router.post("/carts/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.addToCart(cid, pid);
  !cart ? res.status(404).json(notFound) : res.status(200).json(cart);
});

export default router;
