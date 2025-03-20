export interface UserDetailsResponse {
    id: number; // Unique identifier for the user
    telegramId: number; // Telegram ID of the user
    userName: string; // Username of the user
    firstName: string; // First name of the user
    lastName: string; // Last name of the user
    email: string; // Email address of the user
    phone: string; // Phone number of the user
    updateTime: string; // Last update timestamp
    registrationDate: string; // Registration date timestamp
    preferredLanguage: string; // Preferred language of the user
    status: number; // Status of the user (e.g., active/inactive)
    type: number; // Type of user (e.g., admin, regular user, etc.)
    avatar?: string; // Avatar image URL of the user (if applicable, nullable)
    category?: any; // Category of the user (if applicable, nullable)
    location?: any; // Location details of the user (if applicable, nullable)
  }

  export interface UpdateAvatarRequest {
    avatar: string; // Avatar image URL of the user
  }
  