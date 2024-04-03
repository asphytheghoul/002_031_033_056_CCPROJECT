import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    images: {
      type: [
        {
          src: {
            type: String,
            required: true,
          },
          alt: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    highlights: { type: [String], required: true },
    details: { type: String, required: true },
    sizes: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          inStock: {
            type: Boolean,
            required: true,
          },
        },
      ],
      required: true,
    },
    colors: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          class: {
            type: String,
            required: true,
          },
          selectedClass: {
            type: String,
            required: true,
          },
        },
      ],
      required: true,
    },
    // colors: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
