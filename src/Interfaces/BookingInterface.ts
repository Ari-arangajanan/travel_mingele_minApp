export interface CreateBookingRequest {
    serviceTypeId: number; // ID of the service type
    bookingDateFrom: string; // Start date and time of the booking (ISO 8601 format)
    bookingDateTo: string; // End date and time of the booking (ISO 8601 format)
    status: string; // Booking status (e.g., "PENDING")
  }

  export interface GetAllBookingsRequest {
    page: number; // Page number for pagination
    limit: number; // Number of items per page
    serviceTypeId: number; // ID of the service type
    userTelegramIdId: number; // Telegram ID of the user
    userId: number; // ID of the user
    serviceProvider: number; // ID of the service provider
    serviceId: number; // ID of the service
    bookingDateFrom: string; // Start date for filtering bookings (ISO 8601 format)
    bookingDateTo: string; // End date for filtering bookings (ISO 8601 format)
    bookingId: number; // Specific booking ID
  }

export interface ApproveBooking {
  bookingId: number;
  status: "PENDING"| "ACCEPTED"| "REJECTED" |"COMPLETED"
}

export interface CreateBookingResponse {
    message: string; // Success or informational message
    data: {
      id: number; // Unique identifier for the booking
      status: number; // Booking status (e.g., active, pending, etc.)
      createdAt: string; // Timestamp when the booking was created
      updatedAt: string | null; // Timestamp when the booking was last updated (nullable)
      bookingDateFrom: string; // Start date and time of the booking (ISO 8601 format)
      bookingDateTo: string; // End date and time of the booking (ISO 8601 format)
      price: number; // Price of the booking
      rejectReason: string | null; // Reason for rejection, if applicable (nullable)
      service_id: number; // ID of the service type
      serviceProvider_id: number; // ID of the service provider
      user_id: number; // ID of the user who made the booking
      service_name: string; // Name of the service
      service_provider_name: string; // Name of the service provider
      user_name: string; // Name of the user who made the booking
    };
    success: boolean; // Indicates if the operation was successful
  }
export interface Booking {
    id: number;               // Unique identifier for the booking
    status: number;           // Status of the booking (e.g., active, pending, etc.)
    createdAt: string;        // Timestamp when the booking was created (ISO 8601 format)
    updatedAt?: string | null; // Optional: Timestamp when the booking was last updated
    bookingDateFrom: string;  // Start date and time of the booking (ISO 8601 format)
    bookingDateTo: string;    // End date and time of the booking (ISO 8601 format)
    price: number;            // Price of the booking
    rejectReason?: string | null; // Optional: Reason for rejection, if applicable
    service_id: number;       // ID of the associated service
    serviceProvider_id: number; // ID of the service provider
    user_id: number;          // ID of the user who made the booking
    service_name: string;
    service_provider_name: string;
    user_name: string;
  }

  export interface GetAllBookingsResponse {
    content: Array<Booking>; // List of bookings
    pageable: {
      pageNumber: number; // Current page number
      pageSize: number; // Number of items per page
      sort: {
        empty: boolean; // Whether sorting criteria is empty
        sorted: boolean; // Whether the content is sorted
        unsorted: boolean; // Whether the content is unsorted
      };
      offset: number; // Offset value for pagination
      paged: boolean; // Whether pagination is enabled
      unpaged: boolean; // Whether pagination is disabled
    };
    last: boolean; // Whether this is the last page
    totalPages: number; // Total number of pages
    totalElements: number; // Total number of elements
    first: boolean; // Whether this is the first page
    size: number; // Number of items per page
    number: number; // Current page index
    sort: {
      empty: boolean; // Whether sorting criteria is empty
      sorted: boolean; // Whether the content is sorted
      unsorted: boolean; // Whether the content is unsorted
    };
    numberOfElements: number; // Number of elements on the current page
    empty: boolean; // Whether the content is empty
  }

  export interface BookingStatusUpdateResponse {
    message: string; // Success or informational message
    data: Booking; // The booking details
    success: boolean; // Indicates if the operation was successful
  }