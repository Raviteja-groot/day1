import jwt from 'jsonwebtoken';
import supabase from '../config/database.js';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email')
      .eq('id', decoded.userId)
      .single();
    
    if (error || !data) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};