import cartModel from "../models/cart.model.js";

class CartManager {
    async createCart() {
        try {
            const newCart = new cartModel({ products: [] });
            await newCart.save();
            return newCart;
        } catch (error) {
            console.error("Error in createCart:", error);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) {
                console.error("Cart not found");
                return null;
            }
            return cart;
        } catch (error) {
            console.error("Error in getCartById:", error);
            throw error;
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId);
            if (!cart) {
                throw new Error("Cart not found");
            }

            const existProduct = cart.products.find(item => item.product.toString() === productId);

            if (existProduct) {
                existProduct.quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }

            cart.markModified('products');
            await cart.save();
            return cart;
        } catch (error) {
            console.error("Error in addProductToCart:", error);
            throw error;
        }
    }
}

export default CartManager;
