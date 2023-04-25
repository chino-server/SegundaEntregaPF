import express from "express";
import "./db/dbConfig.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { __dirname } from "./utils/dirname.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import { messagesModel } from "./db/models/messages.model.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(__dirname + "/public/html"));

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");

app.set("view engine", "handlebars");

app.use("/views", viewsRouter);

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

app.set("port", process.env.PORT || 8080);

const httpServer = app.listen(app.get("port"), () => {
  console.log("Servidor iniciado en el puerto: ", app.get("port"));
  console.log(`http://localhost:${app.get("port")}`);
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });

  socket.on("message", async (data) => {
    const newMessage = new messagesModel({
      user: data.user,
      message: data.msg,
    });
    await newMessage.save();

    socket.broadcast.emit("message", data);
  });

  socket.on("usuarioNuevo", async (usuario) => {
    socket.broadcast.emit("broadcast", usuario);

    const messages = await messagesModel.find();

    socket.emit("chat", messages);
  });
});
