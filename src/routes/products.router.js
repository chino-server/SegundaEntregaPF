import { Router } from "express";
import ProductManager from "../dao/productManagerMongo.js";



const router = Router();
const productManager = new ProductManager();
const notFound = { error: "Product not found" };

router.get("/products", async (req, res) => { 
  const limit = req.query.limit;
  const products = await productManager.getAll();
  if (!limit) {
    return res.status(200).json(products);
  } else {
    const limitedProducts = products.slice(0, limit);
    return res.status(200).json(limitedProducts);
  }
});

router.get ('/productsPrueba', async (req,res)=>{
    const {limit,page}= req.query
    
    if (!limit){
        const products = await productManager.getAll();
        res.json (products)
    }else{
    const productoPaginate = await productManager.funcionPrueba(+limit,page)
    res.json (productoPaginate)
    console.log ('Aqui entra');
    }
    

})
router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getById(pid);
  !product ? res.status(404).json(notFound) : res.status(200).json(product);
});

router.post("/products", async (req, res) => {
  const product = req.body;
  const addedProduct = await productManager.addProduct(product);
  !addedProduct
    ? res.status(400).json({ error: "No se puede agregar el producto" })
    : res.status(200).json({ message: `Producto agregado${product}` });
});

router.put("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const modification = req.body;
  const modifiedProduct = await productManager.updateProduct(pid, modification);
  !modifiedProduct
    ? res.status(400).json({ error: `No se pudo modificar el producto` })
    : res.status(200).json(modifiedProduct);
});

router.delete("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const removedProduct = await productManager.deleteById(parseInt(pid));
  !removedProduct
    ? res.status(404).json(notFound)
    : res.status(200).json(removedProduct);
});

router.delete("/products", async (req, res) => {
  const removedProducts = await productManager.deleteAll();
  !removedProducts
    ? res.status(404).json({ error: "No se pudo eliminar los productos" })
    : res.status(200).json(removedProducts);
});
export default router;
