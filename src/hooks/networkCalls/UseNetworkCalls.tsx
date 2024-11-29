import ApiCalls from "./ApiCalls";

interface ServiceProviderListResponse {
  providers: Array<{
    id: number;
    name: string;
    services: string[];
  }>;
  total: number;
}

interface ServiceProviderListRequest {
  page?: number;
  limit?: number;
  userName?: string;
}

const UseNetworkCalls = () => {
  const ServiceProviderListRequest = (
    params: ServiceProviderListRequest = {}
  ): Promise<ServiceProviderListResponse> => {
    const { page = 0, limit = 10, userName = "" } = params;
    const payload = {
      page,
      limit,
      ...(userName && { userName }),
    };
    return ApiCalls<ServiceProviderListResponse>({
      endpoint: "/admin/systemUser/serviceProviderList",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return { ServiceProviderListRequest };
};

export default UseNetworkCalls;
