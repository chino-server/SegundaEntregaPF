import mongoose from "mongoose";

const URI = 'mongodb+srv://chino:mamadera@cluster0.nur3pb3.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URI)
.then (()=>console.log('Conectado a la base de datos'))
.catch ((error)=>console.log(error))
