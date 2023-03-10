const devBaseURL = "http://139.196.153.80:3000";
const proBaseURL = "http://139.196.153.80:3000";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;
