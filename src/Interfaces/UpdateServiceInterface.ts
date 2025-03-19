export interface UpdateServiceRequest {
    id: number; // Unique identifier for the service
    serviceName?: string; // Name of the service (optional in case it is not updated)
    description?: string; // Description of the service (optional in case it is not updated)
    basePrice?: number; // Base price of the service (optional in case it is not updated)
    status?: number; // Status of the service (e.g., active/inactive) (optional in case it is not updated)
    latitude?: number; // Latitude of the service location (optional in case it is not updated)
    longitude?: number; // Longitude of the service location (optional in case it is not updated)
    imageUrl?: string; // URL of the service image (optional in case it is not updated)
    category_name?: string; // Name of the associated category (optional in case it is not updated)
    category_id?: number; // ID of the associated category (optional in case it is not updated)
    serviceType?: serviceType[]; // List of service types for the service (optional if no changes)
  }
  
  export interface serviceType {
    id: number; // Unique identifier for the service type
    typeName?: string; // Type of service (e.g., "SUV", "Sedan") (optional in case it is not updated)
    description?: string; // Description of the service type (optional in case it is not updated)
    price?: number; // Price of the service type (optional in case it is not updated)
    capacity?: number; // Capacity of the service type (optional in case it is not updated)
    status?: number; // Status of the service type (optional in case it is not updated)
    serviceAttributeRegistrations?: serviceAttributeRegistrations[]; // List of attributes for the service type (optional if no changes)
    pricingRuleRegistrations?: PricingRule[]; // List of pricing rules for the service type (optional if no changes)
  }
  
  export interface serviceAttributeRegistrations {
    id: number; // Unique identifier for the attribute
    attributeName?: string; // Name of the attribute (e.g., "fuel_type") (optional in case it is not updated)
    attributeValue?: string; // Value of the attribute (e.g., "Diesel") (optional in case it is not updated)
  }
  
  export interface PricingRule {
    id: number; // Unique identifier for the pricing rule
    pricingType?: string; // Pricing type (e.g., "Weekend Rate") (optional in case it is not updated)
    price?: number; // Price for the pricing rule (optional in case it is not updated)
    startDate?: string; // Start date of the pricing rule (optional in case it is not updated)
    endDate?: string; // End date of the pricing rule (optional in case it is not updated)
  }
  