import express from 'express';
import expressHandlebars from 'express-handlebars';
import passport from 'passport';   
import cookieParser from 'cookie-parser';

import "./database.js";

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.urlencoded({extended: true}));
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





//listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});    


