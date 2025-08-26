"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Logo from "@/assets/seazone-logo.svg"
import { useRouter } from "next/navigation";
import { WebRoutes } from "@/enum/paths";

export default function Home() {    
    const router = useRouter();
  
    function handleClick() {
        router.push(WebRoutes.PROPERTYLIST);
    }
    
    return (
      <>
        <header className={styles.header}>
          <Image alt="logo seazone" src={Logo} className={styles.logo}/>
        </header>

        <section className={styles.hero}>
          <div className={styles.overlay}></div>
          <div className={styles.heroContent}>
            <h1>Alugue seu imóvel no Airbnb, sem preocupações</h1>
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
