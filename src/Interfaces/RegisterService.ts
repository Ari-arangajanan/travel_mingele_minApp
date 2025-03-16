export interface ServiceAttributeRegistration {
    attributeName: string;
    attributeValue: string;
  }
  
  export interface PricingRuleRegistration {
    pricingType: string;
    price: number;
    startDate: string;
    endDate: string;
  }
  
  export interface ServiceTypeRegistration {
    typeName: string;
    description: string;
    price: number;
    capacity: number;
    serviceAttributeRegistrations: ServiceAttributeRegistration[];
    pricingRuleRegistrations: PricingRuleRegistration[];
  }
  
  export interface ServiceRegisterRequest {
    serviceName: string;
    description: string;
    basePrice: number;
    latitude: number;
    longitude: number;
    categoryId: number;
    serviceProviderId: number;
    serviceTypeRegistrations: ServiceTypeRegistration[];
  }
  