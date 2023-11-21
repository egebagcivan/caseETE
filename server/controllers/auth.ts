import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from '../models/user';

interface AuthRequest extends Request {
  user?: { _id: string };
  body: {
    email?: string;
    password?: string;
    newPassword?: string;
  };
}

async function signup(req: AuthRequest, res: Response) {
  try {
    if (!process.env.SECRET) throw new Error('no SECRET in back-end .env');
    const user = await User.findOne({ email: req.body.email });
    if (user) throw new Error('Account already exists');

    const newUser = await User.create(req.body);

    const token = createJWT(newUser);
    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    handleAuthError(err, res);
  }
}

async function login(req: AuthRequest, res: Response) {
  try {
    if (!process.env.SECRET) throw new Error('no SECRET in back-end .env');

    const email = req.body.email;
    if (!email) throw new Error('Email is required');
    const user = await User.findOne({ email: email });
    if (!user) throw new Error('User not found');

    const password = req.body.password;
    if (!password) throw new Error('Password is required');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Incorrect password');

    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    handleAuthError(err, res);
  }
}
async function changePassword(req: AuthRequest, res: Response) {
  try {
    // Ensure that req.user and req.user._id are defined
    if (!req.user || !req.user._id) throw new Error('User ID is required');

    const user = await User.findById(req.user._id);
    if (!user) throw new Error('User not found');

    // Ensure that req.body.password is defined
    const currentPassword = req.body.password;
    if (!currentPassword) throw new Error('Current password is required');

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) throw new Error('Incorrect password');

    // Ensure that req.body.newPassword is defined
    const newPassword = req.body.newPassword;
    if (!newPassword) throw new Error('New password is required');

    user.password = newPassword;
    await user.save();

    const token = createJWT(user);
    res.json({ token });

  } catch (err) {
    handleAuthError(err, res);
  }
}

function handleAuthError(err: unknown, res: Response): void {
  if (err instanceof Error) {
    console.error(err);
    const message = err.message;
    if (message === 'User not found' || message === 'Incorrect password') {
      res.status(401).json({ err: message });
    } else {
      res.status(500).json({ err: message });
    }
  } else {
    // Handle non-Error objects (unknown errors)
    res.status(500).json({ err: 'An unknown error occurred' });
  }
}

function createJWT(user: any): string {
  if (!user._id) throw new Error('Invalid user object');
  return jwt.sign({ user }, process.env.SECRET as string, { expiresIn: '24h' });
}

export { signup, login, changePassword };
