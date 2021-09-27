import Image from "next/image";
import Link from "next/link";
import missingno from "../images/missingno.png";
import styles from "../styles/Error.module.css";
export const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <main className={styles.error}>
      <h1>404</h1>
      <Image src={missingno} alt="Missing number pokemon" />
      <p>Uh oh! Something went wrong: {message}</p>
      <Link href="/">
        <a>Return to safety</a>
      </Link>
    </main>
  );
};
