import mongoose from 'mongoose';

const orderUpcyclerSchema = new mongoose.Schema(
  {
    upCycler: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    details: { type: String, required: true },
    totalCloths: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    dueAt: { type: Date },
    isStatus: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    isPicked: { type: Boolean, required: true, default: false },
    PickedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Orders_Upcycler =
  mongoose.models.Orders_Upcycler ||
  mongoose.model('Orders_Upcycler', orderUpcyclerSchema);
export default Orders_Upcycler;
