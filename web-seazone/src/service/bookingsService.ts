import { api } from "@/service/utils/api";
import { ApiRoutes } from "@/enum/paths"; 
import { Booking, BookingRequest } from "@/models/booking";

export const postBooking = async (data: BookingRequest): Promise<Booking> => {
  const response = await api.post<Booking>(ApiRoutes.BOOKINGS, data);
  return response.data;
};
