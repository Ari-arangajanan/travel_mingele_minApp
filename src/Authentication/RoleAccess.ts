// Define roles
export const ROLES = {
    SERVICE_PROVIDER: "SERVICE_PROVIDER",
    USER: "USER",
  };
  
  // Common role access for routes
  export const COMMON_ROLES = {
    PUBLIC: [], // Accessible by everyone
    AUTHENTICATED: [ROLES.SERVICE_PROVIDER, ROLES.USER], // Accessible by all logged-in users
    SERVICE_ONLY: [ROLES.SERVICE_PROVIDER], // Accessible by service providers only
  };