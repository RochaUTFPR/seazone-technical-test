"use client";

import { useState, useCallback, useEffect } from "react";
import styles from "./styles.module.css";
import { Property } from "@/models/properties";
import PropertyListTemplate from "@/components/templates/PropertyList/PropertyList";
import { getPropertiesQuery } from "@/service/propertiesService";
import { toast } from "react-toastify";
import { ToastText } from "@/enum/ToastText";
import Header from "@/components/atoms/Header/header";

export default function PropertyListPage() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    city: "",
    state: "",
    type: "",
    minPrice: "" as number | "",
    maxPrice: "" as number | "",
    guests: "" as number | "",
    bedrooms: "" as number | "",
    amenities: [] as string[],
    available: false
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = allProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allProperties.length / itemsPerPage);

  const fetchFilteredProperties = useCallback(async () => {
    const query = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value === false || (Array.isArray(value) && value.length === 0)) return;

      // Se o minPrice estiver vazio, usar 0, isso é necessário para a API responder corretamente, caso contrário ela retorna []
      if (key === "minPrice" && value === "") {
        query.append(key, "0");
        return;
      }
    
      if (Array.isArray(value)) {
        query.append(key, value.join(","));
      } else if (value !== "") {
        query.append(key, value.toString());
      }
    });


    try {
      setLoading(true);
      const result = await getPropertiesQuery(query.toString());
      const data = result;
      setAllProperties(data);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      toast.error(ToastText.PROPERTIES_LOAD_FAILURE);
      setAllProperties([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFilteredProperties();
  }, []);

  const updateFilter = useCallback((key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading && allProperties.length === 0) {
    return <div className={styles.loading}>Carregando propriedades...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <PropertyListTemplate
          properties={currentProperties}
          filters={filters}
          updateFilter={updateFilter}
          onSearch={fetchFilteredProperties}
          loading={loading && allProperties.length > 0}
        />

        {allProperties.length > 0 && (
          <div className={styles.pagination}>
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              Anterior
            </button>

            <div className={styles.pageNumbers}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              Próxima
            </button>
          </div>
        )}
      </div>
    </>
  );
}