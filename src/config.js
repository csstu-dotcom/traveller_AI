import Cookies from 'js-cookie';

export const base_url = 'http://localhost:5000';
// export const base_url = 'https://invoizer-backend.vercel.app';

export const token = Cookies.get('user');