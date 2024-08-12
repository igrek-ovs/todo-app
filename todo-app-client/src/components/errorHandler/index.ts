import { toast } from 'react-toastify';

export const handleApiError = (error: any) => {
  if (error.response) {
    const msg = error.response.data.message || 'An error occurred';
    toast.error(msg);
    console.log(msg);
  }
};
