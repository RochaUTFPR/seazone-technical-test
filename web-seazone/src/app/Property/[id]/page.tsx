"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProperty } from "@/service/propertiesService";
import styles from "./styles.module.css";
import PropertyPageTemplate from "@/components/templates/PropertyPage/PropertyPage";
import { Property } from "@/models/properties";
import { postBooking } from "@/service/bookingsService";
import { toast } from "react-toastify";
import { ToastText } from "@/enum/ToastText";
import { BookingRequest } from "@/models/booking";
import Header from "@/components/atoms/Header/header";

export default function PropertyPage() {
  const params = useParams();
  const { id } = params;
  const [property, setProperty] = useState<Property>({} as Property);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getProperty(Number(id));
        setProperty(data);
      } catch (error) {
        console.error("Erro ao carregar propriedade:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleReservation = async (data: BookingRequest) => {
    try {
      const booking = await postBooking(data);
      toast.success(ToastText.RESERVATION_SUCCESS);
      return booking;
    } catch (error) {
      console.error("Erro na reserva:", error);
      toast.error(ToastText.RESERVATION_FAILURE);
      return null;
    }
  };

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <>
      <Header/>
      <PropertyPageTemplate 
        property={property} 
        Reservation={handleReservation}
      />
    </>
  )

}