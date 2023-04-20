import express from "express"
import handlebars from 'express-handlebars'
import { __dirname } from "./utils.js"
import routers from "./routes/index.router.js"
import './db/dbConfig.js'



const app = express ()
const PORT = 8080

// Middlewares 
app.use (express.json())
app.use (express.urlencoded({extended:true}))

//Configuracion de archivos estáticos
app.use (express.static (__dirname + '/public'))

//Configuración de motor de plantilla

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

//Routes
app.use ('/', routers)

app.listen (PORT, ()=>{
    console.log("Escuchando al puerto",PORT);
})