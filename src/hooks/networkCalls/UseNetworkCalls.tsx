import {
  GetCategoryReq,
  GetCategoryRes,
} from "../../Components/Interfaces/CategoryInterface";
import {
  GetServicesRequest,
  GetServicesResponse,
} from "../../Components/Interfaces/ServiceInterface";
import {
  TelegramIdRequest,
  TokenResponse,
} from "../../Components/Interfaces/TokenInterface";
import ApiCalls from "./ApiCalls";

const UseNetworkCalls = () => {
  const getServiceCategory = (
    params: GetCategoryReq
  ): Promise<GetCategoryRes> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<GetCategoryRes>({
      endpoint: "app/user/category/getAllCategory",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const login = (params: TelegramIdRequest): Promise<TokenResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<TokenResponse>({
      endpoint: "api/auth/generateToken",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getService = (
    params: GetServicesRequest
  ): Promise<GetServicesResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<GetServicesResponse>({
      endpoint: "app/user/service/getServices",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return { getServiceCategory, login, getService };
};

export default UseNetworkCalls;
