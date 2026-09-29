import styles from "./page.module.css";
import Monitor from "./ui/monitor";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Monitor />
      </main>
    </div>
  );
}
