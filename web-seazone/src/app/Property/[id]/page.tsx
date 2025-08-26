"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProperty } from "@/service/properties/propertiesService";
import styles from "./styles.module.css";
import PropertyPageTemplate from "@/components/templates/PropertyPage/PropertyPage";
import { Property } from "@/models/properties";

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

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <PropertyPageTemplate property={property}/>
  )

}