import Image from "next/image"
import styles from './topBar.module.css'

export default function TopBar() {
  return (
    <div className={styles['image-container']}>
      <Image
        src="/teams_organiser_logo.png"
        alt="teams organiser logo"
        width={240}
        height={80}
        priority
      />
    </div>
  )
}
