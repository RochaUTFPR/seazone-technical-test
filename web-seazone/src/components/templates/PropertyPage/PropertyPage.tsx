import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { Property } from "@/models/properties";

type PropertyPageTemplateProps = {
  property: Property;
};

export default function PropertyPageTemplate({ property }: PropertyPageTemplateProps) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReservationModal, setShowReservationModal] = useState(false);

  if (!property) return <div className={styles.error}>Propriedade não encontrada.</div>;

  const nextImage = () => {
    if (!property.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    if (!property.images) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleReservation = () => setShowReservationModal(true);
  const closeModal = () => setShowReservationModal(false);

  // Função para formatar comodidades, Não é uma solução ideal, mas atende para o teste
  const formatAmenity = (amenity: string) => {
    const amenityMap: Record<string, string> = {
      'wifi': 'Wi-Fi',
      'ar-condicionado': 'Ar Condicionado',
      'garagem': 'Garagem',
      'cozinha-equipada': 'Cozinha Equipada',
      'smart-tv': 'Smart TV',
      'lavadora': 'Lavadora',
      'piscina': 'Piscina',
      'churrasqueira': 'Churrasqueira',
      'lareira': 'Lareira',
      'varanda': 'Varanda',
      'tv': 'TV',
      'jacuzzi': 'Jacuzzi'
    };
    
    return amenityMap[amenity] || amenity;
  };

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar ? '½' : ''}
        {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
      </>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{property.title}</h1>
        <div className={styles.subtitleContainer}>
          <span className={styles.propertyType}>{property.type}</span>
          <span className={styles.location}>
            {property.location.city}, {property.location.state}
          </span>
          {property.rating && (
            <div className={styles.ratingHeader}>
              <span className={styles.stars}>{renderStarRating(property.rating)}</span>
              <span className={styles.ratingValue}>{property.rating}</span>
              <span className={styles.reviewsCount}>({property.reviewsCount} avaliações)</span>
            </div>
          )}
        </div>
      </header>

      {property.images && property.images.length > 0 && (
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
            <Image
              src={property.images[currentImageIndex]}
              alt={`${property.title} - Imagem ${currentImageIndex + 1}`}
              fill
              className={styles.galleryImage}
              priority
            />
            
            {property.images.length > 1 && (
              <>
                <button onClick={prevImage} className={styles.navBtn} style={{ left: '20px' }}>
                  ‹
                </button>
                <button onClick={nextImage} className={styles.navBtn} style={{ right: '20px' }}>
                  ›
                </button>
                
                <div className={styles.imageIndicators}>
                  {property.images.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`${styles.indicator} ${index === currentImageIndex ? styles.active : ''}`}
                    />
                  ))}
                </div>
                
                <div className={styles.imageCounter}>
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </>
            )}
          </div>
          
          {property.images.length > 1 && (
            <div className={styles.thumbnailContainer}>
              {property.images.slice(0, 4).map((image: string, index: number) => (
                <div 
                  key={index} 
                  className={`${styles.thumbnail} ${index === currentImageIndex ? styles.activeThumbnail : ''}`}
                  onClick={() => goToImage(index)}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className={styles.thumbnailImage}
                  />
                </div>
              ))}
              {property.images.length > 4 && (
                <div className={styles.moreImages}>
                  +{property.images.length - 4}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Sobre esta propriedade</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>👥</div>
                <div className={styles.detailInfo}>
                  <span className={styles.detailValue}>{property.maxGuests} hóspedes</span>
                  <span className={styles.detailLabel}>Máximo</span>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>🛏️</div>
                <div className={styles.detailInfo}>
                  <span className={styles.detailValue}>{property.bedrooms} quarto{property.bedrooms !== 1 ? 's' : ''}</span>
                  <span className={styles.detailLabel}>Dormitórios</span>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>🚿</div>
                <div className={styles.detailInfo}>
                  <span className={styles.detailValue}>{property.bathrooms} banheiro{property.bathrooms !== 1 ? 's' : ''}</span>
                  <span className={styles.detailLabel}>Banheiros</span>
                </div>
              </div>
              
              <div className={styles.detailItem}>
                <div className={styles.detailIcon}>📐</div>
                <div className={styles.detailInfo}>
                  <span className={styles.detailValue}>{property.sizeM2} m²</span>
                  <span className={styles.detailLabel}>Área</span>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Descrição</h2>
            <p className={styles.description}>
              {"Esta propriedade incrível oferece uma experiência única para seus hóspedes. Localizada em uma área privilegiada, combina conforto, praticidade e beleza em todos os detalhes."}
            </p>
          </section>

          {property.amenities?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Comodidades</h2>
              <div className={styles.amenitiesGrid}>
                {property.amenities.map((amenity: string, i: number) => (
                  <div key={i} className={styles.amenityItem}>
                    <span className={styles.amenityIcon}>✓</span>
                    <span>{formatAmenity(amenity)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className={styles.sidebar}>
          <div className={styles.reservationCard}>
            <div className={styles.price}>
              <span className={styles.priceValue}>R$ {property.pricePerNight}</span>
              <span className={styles.pricePeriod}>/noite</span>
            </div>
            
            <div className={styles.reservationForm}>
              <div className={styles.dateInputs}>
                <div className={styles.inputGroup}>
                  <label htmlFor="checkin">Check-in</label>
                  <input type="date" id="checkin" className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="checkout">Check-out</label>
                  <input type="date" id="checkout" className={styles.input} />
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="guests">Hóspedes</label>
                <select id="guests" className={styles.input}>
                  {Array.from({ length: property.maxGuests }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1} hóspede{i + 1 !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <button className={styles.reserveBtn} onClick={handleReservation}>
                Reservar Agora
              </button>
            </div>
            
            <div className={styles.pricingSummary}>
              <div className={styles.pricingLine}>
                <span>R$ {property.pricePerNight} x 5 noites</span>
                <span>R$ {(property.pricePerNight * 5).toFixed(2)}</span>
              </div>
              <div className={styles.pricingLine}>
                <span>Taxa de limpeza</span>
                <span>R$ 120,00</span>
              </div>
              <div className={styles.pricingLine}>
                <span>Taxa de serviço</span>
                <span>R$ 85,00</span>
              </div>
              <div className={styles.pricingTotal}>
                <span>Total</span>
                <span>R$ {(property.pricePerNight * 5 + 120 + 85).toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.hostCard}>
            <div className={styles.hostHeader}>
              <div className={styles.hostAvatar}>
                {property.host.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className={styles.hostName}>Anfitrião: {property.host.name}</h3>
                {property.host.superHost && (
                  <div className={styles.superHostBadge}>Superhost</div>
                )}
              </div>
            </div>
            <p className={styles.hostSince}>
              No Seazone desde {new Date(property.host.since).toLocaleDateString('pt-BR', { year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {showReservationModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>×</button>
            <h2 className={styles.modalTitle}>Reserva realizada com sucesso!</h2>
            <p className={styles.modalText}>
              Obrigado por reservar <strong>{property.title}</strong>. 
              Enviamos os detalhes da sua reserva para o seu email.
            </p>
            <div className={styles.modalActions}>
              <button className={styles.modalButton} onClick={closeModal}>Ver Detalhes</button>
              <button className={styles.modalButtonSecondary} onClick={closeModal}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}