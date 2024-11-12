// Utility function for getting data from localStorage
export const getDataFromLocalStorage = (key) => {
    try {
      console.log(
        'key getDataFromLocalStorage:',
        key,
        '----------',
      );
      const value = localStorage.getItem(key);
      if (value !== null) {
        // Data retrieved successfully
        return value;
      } else {
        // Key doesn't exist in localStorage
        return null;
      }
    } catch (error) {
      // Error retrieving data
      console.error('Error retrieving data from localStorage:', error);
      return null;
    }
  };

  // Utility function for setting data in localStorage
  export const setDataInLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
      console.log(
        'Data saved successfully in localStorage',
        key,
        ': and :',
        value,
      );

    } catch (error) {
      // Error saving data
      console.error('Error saving data in localStorage:', error);
    }
  };

  // Utility function to clear all data from localStorage
  export const clearLocalStorage = () => {
    try {
      localStorage.clear();
      console.log('Data cleared successfully from localStorage');
    } catch (error) {
      // Error clearing data
      console.error('Error clearing data in localStorage:', error);
    }
  };