import { User } from "../models/user";
import { Request, Response } from "express";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default {
    getUsers,
};
