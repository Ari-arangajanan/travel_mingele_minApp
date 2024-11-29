const config = {
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3000/api",
    apiKey: process.env.REACT_APP_API_KEY || "",
    environment: process.env.REACT_APP_ENV || "development",
    withCredentials: true,
  };
  
  export default config;
  