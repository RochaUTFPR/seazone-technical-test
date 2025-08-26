import styles from "./styles.module.css";
import Image from "next/image";
import { Property } from "@/models/properties";
import { useState } from "react";

export default function PropertyCard({ property }: { property: Property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => ({ ...prev, [index]: true }));
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar ? "½" : ""}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className={styles.propertyCard}>
      {/* Carrossel de Imagens */}
      <div className={styles.imageCarousel}>
        <div 
          className={styles.carouselInner} 
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {property?.images?.map((image, index) => (
            <div key={index} className={styles.carouselItem}>
              {/* skeleton shimmer enquanto carrega */}
              {!loadedImages[index] && (
                <div className={styles.imageSkeleton} />
              )}

              <Image
                src={image}
                alt={`${property.title} - Imagem ${index + 1}`}
                fill
                className={`${styles.carouselImage} ${
                  loadedImages[index] ? styles.visible : styles.hidden
                }`}
                onLoadingComplete={() => handleImageLoad(index)}
              />
            </div>
          ))}
        </div>
        
        {/* Navegação do carrossel */}
        {property?.images?.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className={styles.carouselBtn}
              style={{ left: "10px" }}
              aria-label="Imagem anterior"
            >
              ‹
            </button>
            <button 
              onClick={nextImage}
              className={styles.carouselBtn}
              style={{ right: "10px" }}
              aria-label="Próxima imagem"
            >
              ›
            </button>
          </>
        )}
        
        {/* Indicadores de imagem */}
        {property?.images?.length > 1 && (
          <div className={styles.carouselIndicators}>
            {property?.images?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ""}`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* Superhost badge */}
        {property?.host?.superHost && (
          <div className={styles.superHostBadge}>
            SUPERHOST
          </div>
        )}
      </div>
      
      {/* Conteúdo do card */}
      <div className={styles.propertyContent}>
        <div className={styles.propertyHeader}>
          <div>
            <h3 className={styles.propertyTitle}>{property.title}</h3>
            <div className={styles.propertyLocation}>
              <span className={styles.locationIcon}>📍</span>
              {property?.location?.city} - {property?.location?.state}
            </div>
          </div>
          <div className={styles.propertyPrice}>
            R$ {property?.pricePerNight?.toFixed(2)}
            <span className={styles.pricePeriod}>/noite</span>
          </div>
        </div>
        
        <div className={styles.propertyRating}>
          <span className={styles.ratingStars}>
            {getStarRating(property.rating)}
          </span>
          <span className={styles.ratingValue}>{property?.rating}</span>
          <span className={styles.reviewsCount}>({property?.reviewsCount} avaliações)</span>
        </div>
        
        <div className={styles.propertyDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailValue}>{property?.bedrooms}</span>
            <span className={styles.detailLabel}>Quartos</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailValue}>{property?.bathrooms}</span>
            <span className={styles.detailLabel}>Banheiros</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailValue}>{property?.maxGuests}</span>
            <span className={styles.detailLabel}>Hóspedes</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailValue}>{property?.sizeM2}m²</span>
            <span className={styles.detailLabel}>Área</span>
          </div>
        </div>
        
        <div className={styles.amenities}>
          {property?.amenities?.slice(0, 4)?.map((amenity, index) => (
            <span key={index} className={styles.amenity}>
              {amenity}
            </span>
          ))}
          {property?.amenities?.length > 4 && (
            <span className={styles.amenity}>+{property?.amenities?.length - 4}</span>
          )}
        </div>
        
        <div className={styles.hostInfo}>
          <div className={styles.hostAvatar}>
            {property?.host?.name?.charAt(0)}
          </div>
          <div className={styles.hostDetails}>
            <div className={styles.hostName}>{property?.host?.name}</div>
            <div className={styles.hostSince}>Anfitrião desde {formatDate(property?.host?.since)}</div>
          </div>
        </div>
        
        <div className={styles.propertyActions}>
          <button className={styles.primaryBtn}>
            Ver mais
          </button>
        </div>
      </div>
    </div>
  );
}