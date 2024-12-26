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
  