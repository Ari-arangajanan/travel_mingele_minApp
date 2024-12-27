interface Service {
    serviceName: string;
    description: string;
    basePrice: number;
    id: number;
  }
  
  interface CardData {
    imageUrl: string;
    title: string;
    description: string;
    price: string;
    id: string;
  }
  
  export const transformToCardData = (services: Service[]): CardData[] => {
    return services.map((service) => ({
      imageUrl: "https://via.placeholder.com/128", // Replace with actual image URL if available
      title: service.serviceName, // Map service name to title
      description: `${service.description} • Price: $${service.basePrice}`, // Combine description and price
      price: `$${service.basePrice.toFixed(2)}`, // Format price with two decimals
      id: service.id.toString(), // Convert numeric ID to string
    }));
  };

  export function getTelegramUser() {
    const telegramUser = window.Telegram?.WebApp;
    const appEnv = import.meta.env.VITE_APP_ENV; // Access the environment variable
    const telegramId = Number(import.meta.env.VITE_APP_TELEGRAM_ID); // Access the hardcoded Telegram ID
    
    if (appEnv === "development") {
        console.warn("Development environment detected. Returning hardcoded Telegram ID.");
        return { id: telegramId }; // Return mock user object with hardcoded Telegram ID
    }

    if (!telegramUser) {
        throw new Error("Telegram WebApp is not available");
    }

    // Retrieve the user object
    const user = telegramUser.initDataUnsafe?.user;

    if (!user) {
        throw new Error("Telegram user data is unavailable in production environment.");
    }

    return user;
}


  