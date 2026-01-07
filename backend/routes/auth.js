import express from 'express';
import supabase from '../config/database.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Register
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])
      .select();
    
    if (error) throw error;
    
    const token = jwt.sign({ userId: data[0].id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: { id: data[0].id, name, email } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !data) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: data.id, name: data.name, email: data.email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;