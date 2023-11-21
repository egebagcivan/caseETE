import mongoose from 'mongoose';
import {Company} from './company';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    unit: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
