import express from 'express'; 
const router = express.Router();
import productManager from '../dao/managers/product.manager.js';

router.get('/', async (req, res) => {
    try{
        const { limit = 10, page = 1, sort, query} = req.query;

        const products = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query
        });

        res.json({
            status: "success",
            payload: products,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null
        });
    }catch(error){
        console.log("Error in getProducts:", error);
        res.status(500).json({
            status: "error",
            error: "Error getting products"
        });
    }
});

router.get('/:pid', async (req, res) => {
    const id = req.params.pid;

    try{
        const product = await productManager.getProductById(id);
        if(!product){
            return res.json({
                error: "Product not found"
            });
        }

        res.json(product);
    }catch (error){
        console.log("error in getProductById:", error);
        res.status(500).json({
            error: "Error getting product"
        });
    }
});

router.post('/', async (req, res) => {
    const newProduct = req.body;

    try{
        await productManager.addProduct(newProduct);
        res.status(201).json({
            message: "Product added"
        });
    }catch(error){
        console.log("Error in addProduct:", error);
        res.status(500).json({
            error: "Error adding product"
        });
    }
});

router.put('/:pid', async (req, res) => {
    const id = req.params.pid;
    const productActualize = req.body;

    try{
    await productManager.updateProduct(id, productActualize);
    res.json({
        message: "Product updated"
    });
    }catch(error){
        console.log("Error in updateProduct:", error);
        res.status(500).json({
            error: "Error updating product"
        });
    }
});

router.delete('/:pid', async (req, res) => {
    const id = req.params.pid;

    try{
        await productManager.deleteProduct(id);
        res.json({
            message: "Product deleted"
        });
    }catch(error){
        console.log("Error in deleteProduct:", error);
        res.status(500).json({
            error: "Error deleting product"
        });
    }
});

export default router;