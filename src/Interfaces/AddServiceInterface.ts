export interface AddServiceInterface {
    serviceName: string;
    description: string;
    basePrice: number;
    latitude: number;
    longitude: number;
    categoryId: number;
    serviceProviderId: number;
    imageUrl: string;
    serviceTypeRegistrations: any[];
  }

  export interface ServiceCategoryDropDownResponse {
    id: string;
    name: string;
  }