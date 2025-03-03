export interface PaymentInvoiceRequest {
    orderId: string;
  }

interface BookingDetails {
    id: number;
    status: number;
    createdAt: string;
    updatedAt: string;
    bookingDateFrom: string;
    bookingDateTo: string;
    price: number;
    rejectReason: string | null;
    orderId: string;
    user_id: number;
    user_name: string;
    serviceProvider_id: number;
    service_name: string;
    service_id: number;
    service_provider_name: string;
  }
  
  export interface PaymentInvoiceResponse {
    id: number;
    booking: BookingDetails;
    amount: number;
    paymentMethod: string;
    paymentGateway: string;
    paymentOrderId: string;
    paymentStatus: number;
    createdAt: string;
  }