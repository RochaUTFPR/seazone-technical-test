export interface Booking {
    message: String;
    status: string
}

export interface BookingRequest {
    propertyId: number;
    checkIn: string; 
    checkOut: string;
    guests: number;
    customerName: string;
    customerEmail: string;
}
