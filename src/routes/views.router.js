import { Router } from "express";
import ProductManager from "../dao/productManagerMongo.js";
import CartManager from "../dao/cartManagerMongo.js";

const router = Router();
const producManager = new ProductManager();
const cartManager = new CartManager();

router.get("/products", async (req, res) => {
  const products = await producManager.getAll();
  const data = JSON.parse(JSON.stringify(products));
  //console.log(data);
  return res.render("products", { data });
});

router.get("/products/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await producManager.getById(id);

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
  } catch (error) {
    next(error);
  }
});

router.get("/carts/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartManager.getCartById(cid);

  // Transformar el objeto "cart" para incluir las propiedades "product" y "quantity"
  const cartTransformed = {
    productsArray: cart.products.map((product) => {
      return {
        product: product.product.title,
        category: product.product.category,
        price: product.product.price,
        quantity: product.quantity,
      };
    }),
  };

  // Pasar el objeto transformado a la plantilla porque handlebars no quiere renderizarlo
  res.render("cart", { cart: cartTransformed });
});

router.get('/products/page/:page', async (req, res) => {

  const page = req.params.page || 1;

  const data = await producManager.getProducts(2, page);
  // console.log(products);

  res.render('products', { data })
})


export default router;
