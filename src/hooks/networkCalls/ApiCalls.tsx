import axios, { Method } from "axios";
import { useNavigate } from "react-router-dom";

interface ApiCallsParam {
  endpoint: string; // The API endpoint to which the request will be sent.
  method?: Method; // Optional HTTP method, defaults to "GET" if not specified.
  data?: any; // Optional request body (e.g., for POST or PUT requests).
  headers?: Record<string, string>; // Optional headers for the request (e.g., "Authorization").
}

const ApiCalls = async <T,>({
  endpoint,
  method = "GET",
  data = null,
  headers = {},
}: ApiCallsParam): Promise<T> => {
  // const navigate = useNavigate();
  // Get the base URL from the environment variable
  const baseURL = import.meta.env.VITE_BASE_URL;

  // Validate the baseURL to avoid runtime errors
  if (!baseURL) {
    throw new Error(
      "Base URL is not defined. Please set VITE_BASE_URL in the environment variables."
    );
  }

  // Ensure no double slashes in the final URL
  const url = baseURL.endsWith("/")
    ? `${baseURL}${endpoint}`
    : `${baseURL}/${endpoint}`;

  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem("token");
  // if (!token) {
  //   navigate("/welcome");
  // }

  try {
    // Perform the API request
    const response = await axios({
      url,
      method,
      data,
      headers: {
        "Content-Type": "application/json", // Default content type
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add token to headers if available
        ...headers, // Override with custom headers if provided
      },
    });
    return response.data; // Return only the response data
  } catch (error: any) {
    console.error("API call error:", error);

    // Enhance error information for debugging
    if (error.response) {
      // API responded with a status code outside the 2xx range
      alert("API call error: " + error.response.data.message);
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // No response received
      console.error("Request data:", error.request);
    } else {
      // Error setting up the request
      console.error("Error message:", error.message);
    }

    // Rethrow the error for the caller to handle
    throw error;
  }
};

export default ApiCalls;
