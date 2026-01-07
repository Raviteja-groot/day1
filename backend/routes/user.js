import express from 'express';
import supabase from '../config/database.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, created_at')
      .eq('id', req.user.id)
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;