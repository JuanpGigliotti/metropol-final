import express from 'express';  
const router = express.Router();    
import ProductManager from '../dao/managers/product.manager.js';
import CartManager from '../dao/managers/cart.manager.js';
import {soloAdmin, soloUser} from '../middleware/auth.js';
import passport from 'passport';

const productManager = new ProductManager();
const cartManager = new CartManager();  


router.get("/products", passport.authenticate('jwt', {session: false}), soloUser, async (req, res) => {
    try{
    const {page = 1, limit = 2} = req.query;
    const products = await productManager.getProducts({
        page: parseInt(page),
        limit: parseInt(limit)
    });
    
    const newArray = products.docs.map(product =>{
        const {_id, ...rest} = product.toObject();
        return rest;
    })

    res.render("products", {
        products: newArray,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,  
        prevPage: products.prevPage,    
        nextPage: products.nextPage,
        currentPage: products.page,
        totalPages: products.totalPages
    });
    }catch(error){
        console.log("error load", error);
        res.status(500).json({
            status:"error",
            error:'server error'
        });
    }
});

router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;
    try{
        const cart = await cartManager.getCartById(cartId);
        if(!cart){
            console.log("cart not found");
            return res.status(404).json({error:"cart not found"});
        }
    
        const productsInCart = cart.products.map(item =>({
            product: item.product.toObject(),
            quantity: item.quantity
        }));

        res.render("carts", {products: productsInCart});
    }catch(error){
        console.log("error load", error);
        res.status(500).json({error:'server error'});
    }
});

router.get ("/login", (req, res) => {
    res.render("login");
});    

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/realtimeproducts", passport.authenticate('jwt', {session: false}), soloAdmin, async (req, res) => {
    res.render("realtimeproducts");
});

export default router;
