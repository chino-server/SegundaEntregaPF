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
      const allProducts = await productsModel.paginate({},{})
      return allProducts;
    } catch (error) {
      console.log(`Error al consultar productos: ${error}`);
    }
  }

  async getById(id) {
    try {
      const product = await productsModel.findById(id);
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

  async funcionPrueba (l,p){
    try {
      const products = await productsModel.paginate({},{limit:l,page:p})
      return products
    } catch (error) {
      console.log(error);
    }
    
  }

  async getProducts(limit, page, sort, query) {
    try {
        // const allProducts = await productsModel.find();

        const search = query ? {
            stock: { $gt: 0 },
            $or: [
                //devuelve todos los productos que tengan el query en el titulo o en la categoria
                { category: { $regex: query, $options: 'i' } },
                { title: { $regex: query, $options: 'i' } },
            ]
        } : {
            //devuelve todos los productos que tengan stock mayor a 0
            stock: { $gt: 0 }
        }

        if (sort === 'asc') {
            sort = { price: 1 };
        } else if (sort === 'desc') {
            sort = { price: -1 };
        }

        const options = {
            page: page || 1,
            limit: limit || 10,
            sort: sort,
            lean: true,
        }

        const allProducts = await productsModel.paginate(search, options)
        return allProducts;
    } catch (error) {
        console.log(error);
    }
}
}
