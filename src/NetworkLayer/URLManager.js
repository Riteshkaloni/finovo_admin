// services/APIManager.js

import URLService from './URLService';
import { EndPoints, baseUrl } from '../resources/Constants';

export default class URLManager {
  constructor() {
    this.urlService = new URLService();
  }

  // User signUpsuperAdmin Function
  async signUpsuperAdmin(data) {
    const urlPath = `${baseUrl}${EndPoints.SIGN_UP_SUPER_ADMIN}`;
    console.log('SignUpsuperAdmin URL:', urlPath);
    try {
      const response = await this.urlService.fetchAsyncData(urlPath, data, 'POST');
      return response;
    } catch (error) {
      console.error('Login Error:', error);
      throw error;
    }
  }

  // Other functions as needed...
}

