
export interface PaymentRequest {
    bookingId: number;
    paymentMethod:  "CARD" | "BANK_TRANSFER" | "CASH"; // e.g., "CARD", "BANK_TRANSFER", etc.
  }