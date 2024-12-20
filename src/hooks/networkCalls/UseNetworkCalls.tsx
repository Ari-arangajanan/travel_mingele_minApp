import {
  GetCategoryReq,
  GetCategoryRes,
} from "../../Components/Interfaces/CategoryInterface";
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
      endpoint: "app/category/getAllCategory",
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

  return { getServiceCategory, login };
};

export default UseNetworkCalls;
