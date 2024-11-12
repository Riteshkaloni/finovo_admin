// services/URLService.js

export default class URLService {
    async fetchAsyncData(url, data = {}, method = 'GET') {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Add body for POST and PUT requests
      if (method === 'POST' || method === 'PUT') {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }
  }
