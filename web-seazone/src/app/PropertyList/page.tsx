"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Property } from "@/models/properties";
import PropertyListTemplate from "@/components/templates/PropertyList/PropertyList";
import { getProperties } from "@/service/properties/propertiesService";

export default function PropertyListPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();

        setProperties(data);
      } catch (err) {
        console.error("Erro ao carregar propriedades:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className={styles.loading}>Carregando propriedades...</div>;

  return (
    <PropertyListTemplate properties={properties} />
  );
}
