import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('https://chp7rfq8li.execute-api.us-east-2.amazonaws.com/dev/processed-data');
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    throw error;
  }
};
