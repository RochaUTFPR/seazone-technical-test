import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/assets/seazone-logo.svg";
import styles from "./styles.module.css";
import { WebRoutes } from "@/enum/paths";

export default function Header() {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image 
          alt="logo seazone" 
          src={Logo} 
          className={styles.logo} 
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        />
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <button className={styles.navButton} onClick={() => router.push("/")}>Home</button>
          </li>
          <li>
            <button className={styles.navButton} onClick={() => router.push(WebRoutes.PROPERTYLIST)}>Propriedades</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
