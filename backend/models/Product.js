import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  priceValue: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['genz', 'traditional', 'casuals', 'footwear']
  },
  tag: {
    type: String,
    enum: ['NEW', 'FESTIVE', 'POPULAR']
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);