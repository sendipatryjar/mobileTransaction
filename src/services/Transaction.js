import axios from 'axios';
import CONSTANTS from '../config/constants';

// get Berita
export const getList = async () => {
  return axios.get(`${CONSTANTS.BASE_URL}`, CONSTANTS.HEADER_JSON);
};
