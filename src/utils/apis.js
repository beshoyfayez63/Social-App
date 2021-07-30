import axios from './libs/axios';

export const getClient = async (url, token) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: !!token ? token : null,
    },
  });
  return response.data;
};
