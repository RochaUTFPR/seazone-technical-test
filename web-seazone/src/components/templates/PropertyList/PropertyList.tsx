"use client";

import styles from "./styles.module.css";
import { Property } from "@/models/properties";
import PropertyCard from "../../atoms/PropertyCard/PropertyCard";
import Button from "@/components/atoms/Button/Button";

type Filters = {
  city: string;
  state: string;
  type: string;
  minPrice: number | "";
  maxPrice: number | "";
  guests: number | "";
  bedrooms: number | "";
  amenities: string[];
  available: boolean;
};

type PropertyListTemplateProps = {
  properties: Property[];
  filters: Filters;
  updateFilter: (key: keyof Filters, value: any) => void;
  onSearch: () => void;
  loading: boolean;
};

export default function PropertyListTemplate({
  properties,
  filters,
  updateFilter,
  onSearch,
  loading
}: PropertyListTemplateProps) {

  const toggleAmenity = (amenity: string) => {
    updateFilter('amenities', 
      filters.amenities.includes(amenity) 
        ? filters.amenities.filter(a => a !== amenity)
        : [...filters.amenities, amenity]
    );
  };

  const handleNumberInput = (key: keyof Filters, value: string) => {
    updateFilter(key, value === "" ? "" : Number(value));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Lugares para visitar</h1>
        <p className={styles.subtitle}>Confira os principais destinos no Brasil</p>
      </header>

      <form onSubmit={handleSearch} className={styles.filters}>
        <input
          className={styles.filtersInput}
          placeholder="Cidade"
          value={filters.city}
          onChange={e => updateFilter('city', e.target.value)}
        />
        
        <input
          className={styles.filtersInput}
          placeholder="Estado"
          value={filters.state}
          onChange={e => updateFilter('state', e.target.value)}
        />

        <select
          className={styles.filtersInput}
          value={filters.type} 
          onChange={e => updateFilter('type', e.target.value)}
        >
          <option value="">Todos os tipos</option>
          <option value="Casa">Casa</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Chalé">Chalé</option>
          <option value="Cabana">Cabana</option>
          <option value="Flat">Flat</option>
        </select>

        <input
          className={styles.filtersInput}
          type="number"
          placeholder="Preço mínimo"
          value={filters.minPrice}
          onChange={e => handleNumberInput('minPrice', e.target.value)}
        />
        
        <input
          className={styles.filtersInput}
          type="number"
          placeholder="Preço máximo"
          value={filters.maxPrice}
          onChange={e => handleNumberInput('maxPrice', e.target.value)}
        />
        
        <input
          className={styles.filtersInput}
          type="number"
          placeholder="Hóspedes"
          value={filters.guests}
          onChange={e => handleNumberInput('guests', e.target.value)}
        />
        
        <input
          className={styles.filtersInput}
          type="number"
          placeholder="Quartos"
          value={filters.bedrooms}
          onChange={e => handleNumberInput('bedrooms', e.target.value)}
        />

        <div className={styles.amenities}>
          <div className={styles.amenitiesCheckBox}>
            <label>
              <input 
                type="checkbox" 
                checked={filters.amenities.includes("wifi")} 
                onChange={() => toggleAmenity("wifi")} 
              />
              Wi-Fi
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={filters.amenities.includes("piscina")} 
                onChange={() => toggleAmenity("piscina")} 
              />
              Piscina
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={filters.amenities.includes("lareira")} 
                onChange={() => toggleAmenity("lareira")} 
              />
              Lareira
            </label>
            <label className={styles.availableCheckbox}>
            <input 
                type="checkbox" 
                checked={filters.available} 
                onChange={() => updateFilter('available', !filters.available)} 
            />
              Somente disponíveis
            </label>
          </div>
          <div className={styles.containerButton}>
            <Button 
              type="submit" 
              variant="primary"
              disabled={loading}
            >{loading ? "Buscando..." : "Buscar"}</Button>
          </div>
        </div>
      </form>

      <div className={styles.propertiesGrid}>
        {properties.length === 0 && !loading ? (
          <div className={styles.noResults}>
            Nenhuma propriedade encontrada com os filtros selecionados.
          </div>
        ) : (
          properties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        )}
      </div>
    </div>
  );
}