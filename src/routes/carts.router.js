import express from 'express'; 
const router = express.Router();
import CartManager from '../dao/managers/cart.manager.js';
import cartModel from '../dao/models/cart.model.js';

const cartManager = new CartManager();
router.post("/", async (req, res) => {
    try{
        const newCart = await cartManager.createCart();
        res.json(newCart);
    }catch(error){
        console.error("error to create cart", error);
        res.status(500).json({error:"Error to create cart"});
    }
});

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    try{
        const cart =  await cartModel.findById(cartId)
        if(!cart){
            console.log("cart not found");
            return res.status(404).json({error:"Cart not found"});
        }
        res.json(cart.products);
    }catch(error){
        console.error("error to get cart", error);
        res.status(500).json({error:"Error to get cart"});
    }  
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    try{
        const actualizeCart = await cartManager.addProductToCart(cartId, productId, quantity);
        res.json(actualizeCart.products);
    }catch(error){
        console.error("error to add product to cart", error);
        res.status(500).json({error:"Error to add product to cart"});
    }
});

export default router;
