import ProductModel from './path/to/ProductModel'; // Ajusta la ruta según tu estructura de carpetas

class ProductDAO {
    async createProduct(productData) {
        try {
            const product = new ProductModel(productData);
            return await product.save();
        } catch (error) {
            throw new Error(`Error al crear el producto: ${error.message}`);
        }
    }

    async getProductById(productId) {
        try {
            const product = await ProductModel.findById(productId);
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            return product;
        } catch (error) {
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }

    async getProducts(filter = {}, options = { page: 1, limit: 10 }) {
        try {
            return await ProductModel.paginate(filter, options);
        } catch (error) {
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    async updateProduct(productId, updateData) {
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(
                productId,
                updateData,
                { new: true } // Devuelve el producto actualizado
            );
            if (!updatedProduct) {
                throw new Error('Producto no encontrado');
            }
            return updatedProduct;
        } catch (error) {
            throw new Error(`Error al actualizar el producto: ${error.message}`);
        }
    }

    async deleteProduct(productId) {
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(productId);
            if (!deletedProduct) {
                throw new Error('Producto no encontrado');
            }
            return deletedProduct;
        } catch (error) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }

    async getProductsByCategory(category) {
        try {
            return await ProductModel.find({ category });
        } catch (error) {
            throw new Error(`Error al obtener productos por categoría: ${error.message}`);
        }
    }

    async getProductsByPriceRange(minPrice, maxPrice) {
        try {
            return await ProductModel.find({
                price: { $gte: minPrice, $lte: maxPrice }
            });
        } catch (error) {
            throw new Error(`Error al obtener productos por rango de precios: ${error.message}`);
        }
    }
}

export default new ProductDAO();