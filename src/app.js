import express from 'express';
import expressHandlebars from 'express-handlebars';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import initializePassport from './config/config.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import sessionRouter from './routes/session.router.js';
import viewsRouter from './routes/views.router.js';
import ticketRouter from './routes/ticket.router.js';
import "./database.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());

initializePassport();

//handlebars
app.engine("handlebars", expressHandlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/tickets", ticketRouter);
app.use("/", viewsRouter);

//listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
