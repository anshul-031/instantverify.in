import axios from 'axios';
import { getFeatureFlag } from '../config/features';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;

export const razorpayService = {
  async createOrder(amount: number) {
    if (!getFeatureFlag('razorpay')) {
      throw new Error('Razorpay integration is disabled');
    }

    const response = await axios.post('/api/payments/create-order', { amount });
    return response.data;
  },

  async loadRazorpay(): Promise<any> {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve((window as any).Razorpay);
      document.body.appendChild(script);
    });
  },

  async initializePayment(options: any) {
    const Razorpay = await this.loadRazorpay();
    const rzp = new Razorpay({
      key: RAZORPAY_KEY,
      ...options,
    });
    rzp.open();
  },
};