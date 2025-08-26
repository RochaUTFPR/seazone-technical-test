import { api } from "@/service/utils/api";
import { ApiRoutes } from "@/enum/paths"; 
import { Property } from "@/models/properties";

export const getProperties = async (): Promise<Property[]> => {
  const response = await api.get<Property[]>(ApiRoutes.PROPERTIES);
  return response.data;
};
