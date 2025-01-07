import cartModel from '../models/cart.model.js';

class CartDAO {
    async createCart() {
        try {
            const cart = new cartModel({ products: [] });
            return await cart.save();
        } catch (error) {
            throw new Error(`Error al crear el carrito: ${error.message}`);
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartModel.findOne({ _id: cartId });
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            return cart;
        } catch (error) {
            throw new Error(`Error al obtener el carrito: ${error.message}`);
        }
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            
            if (productIndex !== -1) {
                
                cart.products[productIndex].quantity += quantity;
            } else {
                
                cart.products.push({ product: productId, quantity });
            }

            return await cart.save();
        } catch (error) {
            throw new Error(`Error al agregar producto al carrito: ${error.message}`);
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await this.getCartById(cartId);
            cart.products = cart.products.filter(p => p.product.toString() !== productId);
            return await cart.save();
        } catch (error) {
            throw new Error(`Error al eliminar producto del carrito: ${error.message}`);
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await this.getCartById(cartId);
            cart.products = [];
            return await cart.save();
        } catch (error) {
            throw new Error(`Error al vaciar el carrito: ${error.message}`);
        }
    }
}

export default new CartDAO();