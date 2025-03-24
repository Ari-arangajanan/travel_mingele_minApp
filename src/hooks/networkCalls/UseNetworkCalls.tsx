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
import {
  PaymentRequest,
  PaymentSuccessRequest,
} from "../../Interfaces/Paymenty";
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
import {
  GetService,
  GetServicesRequestByFilter,
} from "../../Interfaces/ServiceInterface";
import { UpdateServiceRequest } from "../../Interfaces/UpdateServiceInterface";
import {
  UpdateAvatarRequest,
  UserDetailsResponse,
} from "../../Interfaces/ProfileInterface";
import {
  UserPaymentAccountRequest,
  UserPaymentAccountResponse,
} from "../../Interfaces/AccountInterface";
import {
  DashBoardInterfaceRequest,
  DashBoardStatisticResponse,
} from "../../Interfaces/DashBoardInterface";

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

  const payMentSuccess = (params: PaymentSuccessRequest): Promise<any> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<any>({
      endpoint: "app/user/payment/paySuccess",
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

  const uploadImage = async (file: File): Promise<String> => {
    const arrayBuffer = await file.arrayBuffer(); // Convert file to raw binary data
    const byteArray = new Uint8Array(arrayBuffer); // Convert ArrayBuffer to Uint8Array

    return ApiCalls<String>({
      endpoint: "app/S3files/image/upload",
      method: "POST",
      data: byteArray,
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
  };

  const getServiceByFilter = (
    params: GetServicesRequestByFilter
  ): Promise<GetService> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<GetService>({
      endpoint: "app/user/service/getServiceById",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const updateService = (params: UpdateServiceRequest): Promise<GetService> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<GetService>({
      endpoint: "app/user/service/updateService",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getMe = (): Promise<UserDetailsResponse> => {
    return ApiCalls<UserDetailsResponse>({
      endpoint: "app/user/getMe",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const updateAvatar = (
    params: UpdateAvatarRequest
  ): Promise<UserDetailsResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<UserDetailsResponse>({
      endpoint: "app/user/updateAvatar",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // get payment account
  const getMyPaymentAccount = (): Promise<UserPaymentAccountResponse> => {
    return ApiCalls<UserPaymentAccountResponse>({
      endpoint: "app/user/payment/getPaymentAccount",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const createPaymentAccount = (
    params: UserPaymentAccountRequest
  ): Promise<UserPaymentAccountResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<UserPaymentAccountResponse>({
      endpoint: "app/user/payment/create",
      method: "POST",
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getDashBoard = (
    params: DashBoardInterfaceRequest
  ): Promise<DashBoardStatisticResponse> => {
    // Use the params object directly to construct the payload
    const payload: Record<string, any> = {
      ...params,
    };
    return ApiCalls<DashBoardStatisticResponse>({
      endpoint: "app/dashboard/getDashboard",
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
    uploadImage,
    getServiceByFilter,
    updateService,
    getMe,
    updateAvatar,
    getMyPaymentAccount,
    createPaymentAccount,
    getDashBoard,
    payMentSuccess,
  };
};

export default UseNetworkCalls;
