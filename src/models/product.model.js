import mongoose from 'mongoose';
import { PRODUCT_STATUS } from '../constants/product.constants.js';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: '',
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        status: {
            type: String,
            enum: Object.values(PRODUCT_STATUS),
            default: PRODUCT_STATUS.OUT_OF_STOCK
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;