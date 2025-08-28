"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { WebRoutes } from "@/enum/paths";
import Header from "@/components/atoms/Header/header";

export default function Home() {    
    const router = useRouter();
  
    function handleClick() {
        router.push(WebRoutes.PROPERTYLIST);
    }
    
    return (
      <>
        <Header/>
        <section className={styles.hero}>
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1>Alugue seu imóvel no Seazone, sem preocupações</h1>
            <p>
              Cuidamos de toda a gestão do seu imóvel para que você não precise
              atender hóspedes ou fazer limpezas e manutenções.
            </p>
            <button className={styles.btnHeader} onClick={handleClick}>Quero me hospedar</button>
          </div>
        </section>
      </>
    );
}
