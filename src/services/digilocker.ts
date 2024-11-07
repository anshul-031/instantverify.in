import axios from 'axios';
import { getFeatureFlag } from '../config/features';

export const digilockerService = {
  async getAuthUrl() {
    if (!getFeatureFlag('digilocker')) {
      throw new Error('Digilocker integration is disabled');
    }

    const response = await axios.post('/api/verification/digilocker/auth');
    return response.data;
  },

  async checkStatus(requestId: string) {
    const response = await axios.get(`/api/verification/digilocker/status?requestId=${requestId}`);
    return response.data;
  },

  openDigilockerAuth(url: string) {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      url,
      'Digilocker Authentication',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  },
};