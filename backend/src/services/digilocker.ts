import axios from 'axios';
import { config } from '../config';
import { logger } from '../utils/logger';

const DIGILOCKER_API = 'https://api.digitallocker.gov.in';

export const digilockerService = {
  async getAuthUrl() {
    try {
      const response = await axios.post(`${DIGILOCKER_API}/public/oauth2/1/authorize`, {
        client_id: config.digilocker.clientId,
        redirect_uri: config.digilocker.redirectUri,
        response_type: 'code',
      });

      return {
        url: response.data.result.url,
        requestId: response.data.result.requestId,
      };
    } catch (error) {
      logger.error('Digilocker getAuthUrl error:', error);
      throw error;
    }
  },

  async handleCallback(code: string, state: string) {
    try {
      const response = await axios.post(`${DIGILOCKER_API}/public/oauth2/1/token`, {
        client_id: config.digilocker.clientId,
        client_secret: config.digilocker.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: config.digilocker.redirectUri,
      });

      return response.data;
    } catch (error) {
      logger.error('Digilocker handleCallback error:', error);
      throw error;
    }
  },

  async checkStatus(requestId: string) {
    try {
      const response = await axios.get(`${DIGILOCKER_API}/public/oauth2/1/status/${requestId}`);
      return response.data.result;
    } catch (error) {
      logger.error('Digilocker checkStatus error:', error);
      throw error;
    }
  },

  async getAadhaarData(accessToken: string) {
    try {
      const response = await axios.get(`${DIGILOCKER_API}/public/oauth2/1/aadhaar`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      logger.error('Digilocker getAadhaarData error:', error);
      throw error;
    }
  },
};