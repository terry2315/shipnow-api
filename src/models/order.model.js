import mongoose from "mongoose";
import { ORDER_STATUS, ORDER_PRIORITY } from '../constants/order.constants.js';

const orderItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    _id: false
  }
);

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Store',
      required: true
    },

    items: {
      type: [orderItemSchema],
      required: true
    },

    deliveryAddress: {
      type: String,
      required: true,
      trim: true
    },

    total: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.CREATED
    },

    priority: {
      type: String,
      enum: Object.values(ORDER_PRIORITY),
      default: ORDER_PRIORITY.NORMAL
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const OrderModel = mongoose.model('Order', orderSchema);

export default OrderModel;
