import { Router } from "express";
import products from './products.router.js'
import carts from './carts.router.js'



const rounter = Router ()

rounter.use ('/api',products)
rounter.use ('/api', carts)

//rounter.use ('/api',carts)




export default rounter