import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/user'; // User modelinizi import edin

const SECRET = process.env.SECRET as string;

interface AuthRequest extends Request {
  user?: IUser;
}

const decodeUserFromToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token = req.get('Authorization') || req.query.token || req.body.token;
  if (!token) return next();

  token = token.replace('Bearer ', '');
  jwt.verify(token, SECRET, async (err: Error | null, decoded: any) => {
    if (err) return next(err);

    try {
      // JWT'den çözümlenen kullanıcı bilgisine göre veritabanından kullanıcıyı bulun
      const user = await User.findById(decoded?.user?._id);
      req.user = user ? user : undefined;
      next();
    } catch (error) {
      next(error);
    }
  });
};

function checkAuth(req: AuthRequest, res: Response, next: NextFunction) {
  return req.user ? next() : res.status(401).json({ err: 'Not Authorized' });
}

export { decodeUserFromToken, checkAuth };
