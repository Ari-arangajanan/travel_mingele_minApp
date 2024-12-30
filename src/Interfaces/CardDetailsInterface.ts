export interface GetServicesCardRequest {
    categoryId: number; // ID of the category to fetch services for
    telegramId: number; // Telegram ID of the user
    page: number; // Page number to fetch
    limit: number; // Number of items per page
  }
  
  export interface GetServicesCardResponse {
    content: Array<{
      id: number; // Unique identifier for the service
      serviceName: string; // Name of the service
      description: string; // Description of the service
      basePrice: number; // Base price of the service
      status: number; // Status of the service (e.g., active/inactive)
      imageUrl: string; // URL of the image for the service
      latitude: number; // Latitude of the service location
      longitude: number; // Longitude of the service location
      createdAt: string; // Timestamp when the service was created
      updatedAt: string | null; // Timestamp when the service was last updated
      category_id: number; // ID of the associated category
      ServiceType: Array<{
        id: number; // Unique identifier for the service type
        typeName: string; // Name of the service type
        description: string; // Description of the service type
        price: number; // Price for this service type
        capacity: number; // Capacity of the service type (e.g., number of passengers)
        serviceAttributes: Array<{
          id: number; // Unique identifier for the attribute
          attributeName: string; // Name of the attribute
          attributeValue: string; // Value of the attribute
        }>; // List of attributes for the service type
        pricingRuleRegistrations: Array<{
          id: number; // Unique identifier for the pricing rule
          pricingType: string; // Type of the pricing rule (e.g., "Weekend Rate")
          price: number; // Price for this rule
          startDate: string; // Start date for the pricing rule
          endDate: string; // End date for the pricing rule
        }>; // Pricing rules associated with this service type
      }>; // Service types associated with the service
    }>;
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