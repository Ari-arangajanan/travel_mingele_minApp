import {
  GetCategoryReq,
  GetCategoryRes,
} from "../../Components/Interfaces/CategoryInterface";
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
  const getServiceCategory = (
    params: GetCategoryReq
  ): Promise<GetCategoryRes> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<GetCategoryRes>({
      endpoint: "/app/category/getAllCategory",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return { getServiceCategory };
};

export default UseNetworkCalls;
