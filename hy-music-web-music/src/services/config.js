const devBaseURL = "http://101.200.120.36:3000";
const proBaseURL = "http://101.200.120.36:3000";
export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseURL: proBaseURL;

export const TIMEOUT = 5000;
