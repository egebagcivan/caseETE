import Product from '../models/product';
import { Request, Response } from 'express';

const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find().populate('company');
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id).populate('company');
        res.json(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).send(error);
    }
};

export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
