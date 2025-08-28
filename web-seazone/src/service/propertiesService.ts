import { api } from "@/service/utils/api";
import { ApiRoutes } from "@/enum/paths"; 
import { Property } from "@/models/properties";

export const getProperties = async (): Promise<Property[]> => {
  const response = await api.get<Property[]>(ApiRoutes.PROPERTIES);
  return response.data;
};

export const getProperty = async (id: number): Promise<Property> => {
  const response = await api.get<Property>(`${ApiRoutes.PROPERTIES}/${id}`);
  return response.data;
};

export const getPropertiesQuery = async (query: string): Promise<Property[]> => {
  const response = await api.get<Property[]>(`${ApiRoutes.PROPERTIES}?${query}`);
  return response.data;
};