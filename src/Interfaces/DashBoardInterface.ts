export interface DashBoardInterfaceRequest {
    dashboardId?: string;
    userId?: number;
}

export interface DashBoardStatisticResponse {
    balance: number; // User's balance amount
    totalBookings?: number ; // Total number of bookings (nullable)
    bookingsGraphUser: BookingGraphEntry[]; // Graph data for user bookings
    bookingsGraphOfServiceProvider: BookingGraphEntry[]; // Graph data for service provider bookings
}
  
export interface BookingGraphEntry {
    value: string; // Booking count (as string in JSON, can be converted to number if needed)
    name: string; // Name of the service
}
  