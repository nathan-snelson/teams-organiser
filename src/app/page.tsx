import styles from "./page.module.css";
import Controls from "./ui/controls";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Controls />
      </main>
    </div>
  );
}
