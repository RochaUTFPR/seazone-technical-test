// PropertyListTemplate.tsx
"use client";

import styles from "./styles.module.css";
import { Property } from "@/models/properties";
import PropertyCard from "../../atoms/PropertyCard/PropertyCard";

type PropertyListTemplateProps = {
  properties: Property[];
};

export default function PropertyListTemplate({ properties }: PropertyListTemplateProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Lugares para visitar</h1>
        <p className={styles.subtitle}>Confira os principais destinos no Brasil</p>
      </header>

      <div className={styles.propertiesGrid}>
        {properties?.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
