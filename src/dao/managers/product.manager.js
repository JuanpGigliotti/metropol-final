import productModel from '../models/product.model.js';

class ProductManager {
    async addProduct({ title, description, price, img, category, thumbnails, code, stock }) {
        try {
            if (!title || !description || !price || !img || !category || !thumbnails || !code || !stock) {
                throw new Error("All fields are required");
            }

            const existProduct = await productModel.findOne({ code: code });

            if (existProduct) {
                console.log("Product already exists");
                return;
            }

            const newProduct = new productModel({
                title,
                description,
                price,
                img,
                category,
                code,
                stock,
                status: true,
                thumbnails: thumbnails || []
            });
            await newProduct.save();
        } catch (error) {
            console.log("Product error in addProduct:", error);
            throw error;
        }
    }

    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            const skip = (page - 1) * limit;
            let queryOptions = {};
            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort === 'asc' || sort === 'desc') {
                sortOptions.price = sort === 'asc' ? 1 : -1;
            }

            const products = await productModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalProducts = await productModel.countDocuments(queryOptions);
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: products,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null
            };
        } catch (error) {
            console.log("Product error in getProducts:", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById(id);
            if (!product) {
                console.log("Product not found");
                return null;
            }
            console.log("Product found");
            return product;
        } catch (error) {
            console.log("Product error in getProductById:", error);
            throw error;
        }
    }

    async updateProduct(id, productActualize) {
        try {
            const updated = await productModel.findByIdAndUpdate(id, productActualize, { new: true });
            if (!updated) {
                console.log("Product not found");
                return null;
            }
            console.log("Product updated");
            return updated;
        } catch (error) {
            console.log("Product error in updateProduct:", error);
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            const deleted = await productModel.findByIdAndDelete(id);
            if (!deleted) {
                console.log("Product not found");
                return null;
            }
            console.log("Product deleted");
            return deleted;
        } catch (error) {
            console.log("Product error in deleteProduct:", error);
            throw error;
        }
    }
}

export default ProductManager;