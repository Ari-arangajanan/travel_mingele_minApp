import {
  ApproveBooking,
  BookingStatusUpdateResponse,
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
import { PaymentRequest } from "../../Interfaces/Paymenty";
import {
  TelegramIdRequest,
  TokenResponse,
} from "../../Interfaces/TokenInterface";
import ApiCalls from "./ApiCalls";
import {
  PaymentInvoiceRequest,
  PaymentInvoiceResponse,
} from "../../Interfaces/InvoiceInterface";
import { ServiceCategoryDropDownResponse } from "../../Interfaces/AddServiceInterface";
import { ServiceRegisterRequest } from "../../Interfaces/RegisterService";

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

  const approvals = (
    params: ApproveBooking
  ): Promise<BookingStatusUpdateResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<BookingStatusUpdateResponse>({
      endpoint: "app/serviceProvider/dashboard/bookingAcceptance",
      method: "PUT",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const pay = (params: PaymentRequest): Promise<String> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<String>({
      endpoint: "app/user/payment/pay",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getInvoice = (
    params: PaymentInvoiceRequest
  ): Promise<PaymentInvoiceResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<PaymentInvoiceResponse>({
      endpoint: "app/user/payment/getInvoice",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getPaySlip = (
    params: PaymentInvoiceRequest
  ): Promise<PaymentInvoiceResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<PaymentInvoiceResponse>({
      endpoint: "app/user/payment/paySuccess",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const dropDownCategory = (): Promise<ServiceCategoryDropDownResponse> => {
    return ApiCalls<ServiceCategoryDropDownResponse>({
      endpoint: "app/user/category/getCategoriesForDropdown",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const registerServices = (
    params: ServiceRegisterRequest
  ): Promise<ServiceRegisterRequest> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<ServiceRegisterRequest>({
      endpoint: "app/serviceProvider/serviceRegistration/registrations",
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
    approvals,
    pay,
    getInvoice,
    getPaySlip,
    dropDownCategory,
    registerServices,
  };
};

export default UseNetworkCalls;
