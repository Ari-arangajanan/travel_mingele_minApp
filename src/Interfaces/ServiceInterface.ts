export interface GetServicesRequest {
    categoryId: number; // ID of the category to fetch services for
    telegramId: number; // Telegram ID of the user
    id?: number; // ID of the service
    page: number; // Page number to fetch
    limit: number; // Number of items per page
  }

  export interface GetServicesRequestByFilter {
    categoryId?: number; // ID of the category to fetch services for
    telegramId?: number; // Telegram ID of the user
    id?: number; // ID of the service
  }

  export interface GetService {
    id: number; // Unique identifier for the service
    serviceName: string; // Name of the service
    description: string; // Description of the service
    basePrice: number; // Base price of the service
    status: number; // Status of the service (e.g., active/inactive)
    latitude: number; // Latitude of the service location
    longitude: number; // Longitude of the service location
    createdAt: string; // Timestamp when the service was created
    updatedAt: string | null; // Timestamp when the service was last updated
    category_id: number; // ID of the associated category
    category_name: string; // Name of the associated category
    imageUrl: string; // URL of the service image
    ServiceType: ServiceType[]; // List of service types for the service
  }
  export interface PricingRule {
    id: number;
    pricingType: string;
    price: number;
    startDate: string;
    endDate: string;
  }

  export interface ServiceType {
    id: number; // Unique identifier for the service type
    typeName: string; // Type of service (e.g., "SUV", "Sedan")
    description: string; // Description of the service type
    price: number; // Price of the service type
    capacity: number; // Capacity of the service type (e.g., number of seats)
    status: number; // Status of the service type
    serviceAttributes: ServiceAttribute[]; // List of attributes for the service type
    pricingRuleRegistrations: PricingRule[]; // List of pricing rules for the service type
  }

  export interface ServiceAttribute {
    id: number; // Unique identifier for the attribute
    attributeName: string; // Name of the attribute (e.g., "fuel_type")
    attributeValue: string; // Value of the attribute (e.g., "Diesel")
  }

  export interface GetServicesResponse {
    content: GetService[]; // Array of service objects
    pageable: {
      pageNumber: number; // Current page number
      pageSize: number; // Number of items per page
      sort: {
        empty: boolean; // Whether sorting criteria is empty
        sorted: boolean; // Whether the content is sorted
        unsorted: boolean; // Whether the content is unsorted
      };
      offset: number; // Offset value for pagination
      paged: boolean; // Whether pagination is enabled
      unpaged: boolean; // Whether pagination is disabled
    };
    last: boolean; // Whether this is the last page
    totalPages: number; // Total number of pages
    totalElements: number; // Total number of elements
    first: boolean; // Whether this is the first page
    size: number; // Number of items per page
    number: number; // Current page index
    sort: {
      empty: boolean; // Whether sorting criteria is empty
      sorted: boolean; // Whether the content is sorted
      unsorted: boolean; // Whether the content is unsorted
    };
    numberOfElements: number; // Number of elements on the current page
    empty: boolean; // Whether the content is empty
  }
  