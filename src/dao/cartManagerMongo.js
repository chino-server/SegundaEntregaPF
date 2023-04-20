import { cartsModel } from "../db/models/carts.model.js";
import { productsModel } from "../db/models/products.model.js";

export default class CartManager {
  async createCart() {
    try {
      const cart = await cartsModel.create({});
      return cart;
    } catch (error) {
      console.log(`Error creando carrito: ${error.message}`);
    }
  }

  async getCartById(id) {
    try {
        // Busco el carrito por su id y lo devuelvo con los productos populados (con toda su información)
        const cart = await cartsModel.findById(id).populate('products.product');
        return cart;
    } catch (error) {
        console.log(error);
    }
}

  async addToCart(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) {
        throw new Error(`No se encontro un carrito con el id solicitado.`);
      } else {
        const product = await productsModel.findById(pid);
        if (!product) {
          throw new Error(`No se encontro el product con el id solicitado.`);
        } else {
          const cartProduct = cart.products.find(
            (product) => product.product.toString() === pid
          );
          if (cartProduct) {
            console.log("$inc");
            await cartsModel.findByIdAndUpdate(cid, { $inc: { quantity: 1 } });
          } else {
            console.log("$push");
            await cartsModel.findOneAndUpdate(
              { _id: cid },
              { $push: { products: { product: pid, quantity: 1 } } }
            );
          }
          cart.save();
          return cart;
        }
      }
    } catch (error) {
      console.log(`Error agregando producto al carrito: ${error.message}`);
    }
  }
}


