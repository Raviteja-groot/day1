import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import supabase from './config/database.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/user.js';
import { verifyToken } from "./middleware/authMiddleware.js";

// Test Supabase connection
(async () => {
  try {
    const { data, error } = await supabase.from("products").select("*").limit(1);

    if (error) {
      console.log("❌ Supabase connection failed:", error.message);
    } else {
      console.log("✅ Connected to Supabase successfully");
    }
  } catch (err) {
    console.log("❌ Supabase error:", err);
  }
})();



const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed!",
    user: req.user
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Suchi Fashion API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/api/products", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});
