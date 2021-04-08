import axios from 'axios';
import { BASE_URL } from '../constants';

export const useAuthenticate = async (token: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/user/verify`,
      { token },
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      },
    );
    return response.status === 200;
  } catch (_) {
    return false;
  }
};
