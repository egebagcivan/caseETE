import {Company} from '../models/company';
import { Request, Response } from 'express';

const getCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getCompany = async (req: Request, res: Response) => {
    try {
        const company = await Company.findById(req.params.id);
        res.json(company);
    } catch (error) {
        res.status(500).send(error);
    }
};

const createCompany = async (req: Request, res: Response) => {
    try {
        const newCompany = new Company(req.body);
        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        res.status(400).send(error);
    }
};

const updateCompany = async (req: Request, res: Response) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCompany);
    } catch (error) {
        res.status(400).send(error);
    }
};

const deleteCompany = async (req: Request, res: Response) => {
    try {
        const deletedCompany = await Company.findByIdAndDelete(req.params.id);
        res.json(deletedCompany);
    } catch (error) {
        res.status(500).send(error);
    }
};

export default {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany
};
