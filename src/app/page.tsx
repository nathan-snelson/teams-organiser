import styles from "./page.module.css";
import Organiser from "./ui/organiser";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Organiser />
      </main>
    </div>
  );
}
