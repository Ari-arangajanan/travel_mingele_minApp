
export interface PaymentRequest {
    bookingId: number;
    paymentMethod:  "CARD" | "BANK_TRANSFER" | "CASH"; // e.g., "CARD", "BANK_TRANSFER", etc.
  }

export interface PaymentSuccessRequest{
  orderId: String;
  paymentMethod: "CARD" | "BANK_TRANSFER" | "CASH" | "ONLINE";
  receiptNumber: String;
}