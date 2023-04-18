import { productsModel } from "../db/models/products.model.js";

export default class ProductManager {
  async addProduct(product) {
    try {
      const newProduct = await productsModel.create(product);
      return newProduct;
    } catch (error) {
      console.log(`Error al agregar producto: ${error}`);
    }
  }

  async getAll() {
    try {
      const allProducts = await productsModel.find();
      return allProducts;
    } catch (error) {
      console.log(`Error al consultar productos: ${error}`);
    }
  }

  async getById(id) {
    try {
      const product = await productsModel.find({ _id: id });
      if (product) {
        return product;
      } else {
        throw new Error(`Producto con id ${id} no encontrado`);
      }
    } catch (error) {
      console.log(
        `Error al buscar producto con el id solicitado: ${error.message}`
      );
    }
  }

  async updateProduct(id, product) {
    try {
      const productFinded = await this.getById(id);
      if (productFinded) {
        await productsModel.findOneAndUpdate({ _id: id }, product);
        const updatedProduct = await this.getById(id);
        return updatedProduct;
      } else {
        throw new Error(`No se encontro el producto con el id solicitado`);
      }
    } catch (error) {
      console.log(
        `Error al modificar producto con el id ${id}: ${error.message}`
      );
    }
  }

  async deleteById(id) {
    try {
      const deletedProduct = await this.getById(id);
      if (deletedProduct) {
        await productsModel.deleteOne({ _id: id });
        return "Producto eliminado";
      } else {
        throw new Error(`Producto con id ${id} no encontrado`);
      }
    } catch (error) {
      console.log(
        `Error al eliminar el producto con el id solicitado: ${error.message}`
      );
    }
  }

  async deleteAll() {
    try {
      await productsModel.deleteMany();
      return "Productos eliminados";
    } catch (error) {
      console.log(`Ocurrio un error eliminando los datos: ${error.message}`);
    }
  }

  async funcionPrueba (l){
    const products = await productsModel.paginate({},{limit:l})
    return products
  }
}
