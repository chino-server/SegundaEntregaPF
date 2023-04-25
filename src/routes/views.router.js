import { Router } from "express";
import ProductManager from "../Dao/ManagerMongo/ProductManagerMongo.js";
import CartManager from "../Dao/ManagerMongo/CartManagerMongo.js";

const router = Router();

// Ruta para visualizar todos los productos
router.get("/products", async (req, res) => {
  const productManager = new ProductManager();

  const products = await productManager.getProducts(2);

  res.render("products", { products });
});

router.get("/products/page/:page", async (req, res) => {
  const page = req.params.page || 1;

  const productManager = new ProductManager();
  const products = await productManager.getProducts(2, page);

  res.render("products", { products });
});

router.get("/products/:id", async (req, res) => {
  const productManager = new ProductManager();
  const product = await productManager.getProductById(req.params.id);

  const { _id, title, description, price, code, stock, category, thumbnail } =
    product;

  res.render("product", {
    id: _id,
    title,
    description,
    price,
    code,
    stock,
    category,
    thumbnail,
  });
});

router.get("/carts/:cid", async (req, res) => {
  const cartManager = new CartManager();
  const cart = await cartManager.getCartById(req.params.cid);

  const { products } = cart;

  res.render("cart", { products });
});

export default router;
