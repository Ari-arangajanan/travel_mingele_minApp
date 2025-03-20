export interface UserPaymentAccountRequest {
    id?: number; // Unique identifier for the account
    userId?: number; // User ID associated with the account
    serviceProvider?: Record<string, any>; // Service provider details (adjust type if structure is known)
    accountBalance?: Record<string, any>; // Account balance details (adjust type if structure is known)
    currency?: string; // Currency type
    accountNumber?: string; // Account number
    status?: number; // Status of the account (e.g., active/inactive)
}


export interface UserPaymentAccountResponse {
    id: number; // Unique identifier for the payment account
    serviceProvider: ServiceProvider; // Service provider details
    accountBalance: number; // Account balance as BigDecimal in Java (converted to number)
    currency: string; // Currency type
    accountNumber: string; // Account number
    status: number; // Status of the account (e.g., active/inactive)
}


export interface ServiceProvider extends SnUser {
    category?: string; // Category of the service provider
    location?: string; // Location of the service provider
    // services?: Service[]; // Uncomment if service list is needed
}

export interface SnUser {
    id?: number; // Unique identifier for the user
    telegramId?: number; // Telegram ID of the user
    userName?: string; // Username of the user
    firstName?: string; // First name (nullable in DB)
    lastName?: string; // Last name (nullable in DB)
    email?: string; // Email address (nullable in DB)
    phone?: string; // Phone number (nullable in DB)
    updateTime?: string; // Last update timestamp
    registrationDate?: string; // Registration date timestamp
    preferredLanguage?: string; // Preferred language (nullable in DB)
    status?: number; // Status of the user (default: 1)
    type?: number; // User type
    avatar?: string; // Avatar URL (nullable in DB)
}