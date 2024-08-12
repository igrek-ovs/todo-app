import { instance } from '../../store/api/middleware/axiosInterceptor';
import { handleApiError } from '../errorHandler';

export const isAccessTokenValid = async () => {
  const accessTTL = Number(localStorage.getItem('accessTokenTTL'));

  if (accessTTL <= Date.now() / 1000) {
    await refreshAccessToken();
  }
};

const refreshAccessToken = async () => {
  try {
    const response = await instance({
      method: 'post',
      url: `/auth/refresh`,
      params: {
        refreshToken: `${localStorage.getItem('refreshToken')}`,
      },
    });

    const { accessToken, accessTokenTTL } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessTokenTTL', accessTokenTTL);
  } catch (error: any) {
    handleApiError(error);
    if (error.response.status === 401) {
      const refreshTTL = Number(localStorage.getItem('refreshTokenTTL'));

      if (refreshTTL <= Math.floor(Date.now() / 1000)) {
        localStorage.clear();
      }
    }
  }
};
