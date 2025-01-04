import {
  CreateBookingRequest,
  CreateBookingResponse,
  GetAllBookingsRequest,
  GetAllBookingsResponse,
} from "../../Interfaces/BookingInterface";
import {
  GetServicesCardRequest,
  GetServicesCardResponse,
} from "../../Interfaces/CardDetailsInterface";
import {
  GetCategoryReq,
  GetCategoryRes,
} from "../../Interfaces/CategoryInterface";
import {
  TelegramIdRequest,
  TokenResponse,
} from "../../Interfaces/TokenInterface";
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
    params: GetServicesCardRequest
  ): Promise<GetServicesCardResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<GetServicesCardResponse>({
      endpoint: "app/user/service/getServices",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const submitBooking = (
    params: CreateBookingRequest
  ): Promise<CreateBookingResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<CreateBookingResponse>({
      endpoint: "app/user/bookings/submitBooking",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getAllMyServices = (
    params: GetAllBookingsRequest
  ): Promise<GetAllBookingsResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<GetAllBookingsResponse>({
      endpoint: "app/user/bookings/getAllMyServices",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getAllMyBookings = (
    params: GetAllBookingsRequest
  ): Promise<GetAllBookingsResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<GetAllBookingsResponse>({
      endpoint: "app/serviceProvider/dashboard/getAllMyBookings",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return {
    getServiceCategory,
    login,
    getService,
    submitBooking,
    getAllMyServices,
    getAllMyBookings,
  };
};

export default UseNetworkCalls;
