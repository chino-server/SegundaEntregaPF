import { Router } from "express";
import CartManager from "../Dao/ManagerMongo/CartManagerMongo.js";

const router = Router();

const cartManager = new CartManager("./carrito.json");

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartManager.getCartById(cid);

    if (cart) {
      res.status(200).send({ status: "success", payload: cart });
    } else {
      res.status(404).send({ status: "error", error: "Carrito no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "error", error: "Error al obtener el carrito" });
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.addCart();

    res.status(201).send({ status: "success", payload: cart });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ status: "error", error: "Error al agregar el carrito" });
  }
});

// Endpoint para agregar un producto (pid) a un carrito (cid)
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartManager.addProductToCart(cid, pid);

    if (cart) {
      res.status(201).send({ status: "success", payload: cart });
    } else {
      res
        .status(404)
        .send({ status: "error", error: "Carrito o producto no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        status: "error",
        error: "Error al agregar el producto al carrito",
      });
  }
});

router.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await cartManager.deleteProductFromCart(cid, pid);

    if (cart) {
      res.status(200).send({ status: "success", payload: cart });
    } else {
      res
        .status(404)
        .send({ status: "error", error: "Carrito o producto no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        status: "error",
        error: "Error al eliminar el producto del carrito",
      });
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await cartManager.deleteAllProductsFromCart(cid);

    if (cart) {
      res.status(200).send({ status: "success", payload: cart });
    } else {
      res.status(404).send({ status: "error", error: "Carrito no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        status: "error",
        error: "Error al eliminar los productos del carrito",
      });
  }
});

router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;

    const cart = await cartManager.updateAllProductsFromCart(cid, products);

    if (cart) {
      res.status(200).send({ status: "success", payload: cart });
    } else {
      res
        .status(404)
        .send({ status: "error", error: "Carrito o producto no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        status: "error",
        error: "Error al actualizar los productos del carrito",
      });
  }
});

router.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await cartManager.updateProductQuantityFromCart(
      cid,
      pid,
      quantity
    );

    if (cart) {
      res.status(200).send({ status: "success", payload: cart });
    } else {
      res
        .status(404)
        .send({ status: "error", error: "Carrito o producto no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({
        status: "error",
        error: "Error al actualizar la cantidad del producto en el carrito",
      });
  }
});

export default router;
