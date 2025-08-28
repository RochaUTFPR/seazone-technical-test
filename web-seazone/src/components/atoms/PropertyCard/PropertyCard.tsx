import styles from "./styles.module.css";
import Image from "next/image";
import { Property } from "@/models/properties";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { WebRoutes } from "@/enum/paths";

export default function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});

  const handleViewMore = () => {
    router.push(`${WebRoutes.PROPERTY}/${property.id}`);
  };

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
    return date.toLocaleDateString("pt-BR");
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
      <div className={styles.imageCarousel}>
        <div
          className={styles.carouselInner}
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {property?.images?.map((image, index) => (
            <div key={index} className={styles.carouselItem}>
              {!loadedImages[index] && <div className={styles.imageSkeleton} />}

              <Image
                src={image}
                alt={`${property.title} - Imagem ${index + 1}`}
                fill
                className={`${styles.carouselImage} ${
                  loadedImages[index] ? styles.visible : styles.hidden
                }`}
                sizes="(max-width: 768px) 100vw, 50vw"
                onLoad={() => handleImageLoad(index)}
              />
            </div>
          ))}
        </div>

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

        {property?.images?.length > 1 && (
          <div className={styles.carouselIndicators}>
            {property?.images?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`${styles.indicator} ${
                  index === currentImageIndex ? styles.active : ""
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>
        )}

        {property?.host?.superHost && (
          <div className={styles.superHostBadge}>SUPERHOST</div>
        )}

        <div
          className={`${styles.availabilityBadge} ${
            property.isAvailable ? styles.available : styles.unavailable
          }`}
        >
          {property.isAvailable ? "Disponível" : "Indisponível"}
        </div>
      </div>

      <div className={styles.propertyContent}>
        <div className={styles.propertyHeader}>
          <div>
            <h3 className={styles.propertyTitle}>{property.title}</h3>
            <div className={styles.propertyLocation}>
              {property?.location?.country}: {property?.location?.state} -{" "}
              {property?.location?.city}
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
          <span className={styles.reviewsCount}>
            ({property?.reviewsCount} avaliações)
          </span>
        </div>

        <div className={styles.propertyActions}>
          <button className={styles.primaryBtn} onClick={handleViewMore}>Ver mais</button>
        </div>
      </div>
    </div>
  );
}
